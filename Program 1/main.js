var mainState = {

    preload: function() {
        game.load.image('player_left', 'assets/Curry_left.png');
        game.load.image('player_right', 'assets/Curry_right.png');
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('coin', 'assets/Basket.png');
        game.load.image('enemy', 'assets/Lebronpixel.png');
        game.load.image('background', 'assets/background.png');
        
        //Audio
        game.load.audio('E40', ['assets/E40.ogg'])
    },
    
    create: function() { 
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;
        
        // Create background and resize it
        this.background = game.add.sprite(game.width/2, game.height/2, 'background');
        this.background.scale.setTo(this.game.width / this.background.width, this.game.height / this.background.height + .00 );

        this.cursor = game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(game.width/2, game.height/2, 'player_left');
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;

        this.createWorld();

        this.coin = game.add.sprite(60, 140, 'coin');
        game.physics.arcade.enable(this.coin); 
        this.coin.anchor.setTo(0.5, 0.5);
        
        // Anchor the background for proper placement
        this.background.anchor.setTo(0.5, 0.5);

        this.scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
        this.score = 0;
        
        // Display turnover scoreboard
        this.turnLabel = game.add.text(380, 300, 'turnovers: 0', { font: '18px Arial', fill: '#ffffff' });
        this.turnovers = 0;

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');
        game.time.events.loop(2200, this.addEnemy, this);
        
        // Display time left in quarter
        game.time.events.loop(6000, this.timeLeft, this);
        this.timeLabel = game.add.text(380, 30, '4th Quarter: 0', { font: '18px Arial', fill: '#ffffff' });
var timeleft;
this.seconds = 0;
this.minutes = 0;
   

function updateTimer() {    
minutes = Math.floor(game.time.time / 60000) % 60;    
seconds = Math.floor(game.time.time / 1000) % 60;    
milliseconds = Math.floor(game.time.time) % 100;    
//If any of the digits becomes a single digit number, pad it with a zero    
if (milliseconds < 10)        
milliseconds = '0' + milliseconds;    
if (seconds < 10)        
seconds = '0' + seconds;    
if (minutes < 10)        
minutes = '0' + minutes;    
timer.setText(minutes + ':'+ seconds + ':' + milliseconds);}
        
        //Music
        this.music = this.game.add.audio("E40");
        this.music.play();
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.enemies, this.walls);
        game.physics.arcade.collide(this.enemies, this.walls);
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.playerTurnover, null, this);

        this.movePlayer(); 
        if (!this.player.inWorld) {
            this.respawn();
        }
    },
        
    movePlayer: function() {
        if (this.cursor.left.isDown) {
            this.player.loadTexture("player_left", 0);
            this.player.body.velocity.x = -200;
        }
        else if (this.cursor.right.isDown) {
            this.player.loadTexture("player_right", 0);
            this.player.body.velocity.x = 200;
        }
        else {
            this.player.body.velocity.x = 0;
        }
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -320;
        }
    },
    
    respawn: function() {
        var playerposition = [
           /*{x: 40, y: 260}, {x: 140, y: 50}, {x: 400, y: 50}, {x: 430, y: 280}, {x: game.width /2, y: game.height /2}, {x: 400, y: 300}, */{x: 440, y: 110}
        ];
        
        var newPosition = game.rnd.pick(playerposition);
        this.player.reset(newPosition.x, newPosition.y);
    },
    
    playerTurnover: function() {
        // Make a penalty flag and pass it to score update function
        this.punish = true;
        this.takeCoin(this.player, this.coin, this.punish);
        // Increment the turnover counter
        this.turnovers +=1;
        this.turnLabel.text = 'turnovers: ' + this.turnovers;
        // Make player respawn
        this.respawn();
    },

    takeCoin: function(player, coin, punish) {
        // Creates penalty for turnover
        if(this.punish == true && this.score > 0)
        {
            // Lebron makes a Layup
            this.score -=2;
            // Make sure score is never negative
            if(this.score < 0)
                this.score = 0;
        }
        // If no Turnover count the shot
        else if(this.punish == false){
            this.score += 3;
            this.updateCoinPosition();
            }
        this.scoreLabel.text = 'score: ' + this.score;
        //Reset the penalty flag
        this.punish = false;
    },

    updateCoinPosition: function() {
        var coinPosition = [
            {x: 140, y: 60}, {x: 360, y: 60}, 
            {x: 60, y: 140}, {x: 440, y: 140}, 
            {x: 130, y: 300}, {x: 370, y: 300} 
        ];

        for (var i = 0; i < coinPosition.length; i++) {
            if (coinPosition[i].x == this.coin.x) {
                coinPosition.splice(i, 1);
            }
        }

        var newPosition = game.rnd.pick(coinPosition);
        this.coin.reset(newPosition.x, newPosition.y);
    },

    addEnemy: function() {
        var enemy = this.enemies.getFirstDead();

        if (!enemy) {
            return;
        }
        
        enemy.anchor.setTo(0.5, 1);
        enemy.reset(game.width/2, 0);
        enemy.body.gravity.y = 500;
        enemy.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
        enemy.body.bounce.x = 1;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    },

    createWorld: function() {
        this.walls = game.add.group();
        this.walls.enableBody = true;

        game.add.sprite(0, 0, 'wallV', 0, this.walls); 
        game.add.sprite(480, 0, 'wallV', 0, this.walls); 
        game.add.sprite(0, 0, 'wallH', 0, this.walls); 
        game.add.sprite(300, 0, 'wallH', 0, this.walls);
        game.add.sprite(0, 320, 'wallH', 0, this.walls); 
        game.add.sprite(300, 320, 'wallH', 0, this.walls); 
        game.add.sprite(-100, 160, 'wallH', 0, this.walls); 
        game.add.sprite(400, 160, 'wallH', 0, this.walls); 
        var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
        middleTop.scale.setTo(1.5, 1);
        var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
        middleBottom.scale.setTo(1.5, 1);

        this.walls.setAll('body.immovable', true);
    },

    playerDie: function() {
        this.music.stop();
        game.state.start('main');
    },
};

var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');