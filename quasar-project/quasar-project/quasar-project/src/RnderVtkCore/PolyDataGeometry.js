import "@kitware/vtk.js/favicon";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkPolyData from "@kitware/vtk.js/Common/DataModel/PolyData";
import DGMObject from "../core/DGMObject";
class PolyDataGeometry extends DGMObject {
  constructor() {
    super();
    this.ClassName = "PolyDataGeometry";
    this.FeatureID;
    this.GeoType;
    this.polyData; //
    this.outLinePolyData; //凸包
  }

  Clear() {
    this.polyData; //清空
  }
}
export default PolyDataGeometry;
