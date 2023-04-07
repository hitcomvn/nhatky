<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Chia sẻ vị trí của tôi</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBs5CTk8t1VvTKyTYZ7dIwyd4WetqW7jLc"></script>
	<script src="script.js"></script>
</head>
<body>
	<header>
		<h1>Chia sẻ vị trí của tôi</h1>
	</header>

	<section id="map-canvas"></section>

	<section id="share-location">
		<button onclick="getCurrentPosition()">Chia sẻ vị trí của tôi</button>
	</section>

	<footer>
		<p>&copy; 2023 by Hitcomvn</p>
	</footer>
</body>
</html>
