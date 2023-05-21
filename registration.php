<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $email = $_POST["email"];
  $password = $_POST["password"];
  $confirm_password = $_POST["confirm_password"];

  // Check if passwords match
  if ($password != $confirm_password) {
    $error = "Passwords do not match.";
  } else {
    // Passwords match, process registration request
    // ...
  }
}
?>