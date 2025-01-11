<?php
global $wpdb;

// Nhận id từ yêu cầu Ajax
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    $query = $wpdb->prepare("
        SELECT 
            p.title, a.address, a.acreage, a.price, a.furniture, 
            u.full_name AS user_name, u.phone
        FROM posts p
        JOIN accomodations a ON p.accomodation_id = a.id
        JOIN users u ON p.userid = u.id
        WHERE a.id = %d
    ", $id);

    $detail = $wpdb->get_row($query);

    if ($detail) {
        // Trả về dữ liệu dạng JSON
        echo json_encode($detail);
    } else {
        echo json_encode(['error' => 'Không tìm thấy dữ liệu chi tiết.']);
    }
} else {
    echo json_encode(['error' => 'ID không hợp lệ.']);
}






