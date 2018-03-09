
/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
// current context
const context = {
  update: null
}

// create game
const game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
  preload,
  create: () => startLevel('level3'),
  update: () => context.update && context.update()
})

function preload() {
  game.load.tilemap('level3', 'levels/cybernoid.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'levels/CybernoidMap3BG_bank.png', 16, 16)
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
}

function startLevel(name) {

  // prepare the map
  const map = game.add.tilemap(name)
  map.setCollisionByExclusion([7, 32, 35, 36, 47])
  map.addTilesetImage('CybernoidMap3BG_bank.png', 'tiles')

  // create a layer for collition
  const layer = map.createLayer(0)
  layer.resizeWorld()

  // create main-character
  const player = game.add.sprite(300, 90, 'dude')
  player.scale.set(0.7)
  player.animations.add('left', [0, 1, 2, 3], 10, true)
  player.animations.add('turn', [4], 20, true)
  player.animations.add('right', [5, 6, 7, 8], 10, true)
  // enabling physic means giving him a body
  game.physics.enable(player)
  //  Because both our body and our tiles are so tiny,
  //  and the body is moving pretty fast, we need to add
  //  some tile padding to the body. WHat this does
  //  in order to make collisions easier
  //  player.body.tilePadding.set(32, 32)

  // enable scrolling
  game.camera.follow(player)

  // cursor-keys
  const cursors = game.input.keyboard.createCursorKeys()

  // updater for each frame
  context.update = () => {

    // check the main character for collisions with the tilemap
    game.physics.arcade.collide(player, layer)

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
}


function stopLevel() {
  game.world.removeAll()
}

