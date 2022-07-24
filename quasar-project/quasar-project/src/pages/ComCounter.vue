<template>
  <div>
    <div ref="vtkContainer" />
  </div>
</template>
<script>
import { ref, onMounted, watchEffect } from "vue";
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
      var testwk = jsonio.GetWorkspace("FW_ProFile");
      var curwk = new RenderWorkSpace(testwk);
      var wkManager = new RenderWorkSpaceManager();
      wkManager.AddObject(curwk);
      console.log(wkManager.children);
      //$workSpace.changeRenderWorkSpace(wkManager.children);
      $workSpace.changeRenderWorkSpace(curwk);
      /*  watchEffect(() => setWK());
      function setWK() {
        if (selcetWorkSpace.value != null) {
          $workSpace.changeRenderWorkSpace(selcetWorkSpace.value);
        }
      } */

      var testwindow = new RenderWindow3D(wkManager);
      const elem = vtkContainer.value;
      testwindow.Init(elem);
    });

    return {
      vtkContainer,
      ref,
    };
  },
};
</script>
<style></style>
