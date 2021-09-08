//import "phaser";
export class ScoreScene extends Phaser.Scene {
  
  score: number;
  result: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;

  canvas: HTMLCanvasElement;

  constructor() {
    super({
      key: "ScoreScene"
    });
  }

  preload(): void {
    this.canvas = this.sys.game.canvas;
  }

  init(params: any): void {
    this.score = params.carsWrecked;
  }

  create(): void {
    var resultText: string = 'Your score is ' + this.score + '!';
    this.result = this.add.text(this.cameras.main.width*1/3, this.cameras.main.height*1/4, resultText, {
       font: '48px Arial Bold', color: '#FBFBAC' }
       );

    var hintText: string = "Click to restart";
    this.hint = this.add.text(this.cameras.main.width*1/3, this.cameras.main.height*2/4, hintText, {
      font: '24px Arial Bold', color: '#FBFBAC' }
      );

    this.input.on('pointerdown',  (/*pointer*/) => {
      this.scene.start("WelcomeScene");
    }, this);
  }
};
