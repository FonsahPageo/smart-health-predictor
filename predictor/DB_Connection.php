<?php
$host = "mysql";
$username = "user";
$password = "userpassword";
$db_name = "medical";
$con = mysqli_connect($host, $username, $password, $db_name);
if (!$con) {
    echo "Connection Failed";
}
