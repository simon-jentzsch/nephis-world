/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />


let counter = 1
class Enemy {
  constructor(x, y, name, level) {
    this.id = counter++
    this.health = 100
    this.level = level
    this.sprite = game.add.sprite(x, y, name)
    this.sprite.scale.set(0.7)
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true)
    this.sprite.animations.add('down', [4], 20, true)
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true)
    this.sprite.animations.add('up', [9], 10, true)
    this.healthLabel = game.add.text(0,0, '', { font: "12px Arial", fill: "#ff0044", align: "center" });

    game.physics.enable(this.sprite)
  }


  newDirection(oldX = 0, oldY = 0) {

    const left = () => {
      this.sprite.animations.play('left')
      return {
        x: -50,
        y: 0
      }
    }

    const right = () => {
      this.sprite.animations.play('right')
      return {
        x: 50,
        y: 0
      }
    }

    const up = () => {
      this.sprite.animations.play('up')
      return {
        x: 0,
        y: -50
      }
    }

    const down = () => {
      this.sprite.animations.play('down')
      return {
        x: 0,
        y: 50
      }
    }


    switch (parseInt(Math.random() * 5)) {
      case 0:
        this.sprite.animations.play('down')
        return {
          x: 0,
          y: 0
        }
      case 1: //  left
        if (oldX < 0)
          return right()
        return left()
      case 2: //  up
        if (oldY < 0)
          return down()
        return up()
      case 3: //  right
        if (oldX > 0)
          return left()
        return right()
      case 4: //  down
        if (oldY > 0)
          return up()
        return down()
    }

  }



  update() {
    const body = this.sprite.body
    this.healthLabel.x = this.sprite.x
    this.healthLabel.y = this.sprite.y -8
    this.healthLabel.text = this.health+'%'

    const distance = this.getDistanceToPlayer()
    if (distance < 30) {
      Object.assign(body.velocity, {
        x: 0,
        y: 0
      })
      this.sprite.animations.play('down')
      return
    }



    // check the main character for collisions with the tilemap
    game.physics.arcade.collide(this.sprite, this.level.layer, () => {
      Object.assign(body.velocity, this.newDirection(body.velocity.x, body.velocity.y))
    })





    if (Math.random() < 0.05)
      Object.assign(body.velocity, this.newDirection())



  }

  getDistanceToPlayer() {
    return Math.sqrt(p2(this.sprite.x - this.level.player.sprite.x) + p2(this.sprite.y - this.level.player.sprite.y))

  }

  kill() {
    const index = this.level.enemies.indexOf(this)
    if (index >= 0) {
      this.level.enemies.splice(index, 1)
      this.sprite.destroy()
      this.healthLabel.destroy()
    }
  }

  damage(strength) {

    this.health-=strength
    console.log('got hit ',this.health)
    if (this.health<0)
       this.kill()
  }
 



}



const p2 = a => a * a