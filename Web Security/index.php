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
         echo "Please choose a value";
     }
    if( isset ($_POST['stars']))
    {
        $answer = $_POST["stars"];
        echo "You rated Dr Passos with: ";
        echo $answer;
        echo " stars";
        
        echo  nl2br ("\n");
        echo  nl2br ("\n");

        if($answer <2)
        {
             $path = 'http://img.memecdn.com/bugs-bunny-amp-quot-don-amp-039-t-care-amp-quot_fb_1991675.jpg';
            print '<img src="'.$path.'" alt="hater" />';
        }
        
        if($answer <4)
        {
             $path = 'http://m.memegen.com/obe54d.jpg';
            print '<img src="'.$path.'" alt="damn son" />';
        }
        if($answer <=5)
        {
             $path = '/SWAG.png';
            print '<img src="'.$path.'" alt="dank meme" />';
        }
    }
    ?>
        <br>
</body>

</html>