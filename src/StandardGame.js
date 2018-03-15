/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

class StandardGame {

  preload() {
    game.load.tilemap('level3', 'levels/NephiLowRes.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'levels/X11tiles-20-20.png', 20, 20)
    //    game.load.tilemap('level3', 'levels/cybernoid.json', null, Phaser.Tilemap.TILED_JSON);
    //    game.load.image('tiles', 'levels/CybernoidMap3BG_bank.png', 16, 16)
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
  }

  create() {
    this.startLevel('level3')
  }

  update() {
    if (!this.cursors) return
    const cursors = this.cursors
    const player = this.player

    // check the main character for collisions with the tilemap
    game.physics.arcade.collide(player, this.layer)

    // reset speed to 0
    player.body.velocity.x = player.body.velocity.y = 0

    if (cursors.up.isDown) // up
      player.body.velocity.y = -200
    else if (cursors.down.isDown) // down
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
      player.animations.play('turn')
      player.facing = 0
    }
  }

  startLevel(name) {

    // prepare the map
    this.map = game.add.tilemap(name)
    this.map.setCollisionByExclusion([1])
    this.map.addTilesetImage('X11tiles-20-20.png', 'tiles')

    // create a layer for collition
    this.layer = this.map.createLayer(0)
    this.layer.resizeWorld()

    // create main-character
    this.player = game.add.sprite(300, 90, 'dude')
    this.player.scale.set(0.5)
    this.player.animations.add('left', [0, 1, 2, 3], 10, true)
    this.player.animations.add('turn', [4], 20, true)
    this.player.animations.add('right', [5, 6, 7, 8], 10, true)
    // enabling physic means giving him a body
    game.physics.enable(this.player)
    //  Because both our body and our tiles are so tiny,
    //  and the body is moving pretty fast, we need to add
    //  some tile padding to the body. WHat this does
    //  in order to make collisions easier
    //  player.body.tilePadding.set(32, 32)

    // enable scrolling
    game.camera.follow(this.player)

    // cursor-keys
    this.cursors = game.input.keyboard.createCursorKeys()
  }


  stopLevel() {
    game.world.removeAll()
  }



}

