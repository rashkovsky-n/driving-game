export default class Car extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
      super(scene, x, y, 'car')
      scene.add.existing(this)
      scene.physics.add.existing(this)

      this.setDisplaySize(45, 75);
      this.setVelocity(0, 200);
    }

    crash() {
        this.disableBody(true);
        this.setTint(0xff0000);
        this.setVelocity(0, 0);
    }
  }
  