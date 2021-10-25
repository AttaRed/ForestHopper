var tutorialstate = {
    preload: function(){
        game.load.image('bg_img', 'assets/TutorialBg.png');
        game.load.image('howText', 'assets/HowToFont.png');
        game.load.image('description', 'assets/description.png');
        game.load.image('key', 'assets/movementKey.png');
        game.load.image('cont', 'assets/Cont.png');
    },
    
    create: function(){
        bg = this.game.add.sprite(0,0, 'bg_img');
        bg.height = game.height;
        bg.width = game.width;
        how = this.game.add.sprite(310, 100, 'howText');
        des = this.game.add.sprite(220,200, 'description');
        key = this.game.add.sprite(220, 300, 'key');
        cont = this.game.add.sprite(900, 550, 'cont');
        
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        enterKey.onDown.addOnce(this.play, this);
    },
    
    play: function(){
        game.state.start('overworldstate');
}

}