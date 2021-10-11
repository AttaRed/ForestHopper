var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
function preload() {
 //preload forest backgrounds
 game.load.image("sky1", "assets/plx-1.png")
 game.load.image("sky2", "assets/plx-2.png")
 game.load.image("sky3", "assets/plx-3.png")
 game.load.image("sky4", "assets/plx-4.png")
 game.load.image("sky5", "assets/plx-5.png")
 //preload ground, fruit, enemy, and player
 game.load.image('ground', 'assets/platform1.png');
 game.load.image('fruit', 'assets/Apple.png');
 game.load.spritesheet('bat', 'assets/bat.png', 46, 30)    
 game.load.spritesheet('dude', 'assets/all.png', 19, 34);
}
var player;
var enemy;
var platforms;
var cursors;
var fruits;
var totalFruits;
var score = 0;
var scoreText;
var gameOverText;
function create() {

 // enable phaser's Physics system
 game.physics.startSystem(Phaser.Physics.ARCADE);
 // load backgrounds
 game.add.sprite(0, 0, 'sky1');
 game.add.sprite(0, 0, 'sky2');
 game.add.sprite(0, 0, 'sky3');
 game.add.sprite(0, 0, 'sky4');
 game.add.sprite(0, 0, 'sky5');

 //group of grounds and ledges that player can walk on
 platforms = game.add.group();
 //create physics for everything in platoform group
 platforms.enableBody = true;
 //Ground
 var ground = platforms.create(0, game.world.height - 64, 'ground');
 // Scale it to fit the width of the game
 ground.scale.setTo(2, 2);
 // Stops from falling away when you jump on it
 ground.body.immovable = true;
 // Two ledges
 var ledge = platforms.create(400, 400, 'ground');
 ledge.body.immovable = true;
 ledge = platforms.create(-150, 250, 'ground');
 ledge.body.immovable = true;
    
 // Create Player
 player = game.add.sprite(32, game.world.height - 150, 'dude'); 
 //Create Bat   
 enemy = game.add.sprite(400, game.world.height - 300, 'bat')
 //bat setting and physic code
 game.physics.arcade.enable(enemy);
 enemy.body.collideWorldBounds = true;
 //Pick frames from spritesheet of bat flying, and how fast
 enemy.animations.add('flying', [0, 1, 2, 3, 4, 5, 6], 10, true);
 
 // We need to enable physics on the player
 game.physics.arcade.enable(player);
 // Player physics properties. Give the little guy a slight bounce.
 player.body.bounce.y = 0.2;
 player.body.gravity.y = 300;
 player.body.collideWorldBounds = true;
 // Left,right, and idle animations
 player.animations.add('left', [25, 26, 27, 28, 29, 32, 33, 34], 10, true);
 player.animations.add('right', [15, 16, 17, 18, 19, 20, 21, 22], 10, true);
 player.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 7, true);
    

 // Fruit code (collectables)
 //counter
 totalFruits = 12
 fruits = game.add.group();
 // Physics for all fruit
 fruits.enableBody = true;
 // Here we'll create 12 of them evenly spaced apart
 for (var i = 0; i < totalFruits; i++)
 {
 // Create a fruit inside of the 'fruits' group
 var fruit = fruits.create(i * 70, 0, 'fruit');
 // gravity
 fruit.body.gravity.y = 300;
 // This just gives each fruit a slightly random bounce value
 fruit.body.bounce.y = 0.7 + Math.random() * 0.2;
 }
 // The score
 scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
 
 // Our controls.
 cursors = game.input.keyboard.createCursorKeys();
}

// create update function
function update() {
 enemy.animations.play('flying');    
 // Collide the player and the fruits with the platforms
 var hitPlatform = game.physics.arcade.collide(player, platforms);
 game.physics.arcade.collide(fruits, platforms);
 // Checks to see if the player overlaps with any of the fruits, if he does call the collectfruit function
 game.physics.arcade.overlap(player, fruits, collectfruit, null, this);
 game.physics.arcade.overlap(player, enemy, gameOver, null, this);

 // Reset the players velocity (movement)
 player.body.velocity.x = 0;
 if (cursors.left.isDown)
 {
 // Move to the left
 player.body.velocity.x = -150;
 player.animations.play('left');
 }
 else if (cursors.right.isDown)
 {
 // Move to the right
 player.body.velocity.x = 150;
 player.animations.play('right');
 }
 else
 {
 // play the idle animation if standing still
 player.animations.play('idle');
 }

 // Allow the player to jump if they are touching the ground.
 if (cursors.up.isDown && player.body.touching.down && hitPlatform)
 {
 player.body.velocity.y = -350;
 }
}

function collectfruit (player, fruit) {
 // Removes the fruit from the screen
 fruit.kill();
 // Add and update the score
 score += 10;
 scoreText.text = 'Score: ' + score;
 //subtract a fruit from the counter
 totalFruits--;
 // if counter is 0 then we win the game
 if (totalFruits <= 0){
     player.kill();
     //show winning text, gameover
     gameOverText = game.add.text(150, 300, 'YOU WIN!!! Score ' + score, { fontSize: '50px', fill: '#000'});
 }
}
// funciton to see if the player touched the bat
function gameOver (player, enemy) {
 // kill player so we can no longer control the game
 player.kill();
 // show losing text, gameover
 gameOverText = game.add.text(150, 300, 'YOU LOSE!!! Score ' + score, { fontSize: '50px', fill: '#000'});
}