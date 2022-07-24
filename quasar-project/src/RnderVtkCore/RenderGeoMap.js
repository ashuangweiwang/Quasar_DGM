import RenderAbstractObj from "./RenderAbstractObj";
class RenderGeoMap extends RenderAbstractObj {
  constructor() {
    super();
    this.ClassName = "RenderGeoMap";
    this.Map;
    this.icon = "map";
    this.level = 2;
    this.DataChanged = 0;
  }
  AddLayer(layer) {
    this.add(layer);
  }

  SetRenderMap(map) {
    this.Map = map;
    this.id = map.id+"r";
    this.label = map.name;
    //this.Map.DataChanged = 1;
  }

  Clear() {
    super.Clear();
  }
}
export { RenderGeoMap };
