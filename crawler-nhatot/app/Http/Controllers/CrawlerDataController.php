<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Post;
use App\Models\Role;
use App\Models\Image;
use App\Models\UserRole;
use App\Models\Accomodation;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CrawlerDataController extends Controller
{
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $userMap = [];
            $postMap = [];

            foreach ($request->all() as $data) {
                $user = User::create([
                    'full_name' => $data['userInfo']['name'],
                    'phone' => $data['postInfo']['phone'] ?? null,
                    'address' => $data['userInfo']['location'] ?? null,
                    'avatar' => $data['userInfo']['avatar'] ?? null,
                    'rating' => $data['userInfo']['rating'] ?? 0,
                    'rating_count' => $data['userInfo']['ratingCount'] ?? 0,
                    'followers' => $data['userInfo']['followers'] ?? 0,
                    'following' => $data['userInfo']['following'] ?? 0,
                    'response_chat' => $data['userInfo']['responseChat'] ?? null,
                ]);

                $role = Role::firstOrCreate(['name' => $data['postInfo']['role_user'] ?? 'Người dùng']);
                UserRole::create([
                    'user_id' => $user->id,
                    'role_id' => $role->id,
                ]);

                $accomodation = Accomodation::create([
                    'address' => $data['postInfo']['location'] ?? 'Không rõ',
                    'acreage' => isset($data['postInfo']['acreage']) ? (int) $data['postInfo']['acreage'] : 0,
                    'price' => isset($data['postInfo']['price']) ? (float) $data['postInfo']['price'] : 0.0,
                    'furniture' => $data['postInfo']['furniture'] ?? 'Nhà trống',
                    'deposit' => isset($data['postInfo']['deposit']) ? (float) $data['postInfo']['deposit'] : 0.0,
                ]);

                $post = Post::create([
                    'user_id' => $user->id,
                    'accomodation_id' => $accomodation->id,
                    'title' => $data['postInfo']['title'],
                    'content' => $data['postInfo']['formattedDescription'],
                    'approved' => false,
                ]);

                if (isset($data['postInfo']['images']) && is_array($data['postInfo']['images'])) {
                    foreach ($data['postInfo']['images'] as $image) {
                        Image::create([
                            'post_id' => $post->id,
                            'file_name' => $image,
                        ]);
                    }
                }

                $userMap[$data['userInfo']['name']] = $user;
                $postMap[$data['postInfo']['title']] = $post;

                if (isset($data['dataUserReviews']) && is_array($data['dataUserReviews'])) {
                    foreach ($data['dataUserReviews'] as $userReviewData) {
                        $reviewUser = User::firstOrCreate(
                            [
                                'phone' => $userReviewData['phone'] ?? null,
                            ],
                            [
                                'full_name' => $userReviewData['name'],
                                'address' => $userReviewData['location'] ?? null,
                                'avatar' => $userReviewData['avatar'] ?? null,
                                'rating' => $userReviewData['rating'] ?? 0,
                                'rating_count' => $userReviewData['ratingCount'] ?? 0,
                                'followers' => $userReviewData['followers'] ?? 0,
                                'following' => $userReviewData['following'] ?? 0,
                                'response_chat' => $userReviewData['responseChat'] ?? null
                            ]
                        );

                        $userMap[$reviewUser->full_name] = $reviewUser;
                    }
                }
            }

            foreach ($request->all() as $data) {
                if (isset($data['reviews']) && is_array($data['reviews'])) {
                    foreach ($data['reviews'] as $reviewData) {
                        $reviewer = User::where('full_name', $reviewData['reviewName'] ?? '')
                            ->where('avatar', $reviewData['reviewAvatar'] ?? '')
                            ->first();

                        $post = $postMap[$reviewData['namePost']] ?? null;

                        if ($reviewer && $post) {
                            Review::create([
                                'reviewer_id' => $reviewer->id,
                                'reviewee_id' => $post->user_id,
                                'accomodation_id' => $post->accomodation_id,
                                'rating' => $reviewData['reviewRating'] ?? 0,
                                'comment' => $reviewData['reviewContent'] ?? '',
                                'review_date' => $reviewData['reviewDate'] ?? 'Không có',
                            ]);
                        } else {
                            Log::warning('Reviewer or post not found for review', $reviewData);
                        }
                    }
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Data saved successfully',
            ], 201);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Error saving data', ['error' => $e->getMessage()]);

            return response()->json([
                'message' => 'Data not saved',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
