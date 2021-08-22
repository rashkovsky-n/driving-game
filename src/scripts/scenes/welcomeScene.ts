//import "phaser";
export class WelcomeScene extends Phaser.Scene {

  title: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "WelcomeScene"
    });
  }

  create(): void {

    var titleText: string = "Driving Prototype";
    this.title = this.add.text(120, 200, titleText, { font: '64px Arial Bold', color: '#FBFBAC' });
    var hintText: string = "Click to start";
    this.hint = this.add.text(300, 350, hintText, { font: '24px Arial Bold', color: '#FBFBAC' });

    this.input.on('pointerdown',  (/*pointer*/) => {
      this.scene.start("GameScene");
    }, this);

  }
};
