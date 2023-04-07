<?php
// Check if data exists in the POST request
if (isset($_POST['latitude']) && isset($_POST['longitude']) && isset($_POST['title'])) {

    // Retrieve the data from the POST request
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $title = $_POST['title'];

    // Open the log file for appending
    $logfile = fopen('logmap.txt', 'a');

    // Write the data to the log file
    fwrite($logfile, "$title: $latitude, $longitude\n");

    // Close the log file
    fclose($logfile);

    // Send a success response
    echo "Location saved successfully!";
} else {
    // Send a failure response
    echo "Error: Data not found!";
}
?>
