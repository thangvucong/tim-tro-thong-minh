<?php
/**
 * Front Page
 * 
 * @package JobScout
 */

$home_sections = jobscout_get_home_sections();

if ( 'posts' == get_option( 'show_on_front' ) ) { //Show Static Blog Page
    include( get_home_template() );
}elseif( $home_sections ){ 
    get_header();
    //If any one section are enabled then show custom home page.
    
    // Hiển thị form tìm kiếm phòng trọ ngay trên trang chủ
    ?>

<?php


// Đảm bảo tải file xử lý phương tiện
require_once( ABSPATH . 'wp-admin/includes/media.php' );

// Kiểm tra xem có form gửi dữ liệu không
if (isset($_POST['submit_listing'])) {
    // Lấy dữ liệu từ form

    
    // Xử lý tải lên hình ảnh


    // Thực hiện chèn dữ liệu vào bảng accomodations

    echo 'Bài viết đã được tạo thành công!';
}

?>

<?php get_header(); ?>

<!-- Form nhập liệu -->
<div class="form-container" style="max-width: 500px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
    <h2>Tạo bài mới</h2>
    <form method="POST" enctype="multipart/form-data">
        <label for="title">Tiêu đề:</label>
        <input type="text" name="title" id="title" required><br><br>

        <label for="address">Địa chỉ:</label>
        <input type="text" name="address" id="address" required><br><br>

        <label for="acreage">Diện tích:</label>
        <input type="number" name="acreage" id="acreage" required><br><br>

        <label for="price">Giá:</label>
        <input type="number" name="price" id="price" required><br><br>

        <label for="furniture">Nội thất:</label>
        <input type="text" name="furniture" id="furniture"><br><br>

        <label for="image">Hình ảnh:</label>
        <input type="file" name="image" id="image"><br><br>

        <button type="submit" name="submit_listing">Tạo bài viết</button>
    </form>
</div>

<?php get_footer(); ?>
   <?php
    // Hiển thị các phần còn lại của trang chủ
    foreach( $home_sections as $section ){
        get_template_part( 'sections/' . esc_attr( $section ) );  
    }
    get_footer();
}else {
    // Nếu tất cả các section bị tắt, hiển thị template trang tương ứng.
    include( get_page_template() );
}
?>
