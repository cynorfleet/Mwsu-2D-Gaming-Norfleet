<html>

<head>
    <title>Rate Dr Passos</title>
</head>

<body>
    How would you rate Dr. Passos?
    <form name="rate" method="POST">

        <div align="center">
            <br>
            <input type="radio" name="stars" value="1"> 1 Star
            <br>
            <input type="radio" name="stars" value="2"> 2 Stars
            <br>
            <input type="radio" name="stars" value="3"> 3 Stars
            <br>
            <input type="radio" name="stars" value="4"> 4 Stars
            <br>
            <input type="radio" name="stars" value="5"> 5 Stars
            <br>
            <input type="submit" value="Submit">
        </div>
    </form>
    <br>
    <br>
    <?php 
    if( isset ($_POST['submit']))
    {
        echo "You rated Dr Passos with: ";
        echo $_POST["stars"];
        echo "stars";
    }
    ?>
        <br>
</body>

</html>