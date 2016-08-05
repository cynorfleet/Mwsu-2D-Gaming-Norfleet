<?php 
    $name = $_POST["user"];
    $pass = $_POST["pass"];
    echo "usernane is: " . $name . "<br>";
    echo "usernane is: " . $pass . "<br>";

    echo "Now Connecting to SQL server <br>";

    $mysqli = new mysqli("localhost", "honeynutcheerio", "letmein", "WebAppSecurity");
    if ($mysqli->connect_errno) 
    {
        echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }
    
    else
    {
        // Process query and store in Result
        $sql = "SELECT * FROM BankRecords WHERE User = 'root'"; 
        $result = $mysqli->query($sql);
        $row = $result->fetch_assoc();
        
        echo "<br>User is " . $row["User"] . "<br>" . "Balance is " . $row["Balance"] . "<br>"; 

    }

?>