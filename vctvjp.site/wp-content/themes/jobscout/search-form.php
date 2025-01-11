<form action="" method="POST">
  <label for="address">Địa chỉ:</label>
  <select name="address" id="address">
    <option value="">Chọn quận</option>
    <option value="HoanKiem">Hoàn Kiếm</option>
    <option value="TayHo">Tây Hồ</option>
    <option value="BaDinh">Ba Đình</option>
    <!-- Thêm các quận khác ở Hà Nội vào đây -->
  </select>
  <br>
  
  <label for="acreage">Diện tích:</label>
  <input type="number" name="acreage" id="acreage" placeholder="Diện tích (m2)">
  <br>
  
  <label for="minprice">Giá từ:</label>
  <input type="number" name="minprice" id="minprice" placeholder="Giá tối thiểu">
  <br>
  
  <label for="maxprice">Giá đến:</label>
  <input type="number" name="maxprice" id="maxprice" placeholder="Giá tối đa">
  <br>
  
  <input type="submit" name="submit" value="Tìm kiếm">
</form>
