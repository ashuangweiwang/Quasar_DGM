<template>
  <!-- <q-tree
    :nodes="data"
    node-key="id"
    selected-color="primary"
    tick-strategy="strict"
    v-model:invisible="drawer"
    v-model:selected="selected"
    v-model:ticked="ticked"
    v-model:expanded="expanded"
    dense
    class="bg-grey-1"
    default-expand-all
  >
  </q-tree>
  <q-tree
    :nodes="simple"
    dense
    node-key="label"
    v-model:expanded="expanded"
  ></q-tree>
  <q-tree
    :nodes="renderSceneRoot"
    dense
    node-key="id"
    v-model:expanded="expanded"
  ></q-tree> -->
  <q-tree
    ref="tree"
    :nodes="root"
    node-key="id"
    selected-color="primary"
    tick-strategy="strict"
    v-model:invisible="drawer"
    v-model:selected="selected"
    v-model:ticked="ticked"
    v-model:expanded="expanded"
    dense
    class="bg-grey-1"
    default-expand-all
  >
  </q-tree>
  <q-tree
    ref="pTree"
    :nodes="pixiViewRoot"
    node-key="id"
    selected-color="primary"
    tick-strategy="leaf"
    v-model:selected="pSelected"
    v-model:ticked="pTreeTicked"
    v-model:expanded="expanded"
    default-expand-all
    dense
    class="bg-grey-2"
    accordion
    @update:ticked="onPTreeTick"
    @update:selected="onPTreeSelect"
  >
  </q-tree>
  <q-tree
    ref="sTree"
    :nodes="sectionViewRoot"
    node-key="id"
    selected-color="primary"
    tick-strategy="leaf"
    v-model:selected="sSelected"
    v-model:ticked="sTreeTicked"
    v-model:expanded="expanded"
    default-expand-all
    dense
    accordion
    @update:ticked="onSTreeTick"
    @update:selected="onSTreeSelect"
  >
  </q-tree>
  <q-tree
    ref="rTree"
    :nodes="renderSceneRoot"
    node-key="id"
    selected-color="primary"
    tick-strategy="leaf"
    v-model:selected="tDSelected"
    v-model:ticked="tDTicked"
    v-model:expanded="expanded"
    default-expand-all
    dense
    @update:ticked="onRTreeTick"
  >
  </q-tree>
</template>
<script>
import { defineComponent, ref, render, watchEffect, toRaw } from "vue";
import { useWorkSpaceStore } from "stores/workSpace";
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "TreeNodepage",
  setup() {
    var tree = ref();
    var ticked = ref([]);
    const $workSpace = useWorkSpaceStore();
    // 确保解构后的state具有响应式，要使用storeToRefs方法
    const { gWorkSpace, renderWorkSpaceArray, getWkArray } =
      storeToRefs($workSpace);
    const data = computed(() => $workSpace.gWorkSpace || []);
    const data1 = computed(() => $workSpace.renderWorkSpaceArray || []);

    var root = ref([
      {
        id: "root",
        label: "WorkSpaces",
        children: [],
        icon: "home",
      },
    ]);

    var renderSceneRoot = ref([
      {
        id: "renderSceneRoot",
        label: "3D View",
        children: [],
        icon: "spa",
      },
    ]);

    var expanded = ref(["root"]);
    function initWKTree(val) {
      // 序列化后可以取值
      var arr = toRaw(val);
      if (arr != undefined) {
        root.value[0].children.push(arr);
      }
    }

    function init3DViewTree(selectedWk) {
      var curWk = toRaw(selectedWk);
      console.log(curWk);
      if (curWk != undefined) {
        renderSceneRoot.value[0].children.push(curWk);
      }
    }

    //var selectedWK = tree.value.getNodeByKey(ticked.value[0]);
    //console.log("******", selectedWK);
    //console.log(ticked.value);
    onMounted(() => {
      console.log(tree.value);
      console.log(tree.value);
      var tickedWK = tree.value.getNodeByKey(ticked.value[0]);
      watchEffect(() =>
        $workSpace.getTickedWK(tree.value.getNodeByKey(ticked.value[0]))
      ); //已取得选取节点的wk（ref响应式数据还需要额外监听吗？）
    });

    //watchEffect(() => console.log(console.log(tree.value)));
    watchEffect(() => console.log(toRaw(renderWorkSpaceArray.value)));
    watchEffect(() => init3DViewTree(renderWorkSpaceArray.value)); //监听里面第一次值为初始值，undefined，
    watchEffect(() => initWKTree(gWorkSpace.value));

    return {
      tree,
      data,
      data1,
      $workSpace,
      //splitterModel: ref(50),
      //selected: ref('Food'),
      selected: ref([]),
      pSelected: ref([]),
      sSelected: ref([]),
      ticked,
      tDSelected: ref([]),
      tDTicked: ref([]),
      //expanded: ref(["root"]),
      expanded,
      workspaceArray: ref([]),
      //--------------------------------------------------------------------------------
      //wsw  测试RenderTree
      //--------------------------------------------------------------------------------
      root,
      pixiViewRoot: [
        {
          id: "pixiViewRoot",
          label: "2D Main View",
          children: [],
          icon: "spa",
        },
      ],
      //剖面视图
      sectionViewRoot: [
        {
          id: "sectionViewRoot",
          label: "2D Section View",
          children: [],
          icon: "spa",
        },
      ],
      pixiMapView: ref([]),
      renderSceneRoot,
      //记录二维视图树勾选
      pTreeTicked: ref([]),
      sTreeTicked: ref([]),
      RTreeTick: ref([]),
      //记录二维视图树的上次勾选
      recentPTreeTicked: [],
      recentSTreeTicked: [],
      recentRTreeTicked: [],
    };
  },
});
</script>
