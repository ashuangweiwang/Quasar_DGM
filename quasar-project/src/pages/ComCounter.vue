<template>
  <div>
    <div ref="vtkContainer" />
  </div>
</template>
<script>
import { ref, onMounted, watchEffect, toRaw } from "vue";
import RenderWindow3D from "src/RnderVtkCore/RenderWindow3D";
import DGMJsonIO from "src/core/DGMJsonIO";
import RenderWorkSpaceManager from "src/RnderVtkCore/RenderWorkSpaceManager";
import RenderWorkSpace from "src/RnderVtkCore/RenderWorkSpace";
import { useWorkSpaceStore } from "stores/workSpace";
import { storeToRefs } from "pinia";
export default {
  name: "ComCounter",

  setup() {
    const vtkContainer = ref(null);
    const $workSpace = useWorkSpaceStore();
    const { gWorkSpace, renderWorkSpaceArray, selcetWorkSpace, getWkArray } =
      storeToRefs($workSpace);
    onMounted(() => {
      var jsonio = new DGMJsonIO();
      // var testwk = jsonio.GetWorkspace("FW_ProFile");
      var testwk = jsonio.GetWorkspace("D_ZK2");
      var wkManager = new RenderWorkSpaceManager();
      /* var curwk = new RenderWorkSpace(testwk);
      var wkManager = new RenderWorkSpaceManager();
      wkManager.AddObject(curwk); */
      //console.log(selcetWorkSpace.value);
      //$workSpace.changeRenderWorkSpace(wkManager.children);
      //$workSpace.changeRenderWorkSpace(curwk);
      var testwindow = new RenderWindow3D();
      const elem = vtkContainer.value;
      watchEffect(() => setWK());
      function setWK() {
        if (selcetWorkSpace.value != null) {
          var curwk01 = toRaw(selcetWorkSpace.value);
          console.log("setWK", curwk01);
          if (curwk01.ClassName == "DGMWorkSpace") {
            var curwk = new RenderWorkSpace(toRaw(selcetWorkSpace.value));
            //console.log("setWK", curwk);

            console.log(curwk);
            wkManager.AddObject(curwk);
            testwindow.Init(elem, wkManager);
            $workSpace.changeRenderWorkSpace(curwk);
          }
        }
      }
    });

    return {
      vtkContainer,
      ref,
    };
  },
};
</script>
<style></style>
