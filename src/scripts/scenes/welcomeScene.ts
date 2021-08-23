//import "phaser";
export class WelcomeScene extends Phaser.Scene {

  title: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;

  canvas: HTMLCanvasElement;

  constructor() {
    super({
      key: "WelcomeScene"
    });
  }

  preload(): void {
    this.canvas = this.sys.game.canvas;
  }

  create(): void {

    var titleText: string = "Driving Prototype";
    this.title = this.add.text(this.canvas.width*1/3, this.canvas.height*1/4, titleText, { font: '64px Arial Bold', color: '#FBFBAC' });
    var hintText: string = "Click to start";
    this.hint = this.add.text(this.canvas.width*1/3, this.canvas.height*2/4, hintText, { font: '24px Arial Bold', color: '#FBFBAC' });

    this.input.on('pointerdown',  (/*pointer*/) => {
      this.scene.start("GameScene");
    }, this);

  }
};
