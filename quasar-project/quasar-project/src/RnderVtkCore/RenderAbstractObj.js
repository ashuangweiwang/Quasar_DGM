class RenderAbstractObj {
  constructor() {
    //this.ObjectArray = [];
    this.children = [];
    this.ClassName = "RenderAbstractObj";
    //用于树组织
    this.ClassName;
    this.label;
    this.icon;
    this.parent;
    this.level;
    this.id;
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
export default RenderAbstractObj;
