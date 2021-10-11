var menustate = {

//newGame.MainScene = function(){
//newGame.MainScene.prototype = {
    preload: function(){
        game.load.image('bg_img', 'assets/TutorialBg.png');
        game.load.image('font', 'assets/font.png');
        game.load.audio('menuMusic', 'assets/Town-Village Theme 1.ogg');
    },


    create: function(){
        console.log("creating menu");
        bg = this.game.add.sprite(0,0, 'bg_img');
        bg.height = game.height;
        bg.width = game.width;
        gameImg = this.game.add.sprite(321, 200, "font")
        start = this.game.add.text(370, 300, "<Press Enter to Play>", {
            font: "32px Arial",
            fill: "#000000",
            align: "center"
        })
        credits = this.game.add.text(300, 500, "Game Developed by Team 3: Hollow", {
            font: "28px Arial",
            fill: "#000000",
            align: "center"
        });
        
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        enterKey.onDown.addOnce(this.play, this)
    },
    
    play: function(){
        console.log("starting game")
        game.state.start('gamestate')
        music = game.add.audio('menuMusic');
        music.play();
        
    },
    
    
}