<?php

// API key của Google Maps
$apiKey = "AIzaSyBs5CTk8t1VvTKyTYZ7dIwyd4WetqW7jLc";

// Hàm lấy vị trí hiện tại của người dùng
function getCurrentLocation() {
    $currentLocation = array();
    if (isset($_COOKIE["latitude"]) && isset($_COOKIE["longitude"])) {
        $currentLocation["latitude"] = $_COOKIE["latitude"];
        $currentLocation["longitude"] = $_COOKIE["longitude"];
    } else {
        $ipAddress = $_SERVER["REMOTE_ADDR"];
        $url = "https://ipapi.co/$ipAddress/json/";
        $json = file_get_contents($url);
        $data = json_decode($json, true);
        $currentLocation["latitude"] = $data["latitude"];
        $currentLocation["longitude"] = $data["longitude"];
        setcookie("latitude", $currentLocation["latitude"], time()+86400);
        setcookie("longitude", $currentLocation["longitude"], time()+86400);
    }
    return $currentLocation;
}

// Hàm lấy vị trí từ địa chỉ
function getLocationFromAddress($address) {
    global $apiKey;
    $url = "https://maps.googleapis.com/maps/api/geocode/json?key=$apiKey&address=" . urlencode($address);
    $json = file_get_contents($url);
    $data = json_decode($json, true);
    if ($data["status"] == "OK") {
        $location = $data["results"][0]["geometry"]["location"];
        $result = array("latitude" => $location["lat"], "longitude" => $location["lng"]);
        return $result;
    } else {
        return false;
    }
}

// Hàm lấy địa chỉ từ vị trí
function getAddressFromLocation($latitude, $longitude) {
    global $apiKey;
    $url = "https://maps.googleapis.com/maps/api/geocode/json?key=$apiKey&latlng=$latitude,$longitude";
    $json = file_get_contents($url);
    $data = json_decode($json, true);
    if ($data["status"] == "OK") {
        $address = $data["results"][0]["formatted_address"];
        return $address;
    } else {
        return false;
    }
}

// Hàm lưu vị trí vào file logmap.txt
function logLocation($latitude, $longitude) {
    $filename = "logmap.txt";
    $content = "$latitude,$longitude\n";
    file_put_contents($filename, $content, FILE_APPEND);
}

?>
