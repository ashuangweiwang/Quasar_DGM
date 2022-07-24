import RenderAbstractObj from "./RenderAbstractObj";
import "@kitware/vtk.js/favicon";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkPolyData from "@kitware/vtk.js/Common/DataModel/PolyData";
import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import vtkCubeAxesActor from "@kitware/vtk.js/Rendering/Core/CubeAxesActor";
class RnederGeometry extends RenderAbstractObj {
  constructor(polydata, visualStyle, renderer) {
    super();
    this.ClassName = "RnederGeometry";
    this.polydata = polydata;
    this.mapper = vtkMapper.newInstance();
    this.actor = vtkActor.newInstance();
    this.renderer = renderer;
    this.property = visualStyle;
    this.outLineActor;
    this.icon = "photo";
    this.level = 5;

    this.geometry = this.polydata.points;
    this.index = this.polydata.cell;
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
  RenderPoints() {
    const jSize = 10;
    const iSize = 10;

    //1
    const polydata = vtk.Common.DataModel.vtkPolyData.newInstance();
    polydata.getPoints().setData(new Float32Array(0, 0, 0, 1, 1, 1), 3);

    //2  get点 设置点数据长度 get点具体值
    const points = polydata.getPoints();
    points.setNumberOfPoints(iSize * jSize, 3);
    const pointValues = points.getData();

    //3 绑定索引到polydata
    const verts = vtk.Common.Core.vtkCellArray.newInstance({
      //size: 4 * (iSize - 1) * (jSize - 1),
      size: (4 * this.geometry.length) / 3,
    });
    //polydata.setVerts(verts);
    polydata.setVerts(verts);
    const vertsValues = verts.getData();

    //4 赋值点数据和索引数据
    let cellOffset = 0;
    for (let i = 0; i < this.geometry.length / 3; i++) {
      const offsetIdx = i;
      const offsetPt = 3 * offsetIdx;

      // Fill points coordinates
      pointValues[offsetPt + 0] = this.geometry[0 + 3 * i]; //x
      pointValues[offsetPt + 1] = this.geometry[1 + 3 * i]; //y
      pointValues[offsetPt + 2] = this.geometry[2 + 3 * i]; //z
    }

    for (let i = 0; i < 6; i++) {
      vertsValues[cellOffset++] = 2;
      vertsValues[cellOffset++] = i; //第一个
    }
    this.mapper.setInputData(polydata); // polyData 为需要显示的数据
    this.actor.setMapper(this.mapper);
    this.actor.getProperty().setPointSize(this.property.Size);
    this.actor.getProperty().setColor(this.property.Color);
    this.renderer.addActor(this.actor);
    this.renderer.resetCamera();
  }
  RenderLines() {
    const jSize = 10;
    const iSize = 10;
    //1
    const polydata = vtk.Common.DataModel.vtkPolyData.newInstance();
    polydata.getPoints().setData(new Float32Array(0, 0, 0, 1, 1, 1), 3);

    //2  get点 设置点数据长度 get点具体值
    const points = polydata.getPoints();
    points.setNumberOfPoints(iSize * jSize, 3);
    const pointValues = points.getData();

    //3 绑定索引到polydata
    const verts = vtk.Common.Core.vtkCellArray.newInstance({
      //size: 4 * (iSize - 1) * (jSize - 1),
      size: (4 * this.geometry.length) / 3,
    });
    //polydata.setVerts(verts);
    polydata.setLines(verts);
    const vertsValues = verts.getData();

    //4 赋值点数据和索引数据
    let cellOffset = 0;
    for (let i = 0; i < this.geometry.length / 3; i++) {
      const offsetIdx = i;
      const offsetPt = 3 * offsetIdx;

      // Fill points coordinates
      pointValues[offsetPt + 0] = this.geometry[0 + 3 * i]; //x
      pointValues[offsetPt + 1] = this.geometry[1 + 3 * i]; //y
      pointValues[offsetPt + 2] = this.geometry[2 + 3 * i]; //z
    }

    if (this.index == undefined) {
      for (let i = 0; i < this.geometry.length / 3 - 1; i++) {
        vertsValues[cellOffset++] = 2;
        vertsValues[cellOffset++] = i; //第一个
        vertsValues[cellOffset++] = i + 1; //第一个
      }
    } else {
      for (let i = 0; i < this.index.length / 2; i++) {
        vertsValues[cellOffset++] = 2;
        vertsValues[cellOffset++] = this.index[2 * i]; //第一个
        vertsValues[cellOffset++] = this.index[2 * i + 1]; //第一个
      }
    }

    this.mapper.setInputData(polydata); // polyData 为需要显示的数据
    this.actor.setMapper(this.mapper);

    console.log(this.property);

    this.actor.getProperty().setLineWidth(this.property.Size);
    var RGB = this.getColor(this.property.Color);
    this.actor.getProperty().setColor(RGB[0], RGB[1], RGB[2]);

    this.renderer.addActor(this.actor);
    this.renderer.resetCamera();
  }
  RenderTins() {
    const jSize = 100;
    const iSize = 100;

    //1
    const polydata = vtk.Common.DataModel.vtkPolyData.newInstance();
    polydata.getPoints().setData(new Float32Array(0, 0, 0, 1, 1, 1), 3);

    //2  get点 设置点数据长度 get点具体值
    const points = polydata.getPoints();
    points.setNumberOfPoints(iSize * jSize, 3);
    const pointValues = points.getData();

    //3 绑定索引到polydata
    const polys = vtk.Common.Core.vtkCellArray.newInstance({
      //size: 4 * (iSize - 1) * (jSize - 1),
      size: (4 * this.geometry.length) / 3,
    });
    //polydata.setVerts(verts);
    polydata.setPolys(polys);
    const polysValues = polys.getData();

    //4 赋值点数据和索引数据
    let cellOffset = 0;
    for (let i = 0; i < this.geometry.length / 3; i++) {
      const offsetIdx = i;
      const offsetPt = 3 * offsetIdx;

      // Fill points coordinates
      pointValues[offsetPt + 0] = this.geometry[0 + 3 * i]; //x
      pointValues[offsetPt + 1] = this.geometry[1 + 3 * i]; //y
      pointValues[offsetPt + 2] = this.geometry[2 + 3 * i]; //z
    }

    for (let i = 0; i < this.index.length / 3; i++) {
      polysValues[cellOffset++] = 3;
      polysValues[cellOffset++] = this.index[0 + 3 * i]; //第一个
      polysValues[cellOffset++] = this.index[1 + 3 * i]; //第二个
      polysValues[cellOffset++] = this.index[2 + 3 * i]; //第三个
    }
    this.mapper.setInputData(polydata); // polyData 为需要显示的数据
    this.actor.setMapper(this.mapper);

    var RGB = this.getColor(this.property.Color);
    this.actor.getProperty().setColor(RGB[0], RGB[1], RGB[2]);

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
  getColor(number) {
    const red = (number >> 16) & 0xff;
    const green = (number >> 8) & 0xff;
    const blue = number & 0xff;
    var rgb = [red, green, blue];
    return rgb;
    //return `${red}, ${green}, ${blue}`;
  }
}
export default RnederGeometry;
