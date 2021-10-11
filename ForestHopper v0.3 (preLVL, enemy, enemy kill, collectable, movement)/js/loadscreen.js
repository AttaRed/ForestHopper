var loadscreen= {
    preload: function(){

        console.log("preload");
        var loadingLabel= game.add.text(80,150, 'Loading Game', {font: '30px Courier', fill: '#ffffff'});

        game.load.image('ground', 'assets/platform.png');
        game.load.image('bg1', 'assets/TutorialBG.png');
        game.load.spritesheet('player', 'assets/spritesheet.png', 96, 84,32);

    },

    create: function(){
        console.log("mainmenu loading");
        game.state.start('mainmenu');
    }
};
  
  