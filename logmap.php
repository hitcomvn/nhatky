<?php
$lat = $_GET["lat"];
$lng = $_GET["lng"];
$file = fopen("logmap.txt", "a");
fwrite($file, $lat . "," . $lng . "\n");
fclose($file);
echo "Vị trí đã được lưu vào file logmap.txt!";
?>
