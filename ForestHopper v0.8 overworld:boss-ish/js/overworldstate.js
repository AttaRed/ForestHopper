var overworldstate = {
    preload: function(){

        console.log("preload");


        
        game.load.image('overWorld', 'assets/overworld.png');
        game.load.spritesheet('player', 'assets/bunnyRunningSmall.png', 23, 45, 27);
        
        var xTrack
        var yTrack
        var movement
        var lock
        
        

    },

    create: function(){
        console.log("overworld loading");
        game.add.sprite(0, 0, 'overWorld');
        player = game.add.sprite(523, game.world.height - 323, 'player');
        game.physics.arcade.enable(player);
        
        player.animations.add('left', [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10, true);
        player.animations.add('right', [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
        player.animations.add('idle', [13, 13, 13, 13, 13, 14, 15, 14, 13, 13, 13, 13, 13, 12, 11, 12], 9, true);
        
        
        cursors = game.input.keyboard.createCursorKeys();
        
        xTrack = 0
        yTrack = 0
        movement = 0
        lock = 0
        
        
        
        //game.state.start('overworldstate');
    },
    
    update: function(){
        
        //movement code
        if (movement == 0){
            player.animations.play('idle');
            
        }
        else if (movement == -1){
            player.animations.play('left');
            
        }
        else if (movement == 1){
            player.animations.play('right');
        }
        
        
        
        // Map Movement
        // Origin Movement
        if (xTrack == 0  && yTrack == 0 && lock%2 == 0){
            if (cursors.left.isDown){
                player.body.velocity.x = -150;
                movement --;
                lock ++;
            };
            if (cursors.right.isDown){
                //console.log("did it get here?")
                player.body.velocity.x = +150;
                movement ++;
                lock ++;
            };
        }
        
        
        
        
        if (xTrack == -1  && yTrack == 0 && lock%2 == 0){
            if (cursors.left.isDown){
                player.body.velocity.x = -150;
                movement --;
                lock ++;
            }
            else if (cursors.down.isDown){
                player.body.velocity.y = +150;
                lock ++;
            }
            else if (cursors.right.isDown){
                player.body.velocity.x = +150
                movement ++;
                lock ++;
            }
        }
        
        if (xTrack == 1  && yTrack == 0 && lock%2 == 0){
            if (cursors.left.isDown){
                player.body.velocity.x = -150;
                movement --;
                lock ++;
            }
            else if (cursors.down.isDown){
                player.body.velocity.y = +150;
                lock ++;
            }
            else if (cursors.right.isDown){
                player.body.velocity.x = +150
                movement ++;
                lock ++;
            }
        }
        if (xTrack == -1  && yTrack == -1 && lock%2 == 0){
            if (cursors.up.isDown){
                player.body.velocity.y = -150;
                lock ++;
            }
        }
        if (xTrack == 1  && yTrack == -1 && lock%2 == 0){
            if (cursors.up.isDown){
                player.body.velocity.y = -150;
                lock ++;
            }
        }
        
        if (xTrack == 2  && yTrack == 0 && lock%2 == 0){
            if (cursors.up.isDown){
                //console.log("We are moving to the most right up")
                player.body.velocity.y = -150;
                lock ++;
            }
            if (cursors.left.isDown){
                //console.log("We are moving to the left again")
                //console.log(xTrack)
                //console.log(yTrack)
                player.body.velocity.x = -150;
                movement --;
                lock ++;
            }
        }
        
        if (xTrack == 2  && yTrack == 1 && lock%2 == 0){
            if (cursors.down.isDown){
                player.body.velocity.y = +150;
                lock ++;
            }
            if (cursors.left.isDown){
                player.body.velocity.x = -150;
                movement --;
                lock ++;
            }
        }
        
        if (xTrack == -2  && yTrack == 0 && lock%2 == 0){
            if (cursors.up.isDown){
                player.body.velocity.y = -150;
                lock ++;
            }
            if (cursors.right.isDown){
                player.body.velocity.x = +150;
                movement ++;
                lock ++;
            }
        }
        
        if (xTrack == -2  && yTrack == 1 && lock%2 == 0){
            if (cursors.down.isDown){
                player.body.velocity.y = +150;
                lock ++;
            }
        }
        
        if (xTrack == 1  && yTrack == 1 && lock%2 == 0){
            if (cursors.up.isDown){
                player.body.velocity.y = -150;
                lock ++;
            }
            if (cursors.right.isDown){
                player.body.velocity.x = +150;
                movement ++;
                lock ++;
            }
        }
        
        if (xTrack == 1  && yTrack == 1 && lock%2 == 0){
            if (cursors.up.isDown){
                player.body.velocity.y = -150;
                lock ++;
            }
            if (cursors.right.isDown){
                movement ++;
                player.body.velocity.x = +150;
                lock ++;
            }
        }
        
        if (xTrack == 1  && yTrack == 2 && lock%2 == 0){
            if (cursors.down.isDown){
                player.body.velocity.y = +150;
                lock ++;
            }
            
        }
        
        
        
        
        
        
        
        
        
        
        
        // Stop at origins (0,0)
        if (player.body.x >= 522 && player.body.x <= 524 && xTrack != 0){
            player.body.velocity.x = 0
            if (xTrack == -1 || xTrack == 1){
                movement = 0
                if (xTrack == 1){
                    xTrack--;
                    lock ++;
                    console.log(xTrack,yTrack)
                }
                else{
                    xTrack ++;
                    lock ++;
                    console.log(xTrack,yTrack)
                    
                    
                }

            }
        }
        
        
        
        // Stop when reached a certain point
        //Left 2nd stop (-2,0)
//        if (xTrack == 2 && yTrack == 0){
//            console.log("WE are CHECKING")
//        }
        if (player.body.x <= 296 && xTrack == -1 && yTrack == 0
           ){
            player.body.velocity.x = 0
            if (xTrack == -1){
                movement = 0
                xTrack --;
                lock ++;
                console.log(xTrack,yTrack)
            }
        }
        
        //2nd right movement (2,0)
        if (player.body.x >= 748 && xTrack == 1 && yTrack == 0){
            player.body.velocity.x = 0
            if (xTrack == 1){
                movement = 0
                xTrack ++;
                lock ++;
                console.log(xTrack,yTrack)
            }
        }
        // going up from 2nd stop right (2,1)
        if (player.body.y <= game.world.height - 435 && yTrack == 0 && xTrack == 2){
            player.body.velocity.y = 0
            movement = 0
            yTrack ++;
            lock ++;
            
            console.log(xTrack,yTrack)
        }
        
        // down from top right (2,0)
        if (player.body.y >= game.world.height - 323 && xTrack == 2 && yTrack == 1
           ){
            player.body.velocity.y = 0
            movement = 0
            yTrack --;
            lock ++;
            console.log(xTrack,yTrack)
        }
        
        
        
        
        
        //Left first stop (-1,0)
        if (player.body.x <= 337 && xTrack == 0 && yTrack == 0 ){
            player.body.velocity.x = 0
            movement = 0
            xTrack --;
            lock ++;
            console.log(xTrack,yTrack)
        }
        //Left first stop, going down to bottom left (-1,-1)
        if (player.body.y >= 370 && yTrack == 0 && xTrack == -1){
            player.body.velocity.y = 0
            movement = 0
            yTrack --;
            lock ++;
            console.log(xTrack,yTrack)
            
        }
        
        //Bottom left, going up code (-1,0)
        if (player.body.y <= game.world.height - 323 && yTrack == -1 && xTrack == -1){
            player.body.velocity.y = 0
            movement = 0
            yTrack ++;
            lock ++;
            console.log(xTrack,yTrack)
        }
        
        
        //origin to first right stop (1,0)
        if (player.body.x >= 705 && xTrack == 0 && yTrack == 0){
            player.body.velocity.x = 0
            
            movement = 0
            xTrack ++;
            lock ++;
            console.log(xTrack,yTrack)
            
        }
        //2nd right back to first right (1,0)
        if (player.body.x <= 705 && xTrack == 2 && yTrack == 0){
            player.body.velocity.x = 0
            
            movement = 0
            xTrack --;
            lock ++;
            console.log(xTrack,yTrack)
            
        }
        
        //right first stop, going to bottom right (1,-1)
        if (player.body.y >= 370 && yTrack == 0 && xTrack == 1){
            player.body.velocity.y = 0
            movement = 0
            yTrack --;
            lock ++;
            console.log(xTrack,yTrack)
        }
        
        //Bottom right, going up code (1,0)
        if (player.body.y <= game.world.height - 323 && yTrack == -1 && xTrack == 1){
            player.body.velocity.y = 0
            movement = 0
            yTrack ++;
            lock ++;
            console.log(xTrack,yTrack)
        }
        
        //2nd left going up to dark forest (-2,1)
        if (player.body.y <= game.world.height - 358 && yTrack == 0 && xTrack == -2){
            player.body.velocity.y = 0
            movement = 0
            yTrack ++;
            lock ++;
            console.log(xTrack,yTrack)
        }
        
        //2nd left back to first left (-1,0)
        if (player.body.x >= 336 && yTrack == 0 && xTrack == -2){
            player.body.velocity.x = 0
            movement = 0
            xTrack ++;
            lock ++;
            console.log(xTrack,yTrack)
        }
        
        // down from top right (-2,0)
        if (player.body.y >= game.world.height - 323 && xTrack == -2 && yTrack == 1){
            player.body.velocity.y = 0
            movement = 0
            yTrack --;
            lock ++;
            console.log(xTrack,yTrack)
        }
        
        //upright little left (1,1)
        if (player.body.x <= 721 && yTrack == 1 && xTrack == 2){
            player.body.velocity.x = 0
            movement = 0
            xTrack --;
            lock ++;
            console.log(xTrack,yTrack)
        }
        
        // going up from 1,1 (1,2)
        if (player.body.y <= game.world.height - 450 && yTrack == 1 && xTrack == 1){
            player.body.velocity.y = 0
            movement = 0
            yTrack ++;
            lock ++;
            
            console.log(xTrack,yTrack)
        }
        
//        // going right from 1,1 (2,1)
//        if (player.body.y <= game.world.height - 450 && yTrack == 1 && xTrack == 1){
//            player.body.velocity.y = 0
//            movement = 0
//            yTrack ++;
//            lock ++;
//            
//            console.log(xTrack,yTrack)
//        }
        
        //going right from 1,1 (2,1)
        if (player.body.x >= 747 && xTrack == 1 && yTrack == 1){
            player.body.velocity.x = 0
            
            movement = 0
            xTrack ++;
            lock ++;
            console.log(xTrack,yTrack)
            
        }
        
        //going down from 1,1 (1,2)
        if (player.body.y >= game.world.height - 436 && yTrack == 2 && xTrack == 1){
            player.body.velocity.y = 0
            movement = 0
            yTrack --;
            lock ++;
            
            console.log(xTrack,yTrack)
        }
        
        
        
            
        
        
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        

        enterKey.onDown.addOnce(this.play, this);
        
        
    },
    
    play: function(){
        if (xTrack == 0 && yTrack == 0){
            console.log("starting tutorial")
            game.state.start('tutorialstate');
            music = game.add.audio('menuMusic');
            music.loop = true;
            music.play();
        };
        if (xTrack == -2 && yTrack == 1){
            console.log("starting dark forest")
            game.state.start('level1');
            //music = game.add.audio('menuMusic');
            //music.loop = true;
            //
            //music.play();
        };
        if (xTrack == -1 && yTrack == -1){
            console.log("starting boss")
            game.state.start('level1Boss');
            //music = game.add.audio('menuMusic');
            //music.loop = true;
            //
            //music.play();
        };
    },
    
    
        //mushroomEnemy.animations.play('idle');   
};

//var menustate = {
//
////newGame.MainScene = function(){
////newGame.MainScene.prototype = {
//    preload: function(){
//        game.load.image('bg_img', 'assets/TutorialBg.png');
//        game.load.image('font', 'assets/font.png');
//        game.load.image('enter', 'assets/enter.png');
//        game.load.image('dev', 'assets/dev.png');
//        game.load.audio('menuMusic', 'assets/Town-Village Theme 1.ogg');
//    },
//
//
//    create: function(){
//        console.log("creating menu");
//        bg = this.game.add.sprite(0,0, 'bg_img');
//        bg.height = game.height;
//        bg.width = game.width;
//        gameImg = this.game.add.sprite(290, 200, "font")
//        start = this.game.add.sprite(350, 375, "enter");
//        credits = this.game.add.sprite(380, 550, "dev");
//        
//        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
//        
//        enterKey.onDown.addOnce(this.play, this)
//    },
//    
//    play: function(){
//        console.log("starting tutorial")
//        game.state.start('tutorialstate');
//        music = game.add.audio('menuMusic');
//        music.loop = true;
//        music.play();
//        
//    },
//    
//    
//}
//  
//  