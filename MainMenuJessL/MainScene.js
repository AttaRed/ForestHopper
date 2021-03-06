var newGame = {};

newGame.MainScene = function(){};
newGame.MainScene.prototype = {
    preload: function(){
        game.load.image('bg_img', 'TutorialBg.png');
        game.load.image('font', 'font.png');
    },
    create: function(){
        bg = this.game.add.sprite(0,0, 'bg_img');
        bg.height = game.height;
        bg.width = game.width;
        gameImg = this.game.add.sprite(321, 200, "font")
        start = this.game.add.text(378, 300, "<Press Enter to Play>", {
            font: "32px Arial",
            fill: "#000000",
            align: "center"
        })
        
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        enterKey.onDown.addOnce(this.play, this)
    },
    
    play: function(){
        game.state.start('tutorialGameState')
    },
    
    update: function(){}
};