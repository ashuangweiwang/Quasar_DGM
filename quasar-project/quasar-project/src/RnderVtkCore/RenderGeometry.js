import RenderAbstractObj from "./RenderAbstractObj";
import "@kitware/vtk.js/favicon";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkPolyData from "@kitware/vtk.js/Common/DataModel/PolyData";
import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import vtkCubeAxesActor from "@kitware/vtk.js/Rendering/Core/CubeAxesActor";
class RnederGeometry extends RenderAbstractObj {
  constructor(oGeometry, ofeature, renderer) {
    super();
    this.ClassName = "RnederGeometry";
    this.polydata = oGeometry.polydata; //oGemetry里只有一个polydata还是 加上outlinepolydata
    this.mapper = vtkMapper.newInstance();
    this.actor = vtkActor.newInstance();
    this.renderer = renderer;

    this.outLineActor;
    this.icon = "photo";
    this.level = 5;

    //this.actor.DEFAULT_VALUES.treeNode = this.id;
  }
  SetRenderGeometry(geometry) {
    this.id = geometry.id + "r";
    this.label = geometry.id; //后台geometry.name为空

    this.actor.setTreeNode(this.id);
    //console.log("********************", this.actor.getTreeNode());
    //this.polyDataGeometry.DataChanged = 1;
  }
  Render() {
    this.mapper.setInputData(this.polydata); // polyData 为需要显示的数据
    this.actor.setMapper(this.mapper);

    this.renderer.addActor(this.actor);
    this.renderer.resetCamera();
  }

  //测试绘制
  RenderTest() {
    const coneSource = vtkConeSource.newInstance({ height: 1.0 });
    this.mapper.setInputConnection(coneSource.getOutputPort());
    this.actor.setMapper(this.mapper);

    this.renderer.addActor(this.actor);
    this.renderer.resetCamera();
  }
  ShowAxes() {
    const cubeAxes = vtkCubeAxesActor.newInstance();
    cubeAxes.setCamera(this.renderer.getActiveCamera());
    cubeAxes.setDataBounds(this.actor.getBounds());
    this.renderer.addActor(cubeAxes);
    global.cubeAxes = cubeAxes;
  }
}
export default RnederGeometry;
