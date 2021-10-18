var game = new Phaser.Game(1058, 600, Phaser.AUTO, 'gameDiv');
game.state.add('boot',bootState);

game.state.add('load',loadscreen);

game.state.add('mainmenu',menustate);

game.state.add('gamestate',gamestate);

game.state.add('tutorialstate', tutorialstate);

game.state.add('level1', level1);

console.log("states added");
game.state.start('boot');