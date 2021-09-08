export default class Border {//extends Phaser.Physics.Arcade.StaticGroup {

    //scene: Phaser.Scene;
    private _border: Phaser.Physics.Arcade.StaticGroup;

    constructor(scene : Phaser.Scene, frames: number, isVisible: boolean) {
      //super(scene.physics.world, scene, undefined, undefined);
      //this.scene = scene;

      this._border = scene.physics.add.staticGroup({
        key: "side-border",
        frameQuantity: frames,
        visible: isVisible
      });
    }

    placeOnLine(x1:number, y1:number, x2:number, y2:number): Border {
      Phaser.Actions.PlaceOnLine(
        this._border.getChildren(), 
        new Phaser.Geom.Line(x1, y1, x2, y2)
      );
      return this;
    }

    refresh(): Border {
      this._border.refresh();
      return this;
    }


    public get border(): Phaser.Physics.Arcade.StaticGroup {
      return this._border;
    }

  }
  