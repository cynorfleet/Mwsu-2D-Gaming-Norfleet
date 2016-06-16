var loadState = {

    preload: function () {
        var loadingLabel = game.add.text(game.width/2, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        game.load.spritesheet('player', 'assets/player2.png', 20, 20);
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('coin', 'assets/coin.png');

        // Load the tileset information
        game.load.image('tileset', 'assets/tileset.png');
        game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);

        // Load buttons
        game.load.image('jumpButton', 'assets/jumpButton.png', 50, 50);
        game.load.image('rightButton', 'assets/rightButton.png', 50, 50);
        game.load.image('leftButton', 'assets/leftButton.png', 50, 50);

        game.load.image('background', 'assets/background.png');
        game.load.image('pixel', 'assets/pixel.png');
        game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);

        game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
        game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
        game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
    },

    addMobileInputs: function() {
    // Add the jump button
    var jumpButton = game.add.sprite(350, 240, 'jumpButton');
    jumpButton.inputEnabled = true;
    jumpButton.alpha = 0.5;

    // Add the move left button
    var leftButton = game.add.sprite(50, 240, 'leftButton');
    leftButton.inputEnabled = true;
    leftButton.alpha = 0.5;

    // Add the move right button
    var rightButton = game.add.sprite(130, 240, 'rightButton');
    rightButton.inputEnabled = true;
    rightButton.alpha = 0.5;
},

    create: function() {
        game.state.start('menu');
    }
};
