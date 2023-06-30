<?php
   include('DB_Connection.php');

   $username= htmlentities($_POST["username"]); 
   $password= htmlentities($_POST["password"]);

      $display= "SELECT id From patients WHERE Username='$username' AND Password='$password' ";
      $result= mysqli_query($con,$display);
      $row= mysqli_fetch_assoc($result);
      $count= mysqli_num_rows($result);

      if($count==1){
       // echo "<h1><center> Login Successful</center></h1>";
       header("Location: index.html");
      } else{
        echo "<h1><center> Incorrect Username or Password </center></h1>
        <p class='link'>Click here to <a href='login.html'>Login</a> again.</p></br>
        <p class='link'>Click here to <a href='patient-registration.html'>register</a> SignUp.</p>";
      }

?>  