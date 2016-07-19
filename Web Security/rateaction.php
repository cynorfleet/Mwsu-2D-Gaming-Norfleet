<html>

<body>

    You have been redirected to reaction.php
    <br>
    <br> You rated Dr Passos with:
    <?php echo $_POST["stars"]; ?>
        stars
        <br>
        <br>
        <?php
    
    $rated = $_POST["stars"];
    
        if ($rated < 3)
        {
                <img src="pic_mountain.jpg" alt="Mountain View" style="width:304px;height:228px;">
        }
    
        elseif ($rated < 4)
        {
            <img src="pic_mountain.jpg" alt="Mountain View" style="width:304px;height:228px;">
        }
    
        else
        {
                <img src="pic_mountain.jpg" alt="Mountain View" style="width:304px;height:228px;">
        }
        
    ?>


</body>

</html>