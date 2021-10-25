var menustate = {

//newGame.MainScene = function(){
//newGame.MainScene.prototype = {
    preload: function(){
        game.load.image('bg_img', 'assets/TutorialBg.png');
        game.load.image('font', 'assets/font.png');
        game.load.image('enter', 'assets/enter.png');
        game.load.image('dev', 'assets/dev.png');
        game.load.audio('menuMusic', 'assets/Town-Village Theme 1.ogg');
    },


    create: function(){
        console.log("creating menu");
        bg = this.game.add.sprite(0,0, 'bg_img');
        bg.height = game.height;
        bg.width = game.width;
        gameImg = this.game.add.sprite(290, 200, "font")
        start = this.game.add.sprite(350, 375, "enter");
        credits = this.game.add.sprite(380, 550, "dev");
        
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        enterKey.onDown.addOnce(this.play, this)
    },
    
    play: function(){
        game.state.start('overworldstate');
//        console.log("starting tutorial")
//        game.state.start('tutorialstate');
//        music = game.add.audio('menuMusic');
//        music.loop = true;
//        music.play();
        
    },
    
    
}