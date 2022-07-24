import { defineStore } from "pinia";
import { ref, toRaw } from "vue";

export const useWorkSpaceStore = defineStore("workSpace", {
  state: () => {
    return {
      gWorkSpace: undefined,
      renderWorkSpaceArray: undefined,
      selcetWorkSpace: undefined,
      selcetGeometryArray: [],
      selcetConvex: undefined,
      getConvex: undefined,
    };
  },
  actions: {
    changeGWorkSpace(val) {
      //this.workSapceArray = val;
      this.gWorkSpace = val;
    },
    changeRenderWorkSpace(val) {
      //this.workSapceArray = val;
      this.renderWorkSpaceArray = val;
    },
    getTickedWK(val) {
      this.selcetWorkSpace = val;
    },
    getSelcetConvex(val) {
      this.selcetConvex = val;
      //console.log("1213213", toRaw(this.selcetConvex));
    },
    getConvexFromServer(val) {
      this.getConvex = val;
      //console.log("1213213", toRaw(this.selcetConvex));
    },
    getConvexFromServer01() {
      this.getConvex = undefined;
      console.log("1213213", toRaw(this.selcetConvex));
    },
  },
  getters: {
    getWkArray(state) {
      // autocompletion ✨
      return this.gWorkSpace;
    },
  },
});
