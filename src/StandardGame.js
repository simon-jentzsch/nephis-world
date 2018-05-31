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
    this.player.update()

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

    this.player = new Player(300, 90, this, 'dude')

    // enable scrolling
    game.camera.follow(this.player.sprite)

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

