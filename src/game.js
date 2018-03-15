
/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

// create game
const game = new Phaser.Game(800, 600, Phaser.AUTO)
game.state.add('Standard', StandardGame, true)

