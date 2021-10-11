var game = new Phaser.Game(1058, 600, Phaser.AUTO, 'gameDiv');
game.state.add('boot',bootState);

game.state.add('load',loadscreen);

game.state.add('mainmenu',menustate);

game.state.add('gamestate',gamestate);
console.log("states added");
game.state.start('boot');