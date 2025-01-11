<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // 1. Districts
        $districts = [
            ['name' => 'Quận 1', 'x_coordinate' => 10.775436, 'y_coordinate' => 106.704073],
            ['name' => 'Quận 2', 'x_coordinate' => 10.786756, 'y_coordinate' => 106.751171],
        ];
        DB::table('districts')->insert($districts);

        // 2. Roles
        $roles = [
            ['name' => 'Admin'],
            ['name' => 'Landlord'],
        ];
        DB::table('roles')->insert($roles);

        // 3. Users
        $users = [
            [
                'full_name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password123'),
                'phone' => '0901234567',
                'address' => '123 Nguyễn Huệ, Q1',
            ],
            [
                'full_name' => 'Chủ Nhà A',
                'email' => 'landlord@example.com',
                'password' => Hash::make('password123'),
                'phone' => '0901234568',
                'address' => '456 Lê Lợi, Q1',
            ],
        ];
        DB::table('users')->insert($users);

        // 4. User Roles
        $userRoles = [
            ['user_id' => 1, 'role_id' => 1], // Admin
            ['user_id' => 2, 'role_id' => 2], // Landlord
        ];
        DB::table('user_roles')->insert($userRoles);

        // 5. Posts
        $posts = [
            [
                'title' => 'Phòng trọ cao cấp Q1',
                'content' => 'Phòng trọ full nội thất, an ninh 24/7',
                'user_id' => 2,
                'approved' => true,
                'create_at' => now(),
                'last_update' => now(),
            ],
            [
                'title' => 'Căn hộ mini Q2',
                'content' => 'Căn hộ mới xây, đầy đủ tiện nghi',
                'user_id' => 2,
                'approved' => true,
                'create_at' => now(),
                'last_update' => now(),
            ],
        ];
        DB::table('posts')->insert($posts);

        // 6. Comments
        $comments = [
            [
                'content' => 'Phòng rất đẹp và sạch sẽ',
                'post_id' => 1,
                'user_id' => 1,
                'rate' => 5,
                'last_update' => now(),
            ],
            [
                'content' => 'Giá hơi cao nhưng worth it',
                'post_id' => 1,
                'user_id' => 2,
                'rate' => 4,
                'last_update' => now(),
            ],
        ];
        DB::table('comments')->insert($comments);

        // 7. Images
        $images = [
            [
                'data' => base64_encode('demo_image_1'),
                'file_name' => 'room1.jpg',
                'file_type' => 'image/jpeg',
                'post_id' => 1,
            ],
            [
                'data' => base64_encode('demo_image_2'),
                'file_name' => 'room2.jpg',
                'file_type' => 'image/jpeg',
                'post_id' => 2,
            ],
        ];
        DB::table('images')->insert($images);

        // 8. Criteria
        $criteria = [
            [
                'district_id' => 1,
                'user_id' => 1,
                'motel' => true,
                'price_start' => 3000000,
                'price_end' => 5000000,
                'acreage_start' => 20,
                'acreage_end' => 30,
                'create_at' => now(),
            ],
            [
                'district_id' => 2,
                'user_id' => 2,
                'motel' => false,
                'price_start' => 5000000,
                'price_end' => 7000000,
                'acreage_start' => 30,
                'acreage_end' => 40,
                'create_at' => now(),
            ],
        ];
        DB::table('criteria')->insert($criteria);

        // 9. Notifications
        $notifications = [
            [
                'post_id' => 1,
                'user_id' => 1,
                'criteria_id' => 1,
                'seen' => false,
                'create_at' => now(),
                'notification_name' => 'Phòng trọ mới phù hợp',
            ],
            [
                'post_id' => 2,
                'user_id' => 2,
                'criteria_id' => 2,
                'seen' => true,
                'create_at' => now(),
                'notification_name' => 'Căn hộ mới phù hợp',
            ],
        ];
        DB::table('notifications')->insert($notifications);

        // 10. Actions
        $actions = [
            [
                'post_id' => 1,
                'user_id' => 1,
                'action' => 'view',
                'time' => now(),
            ],
            [
                'post_id' => 2,
                'user_id' => 2,
                'action' => 'contact',
                'time' => now(),
            ],
        ];
        DB::table('actions')->insert($actions);

        // 11. Accommodations
        $accommodations = [
            [
                'acreage' => 25,
                'address' => '123 Nguyễn Huệ, Q1',
                'air_conditioner' => true,
                'cabletv' => true,
                'electric_price' => 3500,
                'heater' => true,
                'internet' => true,
                'motel' => true,
                'parking' => true,
                'price' => 4000000,
                'status' => 'available',
                'toilet' => true,
                'tv' => true,
                'water_price' => 100000,
                'x_coordinate' => 10.775436,
                'y_coordinate' => 106.704073,
                'district_id' => 1,
                'post_id' => 1,
            ],
            [
                'acreage' => 35,
                'address' => '456 Trần Hưng Đạo, Q2',
                'air_conditioner' => true,
                'cabletv' => false,
                'electric_price' => 3500,
                'heater' => true,
                'internet' => true,
                'motel' => false,
                'parking' => true,
                'price' => 6000000,
                'status' => 'available',
                'toilet' => true,
                'tv' => true,
                'water_price' => 100000,
                'x_coordinate' => 10.786756,
                'y_coordinate' => 106.751171,
                'district_id' => 2,
                'post_id' => 2,
            ],
        ];
        DB::table('accommodations')->insert($accommodations);
    }
}