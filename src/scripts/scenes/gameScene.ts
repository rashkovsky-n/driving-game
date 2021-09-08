import PlayerCar from "../objects/playerCar";
import Car from "../objects/car";
import ScoreText from "../objects/scoreText";
import Border from "../objects/static/border";

//import "phaser";
export class GameScene extends Phaser.Scene {
  
  delta: number;
  lastCarTime: number;

  scoreText: ScoreText;
  carsWrecked: number;

  playerCar: PlayerCar;

  sideBorderLeft: Border;
  sideBorderRight: Border;
  invisibleBorderBottom: Border;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  canvas: HTMLCanvasElement;

  constructor() {
    super({
      key: "GameScene"
    });  
  }
  init(/*params: any*/): void {
    this.delta = 1000;
    this.lastCarTime = 0;
    this.carsWrecked = 0;
  }

  preload(): void {
    this.canvas = this.sys.game.canvas;
  }

  create(): void {
    this.carsWrecked = 0;
    this.scoreText = new ScoreText(this);

    this.sideBorderLeft = new Border(this, 20, true).placeOnLine(
      20, 
      this.cameras.main.height - 20, 
      20, 
      0).refresh();

    this.sideBorderRight = new Border(this, 20, true).placeOnLine(
      this.cameras.main.width - 20, 
      this.cameras.main.height - 20, 
      this.cameras.main.width - 20, 
      0).refresh();

    this.invisibleBorderBottom = new Border(this, 40, false).placeOnLine(
      0, 
      this.cameras.main.height + 50, 
      this.cameras.main.width - 10, 
      this.cameras.main.height + 50).refresh();

    this.playerCar = new PlayerCar(this, 
      this.cameras.main.width*1/2, 
      this.cameras.main.height - 50);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time: number): void {
    this.playerCar.stopCar();

    if (this.cursors.left.isDown) {
      this.playerCar.moveLeft();
    }
    else if (this.cursors.right.isDown) {
      this.playerCar.moveRight();
    }
    if (this.cursors.up.isDown) {
      this.playerCar.moveUp();
    }
    else if (this.cursors.down.isDown) {
      this.playerCar.moveDown();
    }


    var diff: number = time - this.lastCarTime;
    if (diff > this.delta) {
      this.lastCarTime = time;
      // if (this.delta > 500) {
      //   this.delta -= 20;
      // }
      this.emitCar();
    }

    this.scoreText.update(this.carsWrecked);
  }
  
  private onCrash(car: Car): () => void {
    return  () => {
      car.crash();

      this.carsWrecked += 1;

      this.time.delayedCall(50,  (car) => {
        car.destroy();
        if(this.carsWrecked > 2) {
          var score:number = this.carsWrecked;
          this.carsWrecked = 0;
          this.scene.start("ScoreScene", { carsWrecked: score })
        }
      }, [car], this);
    }
  }

  private onBottom(car: Car): () => void {
    return  () => {
      this.time.delayedCall(50, function (car) {
        car.destroy();
      }, [car], this);
    }
  }

  private emitCar(): void {
    var car: Car;
    var x = Phaser.Math.Between(100, this.cameras.main.width - 100);
    var y = 25;
    car = new Car(this, x, y);

    this.physics.add.collider(car, this.invisibleBorderBottom.border, this.onBottom(car), undefined, this);
    this.physics.add.collider(car, this.playerCar, this.onCrash(car), undefined, this);
  }

};
