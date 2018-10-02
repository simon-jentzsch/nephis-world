/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />


class Player {
  constructor(x, y, level, name = 'dude') {
    this.level = level
    this.mode = ''

    // create main-character
    this.sprite = game.add.sprite(x, y, name)
    this.sprite.scale.set(0.7)
    this.sprite.animations.add('left', [1, 2, 3, 0], 15, false)
    this.sprite.animations.add('down', [4], 20, false)
    this.sprite.animations.add('right', [6, 7, 8, 5], 15, false)
    this.sprite.animations.add('up', [9], 10, false)
    // enabling physic means giving him a body
    game.physics.enable(this.sprite)
  }


  update() {
    if (!this.level.cursors) return
    const cursors = this.level.cursors
    const player = this.sprite

    // check the main character for collisions with the tilemap
    game.physics.arcade.collide(player, this.level.layer)

    // reset speed to 0
    player.body.velocity.x = player.body.velocity.y = 0


    this.checkActions()

    if (!this.mode) {

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
      } else if (cursors.right.isDown && !cursors.left.isDown) {
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
    }

  }

  checkActions() {
    if (game.input.keyboard.isDown(27) && this.mode) // 'esc'
      this.mode = ''

    if (game.input.keyboard.isDown(70) && this.mode === 'talk') { // 'f'
      const enemy = this.findEnemy()
      if (enemy) {
        enemy.kill()
        this.mode = ''
      }
    }


    if (game.input.keyboard.isDown(69)) { // 'e'
      if (this.mode !== 'talk') {
        const enemy = this.findEnemy()
        if (enemy) {
          this.mode = 'talk'
          console.log('Talk to ' + enemy.id)
        }

      }
    }
    if (!this.mode && game.input.keyboard.isDown(81)) { // 'q'
      console.log('hit...')
        const enemy = this.findEnemy()
        console.log(' enemy ',enemy)
        if (enemy) {
          this.mode = 'fight'
          enemy.damage(30)
          setTimeout(()=>this.mode='',500)
        }
    }

  }


  findEnemy() {
    return this.level.enemies.find(ene => ene.getDistanceToPlayer() < 30)
  }


}







const dialog = {
  'hello': [
    {
      q: 'Wer bist du denn?',
      answer: [
        {
          txt: 'Na wer wohl...',
          next: 'bye'
        },
        {
          txt: 'Hau ab!',
          next: 'bye'
        }
      ]
    },
    {
      q: 'Was klotzt du denn so?',
      answer: [
        {
          txt: 'Ich habe heute einen schlechten Tag',
          next: 'bye'
        },
        {
          txt: 'Hau ab!',
          next: 'bye'
        }
      ]
    }
  ],

  'bye': [
    
  ]



}