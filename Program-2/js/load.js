var loadState = {

    preload: function () {
        // pre-load sound clips
        // Sound when the player jumps
        game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
        // Sound when the player takes a coin
        game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
        // Sound when the player dies
        game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);

        // pre-load music
        game.load.audio('music', ['assets/Partyboy.ogg', 'assets/Partyboy.mp3']);

        var loadingLabel = game.add.text(game.width/2, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        game.load.spritesheet('player', 'assets/player2.png', 20, 20);
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('background', 'assets/background.png');

        // pre-load particles
        game.load.image('pixel', 'assets/pixel.png');

        // Preload mute button
        game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);

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
    },

    create: function() {
        game.state.start('menu');
    }
};
