var level2 ={

    

preload:function() {

    game.load.image('ground', 'assets/snowy.png');
    game.load.image('platform1', 'assets/snowyPlatform.png');
    //game.load.image('platform2', 'assets/graveyardplatform2.png');
    game.load.image('bg', 'assets/snowyBG.png');
    //game.load.spritesheet('player', 'assets/spritesheet.png', 96, 84);
    game.load.spritesheet('player', 'assets/bunnywork.png', 46, 90, 59);
    game.load.image('crystal','assets/19.png');
    game.load.spritesheet('bat', 'assets/bat.png', 46, 30);
    game.load.spritesheet('mushroom', 'assets/mushroom.png', 32, 32)
    
    game.load.audio('jump', 'assets/Jump 1.wav');
    game.load.audio('hit', 'assets/Hit damage 1.wav');
    game.load.audio('collect', 'assets/Fruit collect 1.wav');
        
    var player;
    var platforms;
    var cursors;
    var items;
    var score;
    var scoreText;
    var canDouble=1;
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    var batEnemy;
    var mushroomEnemy
    var mushroomCounter;
        
},
    
create: function(){

    score=0;

    this.keyboard = game.input.keyboard;

    game.add.sprite(0, 0, 'bg')
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 35, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    var ledge = platforms.create(800, 150, 'platform1');
    ledge.body.immovable = true;
    //ledge = platforms.create(400, 320, 'platform2');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 320, 'platform1');
    ledge.body.immovable = true;

    
    items=game.add.group();
    items.enableBody = true;
    for (var i = 0;i<6 ;i++){
        var item= items.create(game.world.randomX, game.world.randomY*0.7, 'crystal')
        item.body.gravity.y=300;
        item.body.bounce.y=0.3 + Math.random()*0.2;
        item++;
    }

    player = game.add.sprite(96, game.world.height - 127, 'player');
    player.scale.setTo(.7, .7);
    
    game.physics.arcade.enable(player);
    
    player.body.gravity.y = 300;
    
    player.body.collideWorldBounds = true;
//    player.animations.add('left', [7,8,9,10,11,12,13,14], 10, true);
//    player.animations.add('right', [7,8,9,10,11,12,13,14], 10, true);
//    player.animations.add('idle', [0,1,2,3,4,5,6], 10, true);
//    player.animations.add('ascending',[17],40,true);
//    player.animations.add('doublejump',[18,19,20,21,22,23,24,25,26],10,true);
//    player.animations.add('float',[16],10,true);
//    player.animations.add('descending',[15],10,true);
//    player.animations.add('melee',[32,33,34,35,36,37,38,39,40,41],10,true);
    player.animations.add('left', [13, 12, 11, 10, 6, 5, 4, 3, 2, 1, 0], 20, true);
    player.animations.add('right', [22, 23, 24, 25, 26, 30, 31, 32, 33, 34, 35], 20, true);
    player.animations.add('idle', [53, 54, 55, 56, 57, 58, 59], 1, true);
    player.animations.add('ascending',[8],40,true);
    player.animations.add('doublejump',[9, 41, 42, 43, 44, 45, 46, 47, 48],10,true);
    player.animations.add('float',[7],10,true);
    player.animations.add('descending',[46],10,true);


    batEnemy = game.add.sprite(400, game.world.height - 300, 'bat')
    game.physics.arcade.enable(batEnemy);
    batEnemy.body.collideWorldBounds = true;
    batEnemy.animations.add('flying', [0, 1, 2, 3, 4, 5, 6], 10, true);
    
    mushroomCounter = 0
    mushroomEnemy = game.add.sprite(600, game.world.height - 100, 'mushroom')
    game.physics.arcade.enable(mushroomEnemy);
    mushroomEnemy.body.gravity.y = 300;
    mushroomEnemy.body.collideWorldBounds = true;
    mushroomEnemy.animations.add('left', [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], 20, true);
    mushroomEnemy.animations.add('right', [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], 20, true);
    mushroomEnemy.animations.add('idle', [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18], 20, true);


    scoreText = game.add.text(16, 16, 'score: '+ score, { fontSize: '32px', fill: '#000' });
    cursors = game.input.keyboard.createCursorKeys();
    
    jumpSound = game.add.audio('jump');
    hitSound = game.add.audio('hit');
    collectSound = game.add.audio('collect');
    
        
},


update: function(){

    
    batEnemy.animations.play('flying');
    mushroomEnemy.animations.play('idle');   
    
    
    airLineOfSight(player, batEnemy, [400, 300], [150, 100], [50,50]);

    game.physics.arcade.collide(player, platforms, platformCollide);
    game.physics.arcade.collide(batEnemy, platforms);
    game.physics.arcade.collide(items,platforms);
    game.physics.arcade.overlap(player,items,getItem,null,this);
    game.physics.arcade.overlap(player, batEnemy, enemyInteraction, null, this);
    
    game.physics.arcade.collide(mushroomEnemy, platforms);
    game.physics.arcade.overlap(player, mushroomEnemy, enemyInteraction, null, this);
    
    //enemy, counter, xCords, xDist, yDist, speed
    mushroomCounter = groundMovement(mushroomEnemy, mushroomCounter, 600, 100, 75)
    

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
//        player.anchor.setTo(.5,.5);
//        player.scale.x =-1;
        if(player.body.velocity.y==0){
            player.animations.play('left');
        }
        
    }

    else if (cursors.right.isDown)
    {
     player.body.velocity.x = 150;
//     player.anchor.setTo(.5,.5);
//     player.scale.x =1;
     if(player.body.velocity.y==0){
        player.animations.play('right');
     }
     
    }

    else if( player.body.velocity.x==0 && player.body.velocity.y==0)
    {
        //player.animations.stop();
        player.animations.play('idle');
    }
    
    
    if(cursors.down.isDown){
        player.body.velocity.y=0;
        
        if(cursors.right.isDown){
            player.body.velocity.x=350;
//            player.anchor.setTo(.5,.5);
//            player.scale.x =1;
            
            player.animations.play('ascending');

        }else if(cursors.left.isDown){
//            player.anchor.setTo(.5,.5);
//            player.scale.x =-1;
            player.body.velocity.x=-350;
            
            player.animations.play('ascending');
        }
    }
    
    cursors.up.onDown.add(jumpCheck);
    
    
    function jumpCheck() {
        if((jumpCount < 1) && (player.body.touching.down)){
            jump();
           jumpHeight=0.66;
            jumpSound.play();
            
        }
        if((jumpCount < 2) && (!player.body.touching.down)){
            jump();
            jumpSound.play()
  
        }

    }

    function jump(){
       
        jumpCount ++;
        player.body.velocity.y = -350*jumpHeight;
        player.animations.play('doublejump');
        jumpSound.play();
    }

    
    
    if (player.body.velocity.y >0){
        player.animations.play('descending');
    }
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    var attacking
        
    function platformCollide(){
    
        jumpCount = 0;
        jumpHeight=1;
        
    }
    function enemyInteraction (player, enemy) {
        
        if(player.body.touching.down && enemy.body.touching.up){
            enemy.kill();
            jumpCount=1;
            jumpHeight=0.33;
            jump();
            jumpCount=1;
            jumpHeight=0.66;
            hitSound.play();
        }else{
           //player.kill();
        }
    }

    function airLineOfSight (player, enemy, enemyCords, enemySight, enemySpeed){
        playersXCords = player.body.x
        playersYCords = player.body.y
        enemyXCords = enemy.body.x
        enemyYCords = enemy.body.y
        xDistanceAbs = Math.abs(enemyXCords - playersXCords)
        yDistanceAbs = Math.abs(enemyYCords - playersYCords)
        xDistance = enemyXCords - playersXCords
        yDistance = enemyYCords - playersYCords
        if (xDistanceAbs <= enemySight[0] && yDistanceAbs <= enemySight[0]){
            
            
            if (xDistance <= 0 && yDistance <= 0){
                enemy.anchor.setTo(.5,.5);
                enemy.scale.x =-1;
                enemy.body.velocity.x = +enemySpeed[0]
                enemy.body.velocity.y = +enemySpeed[1]
            }
            else if (xDistance > 0 && yDistance > 0){
                enemy.anchor.setTo(.5,.5);
                enemy.scale.x =1;
                enemy.body.velocity.x = -enemySpeed[0]
                enemy.body.velocity.y = -enemySpeed[1]
            }
            else if (xDistance <= 0 && yDistance > 0){
                enemy.anchor.setTo(.5,.5);
                enemy.scale.x =-1;
                enemy.body.velocity.x = +enemySpeed[0]
                enemy.body.velocity.y = -enemySpeed[1]
            }
            else if (xDistance > 0 && yDistance <= 0){
                enemy.body.velocity.x = -enemySpeed[0]
                enemy.body.velocity.y = +enemySpeed[1]
            }
        }
        else if (enemyXCords == enemyCords[0] && enemyYCords == enemyCords[1]){
            enemy.anchor.setTo(.5,.5);
            enemy.scale.x =1;
            enemy.body.velocity.x = 0
            enemy.body.velocity.y = 0    
        }
        else {
            if (enemyXCords >= enemyCords[0]){
                enemy.body.velocity.x = -enemySpeed[0]
            }
            else {
                enemy.body.velocity.x = +enemySpeed[0]
            }
            if (enemyYCords >= enemyCords[1]){
                enemy.body.velocity.y = -enemySpeed[1]
            }
            else {
                enemy.body.velocity.y = +enemySpeed[1]
            }
            
        }
                 
        
        
    }
    


    function getItem(player, items){
        items.kill();
        score += 1;
        scoreText.text = "Score: " + score;
        console.log(score)
        collectSound.play();
    }
    function groundMovement (enemy, counter, xCords, xDist, speed){
    
        enemyPosition = enemy.body.x
        farLeft = xCords - xDist
        farRight = xCords + xDist
        console.log (enemyPosition)
        if (counter == 0) {
            enemy.body.velocity.x = -speed
            if (enemyPosition <= farLeft) {
            
                counter += 1
            }
        
        }
        else if (counter == 1) {
            enemy.body.velocity.x = +speed
            if (enemyPosition >= farRight){
            
                counter -= 1
            }
        
        }
        return counter

    }
    
}
}
