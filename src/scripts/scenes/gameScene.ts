import PlayerCar from "../objects/playerCar";

//import "phaser";
export class GameScene extends Phaser.Scene {
  
  delta: number;
  lastCarTime: number;

  info: Phaser.GameObjects.Text;
  carsWrecked: number;


  playerCar: PlayerCar;
  sideBorderLeft: Phaser.Physics.Arcade.StaticGroup;
  sideBorderRight: Phaser.Physics.Arcade.StaticGroup;
  invisibleBorderBottom: Phaser.Physics.Arcade.StaticGroup;

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

    //this.car = new Phaser.Geom.Rectangle (350, 50, 50, 100); 
    this.carsWrecked = 0;
  }

  preload(): void {
    this.canvas = this.sys.game.canvas;
  }

  create(): void {
    this.carsWrecked = 0;
    // this.sand = this.physics.add.staticGroup({
    //   key: 'sand',
    //   frameQuantity: 20
    // });
    // Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
    //   new Phaser.Geom.Line(20, 580, 820, 580));
    // this.sand.refresh();
    // this.info = this.add.text(10, 10, '',
    //   { font: '24px Arial Bold', color: '#FBFBAC' });
    this.sideBorderRight = this.physics.add.staticGroup({
      key: "side-border",
      frameQuantity: 20
    })
    this.sideBorderLeft = this.physics.add.staticGroup({
      key: "side-border",
      frameQuantity: 20
    })
    this.invisibleBorderBottom = this.physics.add.staticGroup({
      key: "side-border",
      frameQuantity: 40, 
      visible: false
    })

    Phaser.Actions.PlaceOnLine(
      this.sideBorderRight.getChildren(), 
      new Phaser.Geom.Line(
        this.cameras.main.width - 20, 
        this.cameras.main.height - 20, 
        this.cameras.main.width - 20, 
        0));

    Phaser.Actions.PlaceOnLine(
      this.sideBorderLeft.getChildren(), 
      new Phaser.Geom.Line(
        20, 
        this.cameras.main.height - 20, 
        20, 
        0));

    Phaser.Actions.PlaceOnLine(
      this.invisibleBorderBottom.getChildren(), 
      new Phaser.Geom.Line(
        0, 
        this.cameras.main.height + 50, 
        this.cameras.main.width - 10, 
        this.cameras.main.height + 50));

    this.sideBorderRight.refresh();
    this.sideBorderLeft.refresh();
    this.invisibleBorderBottom.refresh();

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
    // this.info.text =
    //   this.starsCaught + " caught - " +
    //   this.starsFallen + " fallen (max 3)";
  }
  
  private onCrash(car: Phaser.Physics.Arcade.Image): () => void {
    return  () => {
      car.disableBody(true);
      car.setTint(0xff0000);
      car.setVelocity(0, 0);
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

  private onBottom(car: Phaser.Physics.Arcade.Image): () => void {
    return  () => {
      // car.setTint(0xff0000);
      // this.starsFallen += 1;
      this.time.delayedCall(50, function (car) {
        car.destroy();
        // if (this.starsFallen > 2) {
        //   this.scene.start("ScoreScene",
        //     { starsCaught: this.starsCaught });
        // }
      }, [car], this);
    }
  }

  private emitCar(): void {
    var car: Phaser.Physics.Arcade.Image;
    var x = Phaser.Math.Between(100, this.cameras.main.width - 100);
    var y = 25;
    car = this.physics.add.image(x, y, "car");
    car.setDisplaySize(45, 75);
    car.setVelocity(0, 200);
    // car.setInteractive();
    // car.on('pointerdown', this.onClick(star), this);
    this.physics.add.collider(car, this.invisibleBorderBottom, this.onBottom(car), undefined, this);
    this.physics.add.collider(car, this.playerCar, this.onCrash(car), undefined, this);
  }

};
