export default class PlayerCar extends Phaser.Physics.Arcade.Sprite {

    PLAYER_VELOCITY = 200;

    constructor(scene, x, y) {
      super(scene, x, y, 'player-car')
      scene.add.existing(this)
      scene.physics.add.existing(this)
  
      this.setCollideWorldBounds(true);
    }

    stopCar() {
        this.setVelocity(0);
    }

    moveLeft() {
        this.setVelocityX(-this.PLAYER_VELOCITY);
    }
    moveRight() {
        this.setVelocityX(this.PLAYER_VELOCITY);
    }
    moveUp() {
        this.setVelocityY(-this.PLAYER_VELOCITY);
    }
    moveDown() {
        this.setVelocityY(this.PLAYER_VELOCITY);
    }
  }
  