class RenderWorkSpaceManager {
  constructor() {
    this.children = [];
    this.ClassName = "RenderWorkSpaceManager";
  }

  AddObject(obj) {
    this.children.push(obj);
  }
  Clear() {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].Clear();
    }
    this.children.length = 0;
    super.Clear();
  }
}
export default RenderWorkSpaceManager;
