var level1Boss ={

    

preload:function() {

    game.load.image('ground', 'assets/graveyardground.png');
    //game.load.image('platform1', 'assets/graveyardplatform1.png');
    //game.load.image('platform2', 'assets/graveyardplatform2.png');
    game.load.image('bg', 'assets/graveyard.png');
    //game.load.spritesheet('player', 'assets/spritesheet.png', 96, 84);
    game.load.spritesheet('player', 'assets/bunnywork.png', 46, 90, 59);
    game.load.image('bag','assets/bag.png');
    //game.load.spritesheet('bat', 'assets/bat.png', 46, 30);
    //game.load.spritesheet('mushroom', 'assets/mushroom.png', 32, 32)
    game.load.spritesheet('projectile', 'assets/WaterBall - Startup and Infinite.png',64,64)
    
    game.load.spritesheet('minotaur', 'assets/Minotaur - Sprite Sheet.png', 96, 96)
    
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
    //var batEnemy;
    //var mushroomEnemy
    var boss
    var mushroomCounter;
    var projectiles;
    var bullet;
    var floor;
    
    var movement;
    var action;
    var actionList;
},
    
create: function(){

    score=0;

    this.keyboard = game.input.keyboard;

    game.add.sprite(0, 0, 'bg')
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    //var ledge = platforms.create(800, 150, 'platform1');
    //ledge.body.immovable = true;
    //ledge = platforms.create(400, 320, 'platform2');
    //ledge.body.immovable = true;
    //ledge = platforms.create(10, 100, 'platform1');
    //ledge.body.immovable = true;

    
    items=game.add.group();
    items.enableBody = true;
    for (var i = 0;i<6 ;i++){
        var item= items.create(game.world.randomX, game.world.randomY*0.7, 'bag')
        item.body.gravity.y=300;
        item.body.bounce.y=0.3 + Math.random()*0.2;
        item++;
    }

    player = game.add.sprite(900, game.world.height - 127, 'player');
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
    
    boss = game.add.sprite(400, game.world.height - 500, 'minotaur');
    boss.scale.setTo(5, 5);
    
    game.physics.arcade.enable(boss);
    boss.body.gravity.y = 300;
    boss.body.collideWorldBounds = true;
    boss.animations.add('all', [0, 1, 2, 3, 4, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 41, 42, 43, 44, 50, 51, 52, 53, 54, 55, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 72, 80, 81, 82, 90, 91, 92, 93, 94, 95, 100, 101, 102, 103, 104, 110, 111, 112, 113, 114, 115, 116, 117, 120, 121, 122, 123, 124, 130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 141, 142, 143, 144, 150, 151, 152, 153, 154, 155, 160, 161, 162, 163, 164, 165, 166, 167, 168, 170, 171, 172, 180, 181, 182, 190, 191, 192, 193, 194, 195], 10, true);
    
    boss.animations.add('idleRight', [0, 1, 2, 3, 4], 10, true);
    
    boss.animations.add('moveRight', [10, 11, 12, 13, 14, 15, 16, 17], 10, true);
    
    boss.animations.add('tauntRight', [20, 21, 22, 23, 24], 10, true);
    
    boss.animations.add('attack1Right', [30, 31, 32, 33, 34, 35, 36, 37, 38], 10, true);
    
    boss.animations.add('attack2Right', [40, 41, 42, 43, 44], 10, true);
    
    boss.animations.add('attack3Right', [50, 51, 52, 53, 54, 55], 10, true);
    
    boss.animations.add('attack4Right', [60, 61, 62, 63, 64, 65, 66, 67, 68], 10, true);
    
    boss.animations.add('damage1Right', [70, 71, 72], 10, true);
    
    boss.animations.add('damage2Right', [80, 81, 82], 10, true);
    
    boss.animations.add('deathRight', [90, 91, 92, 93, 94, 95], 10, true);
    
    boss.animations.add('idleLeft', [100, 101, 102, 103, 104], 10, true);
    
    boss.animations.add('moveLeft', [110, 111, 112, 113, 114, 115, 116, 117], 10, true);
    
    boss.animations.add('tauntLeft', [120, 121, 122, 123, 124], 10, true);
    
    boss.animations.add('attack1Left', [130, 131, 132, 133, 134, 135, 136, 137, 138], 10, true);
    
    boss.animations.add('attack2Left', [140, 141, 142, 143, 144], 10, true);
    
    boss.animations.add('attack3Left', [150, 151, 152, 153, 154, 155], 10, true);
    
    boss.animations.add('attack4Left', [160, 161, 162, 163, 164, 165, 166, 167, 168], 10, true);
    
    boss.animations.add('damage1Left', [170, 171, 172], 10, true);
    
    boss.animations.add('damage2Left', [180, 181, 182], 10, true);
    
    boss.animations.add('deathLeft', [190, 191, 192, 193, 194, 195], 10, true);
    
    // regularRight set size
    boss.body.setSize(33, 42, 28, 22);
    
    //Attack1Right setsize
    //boss.body.setSize(60, 57, 28, 7);
    
    //Attack2Right setsize
    //boss.body.setSize(60, 42, 28, 22);
    
    //Attack3Right setsize
    //boss.body.setSize(37, 53, 24, 11);
    
    //Attack4Right setsize
    //boss.body.setSize(87, 42, 2, 22);
    
    
    // regularLeft set size
    //boss.body.setSize(30, 42, 35, 22);
    
    //Attack1Left setsize
    //boss.body.setSize(56, 57, 10, 7);
    
    //Attack2Left setsize
    //boss.body.setSize(56, 42, 10, 22);
    
    //Attack3Left setsize
    //boss.body.setSize(38, 53, 35, 11);
    
    //Attack4Left setsize
    //boss.body.setSize(87, 42, 7, 22);
    
    
//    floor = new Phaser.Rectangle(300,400, 100, 40);
//    //game.physics.arcade.enable(floor);
//    
//    game.debug.geom(floor,'#0fffff');
//    
//    boss.alignIn(floor)
//    //game.debug.geom(boss,'#0fffff');
    
    
    


    
    mushroomCounter = 0



    cursors = game.input.keyboard.createCursorKeys();
    projectiles=game.add.group();
    projectiles.enableBody=true;
    bullet=projectiles.create(0,0,'projectile');
    bullet.kill();
    bullet.animations.add('fired',[0,1,2,3,4],10,false);
    bullet.animations.add('moving',[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],10,true);
    
    fireButton=game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    scoreText = game.add.text(16, 16, 'score: '+ score, { fontSize: '32px', fill: '#000' });
    cursors = game.input.keyboard.createCursorKeys();
    
    jumpSound = game.add.audio('jump');
    hitSound = game.add.audio('hit');
    collectSound = game.add.audio('collect');

    playerdirection="right";
    
    movement = 1
    cycle = 0
    actionList = ["idle", "move", "taunt", "attack1", "attack2", "attack3", "attack4", "damage1", "damage2", "death"]
    action = "move"
    
    
    //setInterval(whatAnimate(movement, action, boss, cycle), 10000)
    

},


update: function(){
    
    whatAnimate(movement, action, boss)
    
//    if (animate == "idleLeft" || animate == "moveLeft" || animate == "tauntLeft" || animate == "damage1Left" || animate == "damage2Left"){
//        boss.body.setSize(30, 42, 35, 22)
//        boss.animations.play(animate)
//    }
//    if (animate == "attack1Left") {
//        boss.body.setSize(56, 57, 10, 7)
//        boss.animations.play(animate)
//    }
//    if (animate == "attack2Left") {
//        boss.body.setSize(56, 42, 10, 22)
//        boss.animations.play(animate)
//    }
//    if (animate == "attack3Left") {
//        boss.body.setSize(38, 53, 35, 11)
//        boss.animations.play(animate)
//    }
//    if (animate == "attack4Left") {
//        boss.body.setSize(87, 42, 7, 22)
//        boss.animations.play(animate)
//    }
//    
//    if (animate == "idleRight" || animate == "moveRight" || animate == "tauntRight" || animate == "damage1Right" || animate == "damage2Right"){
//        boss.body.setSize(33, 42, 28, 22)
//        boss.animations.play(animate)
//    }
//    if (animate == "attack1Right") {
//        boss.body.setSize(60, 57, 28, 7)
//        boss.animations.play(animate)
//    }
//    if (animate == "attack2Right") {
//        boss.body.setSize(60, 42, 28, 22)
//        boss.animations.play(animate)
//    }
//    if (animate == "attack3Right") {
//        boss.body.setSize(37, 53, 24, 11)
//        boss.animations.play(animate)
//    }
//    if (animate == "attack4Right") {
//        boss.body.setSize(87, 42, 2, 22)
//        boss.animations.play(animate)
//    }
    

    
//    batEnemy.animations.play('flying');
//    mushroomEnemy.animations.play('idle');
    //boss.animations.play('idleRight')
    //boss.alignTo(floor)
//    boss.alignIn(floor, Phaser.TOP_LEFT, 0, 0)
    
    game.physics.arcade.overlap(bullet,boss,weaponInteraction,null,this);
    game.physics.arcade.collide(boss, platforms);
    game.physics.arcade.overlap(player, boss, enemyInteraction, null, this);
    
//    airLineOfSight(player, batEnemy, [400, 300], [150, 100], [50,50]);

    game.physics.arcade.collide(player, platforms, platformCollide);
    //game.physics.arcade.collide(batEnemy, platforms);
    game.physics.arcade.collide(items,platforms);
    game.physics.arcade.overlap(player,items,getItem,null,this);
    //game.physics.arcade.overlap(player, batEnemy, enemyInteraction, null, this);
    //game.physics.arcade.overlap(bullet,batEnemy,weaponInteraction,null,this);
    //game.physics.arcade.overlap(bullet,mushroomEnemy,weaponInteraction,null,this);
    //game.physics.arcade.collide(mushroomEnemy, platforms);
    //game.physics.arcade.overlap(player, mushroomEnemy, enemyInteraction, null, this);
    
    //enemy, counter, xCords, xDist, yDist, speed
    //mushroomCounter = groundMovement(mushroomEnemy, mushroomCounter, 600, 100, 75)
    

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {   playerdirection= "left";
        player.body.velocity.x = -150;
//        player.anchor.setTo(.5,.5);
//        player.scale.x =-1;
        if(player.body.velocity.y==0){
            player.animations.play('left');
        }
        
    }

    else if (cursors.right.isDown)
    {   playerdirection= "right";
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
    
    fireButton.onDown.addOnce(shoot,this);
    function shoot() {
    
        console.log(playerdirection);
        
        var bulletDirection=playerdirection;
        if(bulletDirection=="right"){
            bullet=projectiles.create(player.x-68,player.y-25,'projectile');
            bullet.scale.setTo(2,2);
            bullet.animations.play('fired');
            bullet.animations.play('moving');
            bullet.body.velocity.x=375
        }else if( bulletDirection="left"){
            bullet=projectiles.create(player.x+84,player.y-25,'projectile');
            bullet.scale.setTo(-2,2);
            bullet.animations.play('fired');
            bullet.animations.play('moving');
            bullet.body.velocity.x=-375;
            bullet.scale.x= -2;
        }
        
        
    }

    
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
    
        if(player.body.touching.down){
            jumpCount = 0;
            jumpHeight=1;
        }
        
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
    function weaponInteraction(bullet,enemy){
        enemy.kill();
        bullet.kill();
        score=score+1;
        scoreText.text = "Score: " + score;
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
    
    function whatAnimate (movement, action, enemy){
        
        
    
    
        dictLeft = {
            idle : "idleLeft",
            move : "moveLeft",
            taunt : "tauntLeft",
            attack1 : "attack1Left",
            attack2 : "attack2Left",
            attack3 : "attack3Left",
            attack4 : "attack4Left",
            damage1 : "damage1Left",
            damage2 : "damage2Left",
            death : "deathLeft",

            
        }
        
        dictRight = {
            idle : "idleRight",
            move : "moveRight",
            taunt : "tauntRight",
            attack1 : "attack1Right",
            attack2 : "attack2Right",
            attack3 : "attack3Right",
            attack4 : "attack4Right",
            damage1 : "damage1Right",
            damage2 : "damage2Right",
            death : "deathRight",
            
        }
        
        
        if (movement == 1){
            
            
            animate = dictLeft[action]
            
        }
        if (movement == 2){
            
            animate = dictRight[action]
            
        }
        
        if (animate == "idleLeft" || animate == "moveLeft" || animate == "tauntLeft" || animate == "damage1Left" || animate == "damage2Left"){
            
            enemy.body.setSize(30, 42, 35, 22)
            enemy.animations.play(animate)
            if (animate == "idleLeft" || animate == "tauntLeft" || animate == "damage1Left" || animate == "damage2Left"){
                enemy.body.velocity.x = 0
            }
            else if (animate == "moveLeft"){
                enemy.body.velocity.x = -50
                
            }
        }
        if (animate == "attack1Left") {
            enemy.body.setSize(56, 57, 10, 7)
            boss.animations.play(animate)
            enemy.body.velocity.x = 0
        }
        if (animate == "attack2Left") {
            enemy.body.setSize(56, 42, 10, 22)
            enemy.animations.play(animate)
            enemy.body.velocity.x = 0
        }
        if (animate == "attack3Left") {
            enemy.body.setSize(38, 53, 35, 11)
            enemy.animations.play(animate)
            enemy.body.velocity.x = 0
        }
        if (animate == "attack4Left") {
            enemy.body.setSize(87, 42, 7, 22)
            enemy.animations.play(animate)
            enemy.body.velocity.x = 0
        }
        
    
        if (animate == "idleRight" || animate == "moveRight" || animate == "tauntRight" || animate == "damage1Right" || animate == "damage2Right"){
            enemy.body.setSize(33, 42, 28, 22)
            enemy.animations.play(animate)
            if (animate == "idleRight" || animate == "tauntRight" || animate == "damage1Right" || animate == "damage2Right"){
                enemy.body.velocity.x = 0
            }
            else if (animate == "moveRight"){
                enemy.body.velocity.x = +50
            }
        }
        if (animate == "attack1Right") {
            enemy.body.setSize(60, 57, 28, 7)
            enemy.animations.play(animate)
            enemy.body.velocity.x = 0
        }
        if (animate == "attack2Right") {
            enemy.body.setSize(60, 42, 28, 22)
            enemy.animations.play(animate)
            enemy.body.velocity.x = 0
        }
        if (animate == "attack3Right") {
            enemy.body.setSize(37, 53, 24, 11)
            enemy.animations.play(animate)
            enemy.body.velocity.x = 0
        }
        if (animate == "attack4Right") {
            enemy.body.setSize(87, 42, 2, 22)
            enemy.animations.play(animate)
            enemy.body.velocity.x = 0
        }
        
        cycle ++
        if (cycle > 9){
            cycle = 0
        }
        
        
    }
    
    if (score == 6) {
        game.state.start('overworldstate');
    }
    
}
}