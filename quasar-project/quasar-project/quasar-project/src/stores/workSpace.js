import { defineStore } from "pinia";
import { toRaw } from "vue";

export const useWorkSpaceStore = defineStore("workSpace", {
  state: () => {
    return {
      gWorkSpace: undefined,
      renderWorkSpaceArray: undefined,
      selcetWorkSpace: undefined,
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
      console.log(toRaw(this.renderWorkSpaceArray));
    },
    getTickedWK(val) {
      this.selcetWorkSpace = val;
      console.log(toRaw(this.selcetWorkSpace));
    },
  },
  getters: {
    getWkArray(state) {
      // autocompletion ✨
      return this.gWorkSpace;
    },
  },
});
