<?php 
    $name = $_POST["user"];
    $pass = $_POST["pass"];

    // **************************TESTING********************************
    echo "usernane is: " . $name . "<br>";
    echo "usernane is: " . $pass . "<br>";
    echo "Now Connecting to SQL server <br>";
    // **************************TESTING********************************

    // Establish a connection with MySQLi server
    $mysqli = new mysqli("localhost", "honeynutcheerio", "letmein", "WebAppSecurity");
    if ($mysqli->connect_errno) 
    {
        echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }
    
    // Initiate authentication
    else
    {
        if(authUser($user) && authPass($pass))
        {
            $your_request = "SELECT User FROM BankRecords WHERE User='$name''";
            $your_answer = doQuery($your_request);
            echo "<br>User: " . $your_answer["User"];
            
            $your_request = "SELECT Pass FROM BankRecords WHERE User='$name''";
            $your_answer = doQuery($your_request);
            echo "<br>Pass: " . $your_answer["Pass"];
            
            $your_request = "SELECT Balance FROM BankRecords WHERE User='$name''";
            $your_answer = doQuery($your_request);
            echo "<br>Balance: " . $your_answer["Balance"];
        }
    echo "<br> THANK YOU. GOODBYE";       
        
    }

    function authUser($user)
    {
        // Authenticate user name
        $your_request = "SELECT User FROM BankRecords WHERE User='$name''";
        $your_answer = doQuery($your_request);
        if ($name !=$row["User"])
        {
            echo "User name FAIL!!!";
            return FALSE;
        }
        else return TRUE;
    }

    function authPass($pass)
    {
        // Authenticate password
        $your_request = "SELECT Pass FROM BankRecords WHERE Pass='$pass''";
        $your_answer = doQuery($your_request);
        if ($name !=$row["Pass"])
        {
            echo "Password FAIL!!!";
            return FALSE;
        }
        else return TRUE;
    }

    function doQuery($your_request)
    {
        // Process query and store in Result
        $sql = "$your_request"; 
        $result = $mysqli->query($sql);
        // Convert the result to a row of data
        // row requires field parameter
        $row = $result->fetch_assoc();
        return $row;
    }
        
        echo "<br>User is " . $row["User"] . "<br>" . "Balance is " . $row["Balance"] . "<br>"; 


?>