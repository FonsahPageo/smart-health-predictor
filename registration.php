<?php
    require('DB_Connection.php');
    $fname=  htmlentities($_POST["fname"]);
    $lname= htmlentities($_POST["lname"]);
    $email= htmlentities($_POST["email"]);
    $username= htmlentities($_POST["username"]);
    $code= htmlentities($_POST["country-code"]);
    $phone= htmlentities($_POST["phone"]);
    $gender=htmlentities($_POST["gender"]);
    $password= htmlentities($_POST["password"]);

    // $insert= "INSERT into patients (Firstname,Lastname,Email,Username,CountryCode,PhoneNumber,Gender,Password)
    //  VALUES ('$fname','$lname','$email','$username','$code','$phone','$gender','" . md5($password) . "')";
     $insert= "INSERT into patients (Firstname,Lastname,Email,Username,CountryCode,PhoneNumber,Gender,Password)
     VALUES ('$fname','$lname','$email','$username','$code','$phone','$gender','$password')";
    $result   = mysqli_query($con, $insert);

    if ($result==1) {
        echo "<div class='form'>
           <center><h3>You are registered successfully.</h3><br/>
            <p class='link'>Click here to <a href='login.html'>Login</a></p>
            </center></div>";
    } else {
            echo "<div class='form'>
                <center><h3>Registration Unsuccessful.</h3><br/>
                <p class='link'>Click here to <a href='registration.php'>register</a> again.</p>
                </center></div>";
            }

?>