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
            <input type="submit" value="submit">
        </div>
    </form>
    <br>
    <br>
    <?php 
     if( !isset ($_POST['stars']))
    {
         echo "Please enter value";
     }
    if( isset ($_POST['stars']))
    {
        $answer = $_POST["stars"];
        echo "You rated Dr Passos with: ";
        echo $answer;
        echo " stars";
        echo nl2br nl2br; 
        if($answer <3){
        echo '<img src="http://img.memecdn.com/bugs-bunny-amp-quot-don-amp-039-t-care-amp-quot_fb_1991675.jpg">';
        }
        
    }
    ?>
        <br>
</body>

</html>