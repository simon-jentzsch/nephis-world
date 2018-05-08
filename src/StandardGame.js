/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

class StandardGame {

  preload() {
    game.load.tilemap('level3', 'levels/TestMap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'levels/TestMapTileset.png', 20, 20)
    //    game.load.tilemap('level3', 'levels/cybernoid.json', null, Phaser.Tilemap.TILED_JSON);
    //    game.load.image('tiles', 'levels/CybernoidMap3BG_bank.png', 16, 16)
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
    game.load.spritesheet('enemy', 'assets/enemy.png', 32, 48)
  }

  create() {
    this.startLevel('level3')
  }

  update() {
    if (!this.cursors) return
    const cursors = this.cursors
    const player = this.player
    const lmovement = false
    const rmovement = false

    // check the main character for collisions with the tilemap
    game.physics.arcade.collide(player, this.layer)

    // reset speed to 0
    player.body.velocity.x = player.body.velocity.y = 0

    //old player movement
    /*if (cursors.up.isDown) { // up
      player.body.velocity.y = -200
      player.animations.play('up')

    } else if (cursors.down.isDown) // down
      player.body.velocity.y = 200


    if (cursors.left.isDown) { // left
      if (player.facing != -1) {
        player.facing = -1
        player.animations.play('left')
      }
      player.body.velocity.x = -200
    } else if (cursors.right.isDown) { // right
      if (player.facing != 1) {
        player.facing = 1
        player.animations.play('right')
      }
      player.body.velocity.x = 200
    } else if (player.facing) { // turn back
      player.animations.play('down')
      player.facing = 0
    }
*/

//new player movement
if (cursors.up.isDown && !cursors.down.isDown) { 
  player.body.velocity.y = -200 
  player.animations.play('up') 
} else if (cursors.down.isDown && !cursors.up.isDown) { 
  player.body.velocity.y = 200 
  player.animations.play('down') 
} 

if (cursors.left.isDown && !cursors.right.isDown) { 
  player.body.velocity.x = -200 
  player.animations.play('left')
}  else if (cursors.right.isDown && !cursors.left.isDown) { 
  player.body.velocity.x = 200 
  player.animations.play('right')  
} 

if (cursors.right.isDown && cursors.left.isDown) { 
  player.body.velocity.x = player.body.velocity.y = 0 
  player.animations.play('down')  
} else if (cursors.up.isDown && cursors.down.isDown) { 
  player.body.velocity.x = player.body.velocity.y = 0 
  player.animations.play('down')  
}




    // update enemies
    if (this.enemies)
      this.enemies.forEach(_ => _.update())
  }

  startLevel(name) {

    // prepare the map
    this.map = game.add.tilemap(name)
    this.map.setCollisionByExclusion([1])
    this.map.addTilesetImage('TestMapTileset.png', 'tiles')

    // create a layer for collition
    this.layer = this.map.createLayer(0)
    this.layer.resizeWorld()

    // create main-character
    this.player = game.add.sprite(300, 90, 'dude')
    this.player.scale.set(0.7)
    this.player.animations.add('left', [1, 2, 3, 0], 15, false)
    this.player.animations.add('down', [4], 20, false)
    this.player.animations.add('right', [6, 7, 8, 5], 15, false)
    this.player.animations.add('up', [9], 10, false)
    // enabling physic means giving him a body
    game.physics.enable(this.player)
    //  Because both our body and our tiles are so tiny,
    //  and the body is moving pretty fast, we need to add
    //  some tile padding to the body. WHat this does
    //  in order to make collisions easier
    //player.body.tilePadding.set(32, 32)

    // enable scrolling
    game.camera.follow(this.player)

    // cursor-keys
    this.cursors = game.input.keyboard.createCursorKeys()


    this.enemies = [
      new Enemy(500, 30, 'enemy', this),
      new Enemy(100, 300, 'enemy', this),
      new Enemy(400, 250, 'enemy', this)
    ]
  }


  stopLevel() {
    game.world.removeAll()
  }



}

