<?php
// Establish a MySQLi connection to the database
$db = mysqli_connect("localhost", "root", "", "smart_health");

// Check if the form has been submitted
if(isset($_POST['submit'])) {
    // Retrieve the form data
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $username = $_POST['username'];
    $countryCode = $_POST['country-code'];
    $phone = $_POST['phone'];
    $gender = $_POST['gender'];
    $password = $_POST['password'];

    // Insert the form data into the database
    $query = "INSERT INTO patients (Firstname, Lastname, Email, Username, CountryCode, PhoneNumber, Gender, Password
    ) VALUES ('$fname', '$lname', '$email', '$username', '$countryCode', '$phone', '$gender', '$password')";
    mysqli_query($db, $query);
}
?>