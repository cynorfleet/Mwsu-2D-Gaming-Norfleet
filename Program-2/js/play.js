var playState = {

    create: function() {

        // store sound clips in variables
        this.jumpSound = game.add.audio('jump');
        this.coinSound = game.add.audio('coin');
        this.deadSound = game.add.audio('dead');

        // music plays when game starts
        this.music = game.add.audio('music'); // Add the music
        this.music.loop = true; // Make it loop

        // Change the volume of the sound (0 = mute, 1 = full sound)
        this.music.volume = .7;
        // Increase the volume from 0 to 1 over the duration specified
        this.music.fadeIn(5000);
        // Decrease the volume from its current value to 0 over the duration
        this.music.fadeOut(5000);
        this.music.play(); // Start the music

        this.cursor = game.input.keyboard.createCursorKeys();

        this.player = game.add.sprite(game.width/2, game.height/2, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;

        // Create the 'right' animation by looping the frames 1 and 2
        this.player.animations.add('right', [1, 2], 8, true);
        // Create the 'left' animation by looping the frames 3 and 4
        this.player.animations.add('left', [3, 4], 8, true);

        this.createWorld();

        this.coin = game.add.sprite(60, 140, 'coin');
        game.physics.arcade.enable(this.coin);
        this.coin.anchor.setTo(0.5, 0.5);

        // Scale the coin to 0 to make it invisible
        this.coin.scale.setTo(0, 0);
        // Grow the coin back to its original scale in 300ms
        game.add.tween(this.coin.scale).to({x: 1, y: 1}, 300).start();

        this.scoreLabel = game.add.text(30, 30, 'score: 0',
            { font: '18px Arial', fill: '#ffffff' });
        game.global.score = 0;

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');
        game.time.events.loop(2200, this.addEnemy, this);
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.enemies, this.walls);
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

        this.movePlayer();

        if (!this.player.inWorld) {
            this.playerDie();
        }
    },

    movePlayer: function() {
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.animations.play('left'); // Left animation
        }
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('right'); // Right animation
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop(); // Stop animations
            this.player.frame = 0; // Change frame (stand still)
        }

        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -320;
            // plays sound if player jumps
            this.jumpSound.play();
        }
    },

    takeCoin: function(player, coin) {
        // add effect to player when taking coin
        game.add.tween(this.player.scale).to({x: 1.3, y: 1.3}, 100).yoyo(true).start();

        game.global.score += 5;
        this.scoreLabel.text = 'score: ' + game.global.score;

        // play sound if coin is taken
        this.coinSound.play();

        this.updateCoinPosition();
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
        // plays sound if player dies
        this.deadSound.play();

        // stop muisic at death
        this.music.stop();
        game.state.start('menu');
    },
};
