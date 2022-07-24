import RenderAbstractObj from "./RenderAbstractObj";
class RenderTile extends RenderAbstractObj {
  constructor() {
    super();
    this.ClassName = "RenderTile";
    this.Tile;
    this.icon = "photo";
    this.level = 4;
    this.DataChanged = 0;
  }
  Clear() {
    super.Clear();
  }
  SetRenderTile(tile) {
    this.Tile = tile;
    this.id = tile.id+"r";
    this.label = tile.name;
    //this.Tile.DataChanged = 1;
  }
}
export { RenderTile };
