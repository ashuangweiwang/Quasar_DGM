import RenderAbstractObj from "./RenderAbstractObj";
class RenderLayer extends RenderAbstractObj {
  constructor() {
    super();
    this.ClassName = "RenderLayer";
    this.Layer;
    this.icon = "photo";
    this.level = 3;
    this.DataChanged = 0;
  }
  Clear() {
    super.Clear();
  }
  AddTile(tile) {
    this.add(tile);
  }
  SetRenerLayer(layer) {
    this.Layer = layer;
    this.id = layer.id+"r";
    this.label = layer.name;
    //this.Layer.DataChanged = 1;
  }
}
export { RenderLayer };
