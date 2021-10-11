//this is the line you would add to the update function to add collisions
    //game.physics.arcade.overlap(player, crystal, getItem, null, this);

//create score board
    //scoreText = game.add.text(300, 10, '', {fontSize: '32px', fill: '#e75480'});
        //probably want to play around with the score board placement 
function getItem(player, items){
    items.kill();
    score += 1;
    scoreText.text = "Your Score: " + score;
    console.log(score)
}
