import { RenderGeoMap } from "./RenderGeoMap.js";
import { RenderLayer } from "./RenderLayer.js";
import { RenderTile } from "./RenderTile.js";
import { PolyDataGeometry } from "./PolyDataGeometry.js";
import RenderAbstractObj from "./RenderAbstractObj.js";
import RenderGeometry from "./RenderGeometry.js";
import RenderActor from "./RenderActor.js";

class RenderWorkSpace extends RenderAbstractObj {
  constructor(curwk) {
    super();
    //用于树组织
    this.label = curwk.Name;
    this.icon = "workspaces";
    this.level = 1;
    this.id = curwk.id + "r";
    this.WorkSpace = curwk;
  }
  GetFeatureFromID(layer, fid) {
    for (var fc = 0; fc < layer.FeatureCollection.Features.length; fc++) {
      if (layer.FeatureCollection.Features[fc].id == fid) {
        return layer.FeatureCollection.Features[fc].VisualStyle;
      }
    }
  }
  //动态添加删除树节点，
  SetupScene(renderer) {
    //wsw 解析wk的各个层级
    //map
    for (var i = 0; i < this.WorkSpace.ObjectArray.length; i++) {
      var oGeoMap = new RenderGeoMap();
      this.AddObject(oGeoMap);
      oGeoMap.SetRenderMap(this.WorkSpace.ObjectArray[i]);
      //layer
      for (var j = 0; j < oGeoMap.Map.ObjectArray.length; j++) {
        var oLayer = new RenderLayer();
        oGeoMap.AddObject(oLayer);
        oLayer.SetRenerLayer(oGeoMap.Map.ObjectArray[j]);
        //tile
        for (var k = 0; k < oLayer.Layer.ObjectArray.length; k++) {
          var oTile = new RenderTile();
          oLayer.AddObject(oTile);
          oTile.SetRenderTile(oLayer.Layer.ObjectArray[k]);

          //Geometry  此处取Tile里面的PolyDataGeometry
          /*    if (oTile.Tile.BufferGeometry == undefined) continue; //
          for (var l = 0; l < oTile.Tile.BufferGeometry.length; l++) {
            var oGeometry = oTile.Tile.BufferGeometry[l];
 */
          if (oTile.Tile.PolyDataGeometry == undefined) continue;
          for (var l = 0; l < oTile.Tile.PolyDataGeometry.length; l++) {
            var oGeometry = oTile.Tile.PolyDataGeometry[l];

            var ofeature = this.GetFeatureFromID(
              oLayer.Layer,
              oGeometry.FeatureID
            );

            var renderGeometry = new RenderGeometry(
              oGeometry,
              ofeature,
              renderer
            );
            oTile.AddObject(renderGeometry);
            renderGeometry.SetRenderGeometry(oGeometry);

            if (oGeometry.GeoType == "Line") {
            } else if (oGeometry.GeoType == "Polygon") {
            } else if (oGeometry.GeoType == "Point") {
            } else if (oGeometry.GeoType == "Tin") {
              //test

              renderGeometry.RenderTest();
              //renderGeometry.Render();
            }
          }
        }
      }
    }

    console.log("RenderWorkSpace", this);
  }
}

export default RenderWorkSpace;
