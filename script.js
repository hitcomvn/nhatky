// Hàm xử lý khi click vào nút chia sẻ vị trí
function shareLocation() {
  if ("geolocation" in navigator) { // Kiểm tra trình duyệt có hỗ trợ Geolocation hay không
    navigator.geolocation.getCurrentPosition(function(position) { // Lấy vị trí hiện tại
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var message = "Latitude: " + latitude + ", Longitude: " + longitude;
      var geogetmap = sessionStorage.getItem("geogetmap");
      if (geogetmap == "yes") { // Kiểm tra nếu đã ấn chia sẻ vị trí lần đầu tiên
        saveLocation(latitude, longitude); // Lưu vị trí vào file logmap.txt
      }
      alert(message); // Hiển thị vị trí
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Hàm lưu vị trí vào file logmap.txt
function saveLocation(latitude, longitude) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "savemap.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("lat=" + latitude + "&lng=" + longitude);
}

// Hàm xử lý khi click vào nút chia sẻ vị trí lần đầu tiên
function enableGeoGetMap() {
  sessionStorage.setItem("geogetmap", "yes");
}
