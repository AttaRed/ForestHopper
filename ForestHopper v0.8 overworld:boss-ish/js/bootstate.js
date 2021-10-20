var bootState= {

    create: function(){
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log("starting loadscreen");
        game.state.start('load');
    }
};