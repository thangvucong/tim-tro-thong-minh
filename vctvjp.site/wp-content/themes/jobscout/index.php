<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package JobScout
 */

get_header(); ?>


	<div id="primary" class="content-area">
	
	</div><!-- #primary -->



<?php
global $wpdb;

// Xử lý form tìm kiếm
if (isset($_GET['search_rent'])) {
    $address = isset($_GET['address']) ? sanitize_text_field($_GET['address']) : "";
    $acreage = isset($_GET['acreage']) ? intval($_GET['acreage']) : 0;
    $minprice = isset($_GET['minprice']) ? intval($_GET['minprice']) : 0;
    $maxprice = isset($_GET['maxprice']) ? intval($_GET['maxprice']) : 0;

    // Truy vấn danh sách phòng trọ
$query = "SELECT p.title AS TieuDe, 
                 a.furniture AS NoiThat, 
                 a.price AS Gia, 
                 a.acreage AS DienTich, 
                 a.address AS KhuVuc, 
                 p.created_at AS ThoiGianDang, 
                 (SELECT i.file_name FROM images i WHERE i.post_id = p.id LIMIT 1) AS HinhAnh, 
                 u.full_name AS NguoiDang, 
                 u.phone AS SoDienThoai
          FROM posts p
          JOIN accomodations a ON p.accomodation_id = a.id
          JOIN users u ON p.user_id = u.id
          WHERE 1=1";

if (!empty($address)) {
    $query .= $wpdb->prepare(" AND a.address LIKE %s", '%' . $wpdb->esc_like($address) . '%');
}
if ($acreage > 0) {
    $query .= $wpdb->prepare(" AND a.acreage = %d", $acreage);
}
if ($minprice > 0) {
    $query .= $wpdb->prepare(" AND a.price >= %d", $minprice);
}
if ($maxprice > 0) {
    $query .= $wpdb->prepare(" AND a.price <= %d", $maxprice);
}

$query .= " ORDER BY RAND() LIMIT 5";

$results = $wpdb->get_results($query);


}
?>
<div class="content">
    <!-- Form tìm kiếm -->
    <div class="rent-search-form">
        <form method="get" action="">
            <label for="address">Địa chỉ:</label>
            <select name="address" id="address">
                <option value="">Chọn quận</option>
                <?php
                $districts = ['Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 10', 'Quận 11', 'Quận 12', 'Quận Bình Thạnh', 'Quận Gò Vấp', 'Quận Phú Nhuận', 'Quận Tân Bình', 'Quận Tân Phú', 'Quận Thủ Đức'];
                foreach ($districts as $district) {
                    echo "<option value='" . esc_attr($district) . "'>" . esc_html($district) . "</option>";
                }
                ?>
            </select><br><br>

            <label for="acreage">Diện tích (m²):</label>
            <input type="number" name="acreage" id="acreage" min="0"><br><br>

            <label for="minprice">Giá thấp nhất:</label>
            <input type="number" name="minprice" id="minprice" min="0"><br><br>

            <label for="maxprice">Giá cao nhất:</label>
            <input type="number" name="maxprice" id="maxprice" min="0"><br><br>

            <button type="submit" name="search_rent">Tìm kiếm</button>
        </form>
    </div>

    <!-- Kết quả tìm kiếm -->
    <div class="rent-search-results">
        <?php if (!empty($results)) : ?>
            <table>
                <thead>
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Địa chỉ</th>
                        <th>Diện tích (m²)</th>
                        <th>Giá (VND)</th>
                        <th>Nội thất</th>
                        <th>Thời gian đăng</th>
                        <th>Hình ảnh</th>
                        <th>Người đăng</th>
                        <th>Số điện thoại</th>
                    
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($results as $accomodation) : ?>
                        <tr>
                            <td><?php echo esc_html($accomodation->TieuDe); ?></td>
                            <td><?php echo esc_html($accomodation->KhuVuc); ?></td>
                            <td><?php echo esc_html($accomodation->DienTich); ?></td>
                            <td><?php echo esc_html(number_format($accomodation->Gia, 0, ',', '.')); ?> VND</td>
                            <td><?php echo esc_html($accomodation->NoiThat); ?></td>
                            <td><?php echo esc_html($accomodation->ThoiGianDang); ?></td>
                            <td><img src="<?php echo esc_url($accomodation->HinhAnh); ?>" alt="Hình ảnh" width="100" height="100"></td>
                            <td><?php echo esc_html($accomodation->NguoiDang); ?></td>
                            <td><?php echo esc_html($accomodation->SoDienThoai); ?></td>
                       
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>Không tìm thấy kết quả phù hợp.</p>
        <?php endif; ?>
    </div>
</div>










