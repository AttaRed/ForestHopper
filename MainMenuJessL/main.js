var game = new Phaser.Game(1058,600, Phaser.AUTO, '');

game.state.add('MainScene', newGame.MainScene);
game.state.add('tutorialGameState', newGame.tutorialGameState);
game.state.start('MainScene');