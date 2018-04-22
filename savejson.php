<?php
$userEntry = json_decode($_POST['name'], true);
var_dump($userEntry);
// die();
$myFile = "names.json";
//Get JSON date from JSON file
$existing_users = file_get_contents($myFile);
var_dump($existing_users);
// if (strlen($existing_users) < 1) {
//     $existing_users = json_encode(array());
// }
var_dump($existing_users);
//die();
// Convert JSON date to string date
$json_string = json_decode($existing_users, true);
// var_dump($json_string);
// die();
// Push new user to the string data
array_push($json_string, $userEntry);
//Convert updated string data to JSON data
$existing_users = json_encode($json_string, JSON_PRETTY_PRINT);
//Save the updated JSON data on the JSON file
file_put_contents($myFile, $existing_users);
