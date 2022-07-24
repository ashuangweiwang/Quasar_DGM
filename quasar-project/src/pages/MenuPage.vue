<template>
  <q-header elevated>
    <q-toolbar class="col-8 bg-grey-4">
      <!--  <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      /> -->
      <q-btn-dropdown v-model="menu" flat color="bg-black-3" label="文件" dense>
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section @click="OpenFaultFile"
              >打开Fault文件</q-item-section
            >
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section @click="OpenHorizonFile"
              >打开Horizon文件</q-item-section
            >
          </q-item>
          <q-separator></q-separator>
          <q-separator></q-separator>
          <q-item clickable v-close-popup>
            <q-item-section>退出</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown
        v-model="menu"
        flat
        color="bg-grey-3"
        label="工作区"
        dense
      >
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section @click="WDialog = true">新建工作区</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section @click="DeleteWorkspce">删除工作区</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section @click="WorkspacefromServer"
              >数据库加载工作区
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section @click="ModelDialog = true">建模 </q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item clickable v-close-popup>
            <q-item-section @click="drawer = !drawer">展开节点</q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item clickable>
            <q-item-section>文件</q-item-section>
            <q-item-section side>
              <q-icon name="keyboard_arrow_right"></q-icon>
            </q-item-section>
            <!--保存json数据到本地-->
            <q-menu anchor="top end" self="top start">
              <q-list>
                <q-item v-for="n in 1" :key="n" dense clickable>
                  <q-item-section @click="SaveWorkSpaceJsonData"
                    >保存工作区json文件
                  </q-item-section>
                  <q-menu auto-close anchor="top end" self="top start">
                  </q-menu>
                </q-item>
                <q-item v-for="n in 1" :key="n" dense clickable>
                  <q-item-section @click="SaveMapJsonData"
                    >保存Mapjson文件</q-item-section
                  >
                  <q-menu auto-close anchor="top end" self="top start">
                  </q-menu>
                </q-item>
                <q-item dense clickable>
                  <q-item-section @click="inputFileJsonData"
                    >打开</q-item-section
                  >
                  <q-menu auto-close anchor="top end" self="top start">
                  </q-menu>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <!--<张建振>保存函数-->
          <q-item clickable v-close-popup>
            <q-item-section @click="Storageworkspace">保存</q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item clickable v-close-popup>
            <q-item-section>退出</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown v-model="menu" flat color="bg-grey-3" label="编辑" dense>
        <q-list>
          <q-item clickable>
            <q-item-section @click="MDialog = true">新建Map</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="LDialog = true">新建Layer</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="FDialog = true">新建Feature</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="DeleteNode"
              >删除Map/Layer/Feature</q-item-section
            >
          </q-item>
          <q-item clickable>
            <q-item-section @click="AddProjectPoint"
              >添加投影信息</q-item-section
            >
          </q-item>
          <q-item clickable>
            <q-item-section @click="AddProjectInRenderTree"
              >三维视图打开工作区</q-item-section
            >
          </q-item>
          <q-item clickable>
            <q-item-section @click="AddProjectPoint"
              >二维视图打开Map</q-item-section
            >
          </q-item>
          <q-item clickable>
            <q-item-section @click="AddProjectPoint"
              >二维保存编辑</q-item-section
            >
          </q-item>
          <q-separator></q-separator>
          <q-item clickable>
            <q-item-section>全选</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn-dropdown v-model="menu" flat color="bg-grey-3" label="算法" dense>
        <q-list>
          <q-item clickable>
            <q-item-section @click="ConvexDialogServer">凸包</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="ConvexDialogServer01">裁剪</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="ConvexDialogServer">三角网</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="ConvexDialogServer">轮廓</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-toolbar-title> </q-toolbar-title>
      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>
  <q-dialog
    v-model="workspaceServerDialog"
    persistent
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card>
      <q-bar>
        <div>数据库加载工作区</div>
        <q-space></q-space>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <!--<张建振：这里表格进行显示数据库的中workspaceList>-->
        <q-table
          title="工作区表"
          :rows="workspaceListData"
          :columns="workspaceListColumns"
          row-key="id"
          selection="single"
          v-model:selected="workspaceListselected"
          :filter="workspaceListfilter"
          hide-header
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="200"
              v-model="workspaceListfilter"
              placeholder="查找"
            >
              <template v-slot:append>
                <q-icon name="search"></q-icon>
              </template>
            </q-input>
          </template>
        </q-table>
        <div class="row justify-end">
          <!--<张建振：这里表格进行显示数据库的中workspaceList>-->
          <q-btn
            type="submit"
            :loading="submitting"
            label="确定"
            @click="sendWorkspace"
          >
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="ConvexDialog"
    persistent
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card>
      <q-bar>
        <div>凸包数据设定</div>
        <q-space></q-space>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section style="max-height: 50vh" class="scroll">
        <div class="q-pa-md q-gutter-sm">
          <!--<张建振：这里表格进行显示数据库的中workspaceList>-->
          <q-input
            standout="bg-grey-7 text-white"
            v-model="BOX0"
            label="BOX[0]"
            type="number"
            :dense="dense"
          ></q-input>
          <q-input
            standout="bg-grey-7 text-white"
            v-model="BOX1"
            label="BOX[1]"
            type="number"
            :dense="dense"
          ></q-input>
          <q-input
            standout="bg-grey-7 text-white"
            v-model="BOX2"
            label="BOX[2]"
            type="number"
            :dense="dense"
          ></q-input>
          <q-input
            standout="bg-grey-7 text-white"
            v-model="BOX3"
            label="BOX[3]"
            type="number"
            :dense="dense"
          ></q-input>
          <q-input
            standout="bg-grey-7 text-white"
            v-model="BOX4"
            label="BOX[4]"
            type="number"
            :dense="dense"
          ></q-input>
          <q-input
            standout="bg-grey-7 text-white"
            v-model="BOX5"
            label="BOX[5]"
            type="number"
            :dense="dense"
          ></q-input>
          <q-input
            standout="bg-grey-7 text-white"
            v-model="BIM0"
            label="BIM[0]"
            type="number"
            :dense="dense"
          ></q-input>
          <q-input
            standout="bg-grey-7 text-white"
            v-model="BIM1"
            label="BIM[1]"
            type="number"
            :dense="dense"
          ></q-input>
          <q-input
            standout="bg-grey-7 text-white"
            v-model="BIM2"
            label="BIM[2]"
            type="number"
            :dense="dense"
          ></q-input>
        </div>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-actions align="right">
        <q-btn
          type="submit"
          :loading="submitting"
          label="确定"
          @click="sendConvex"
        >
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="inception">
    <q-card>
      <q-card-section>
        <div class="text-h6">警告</div>
      </q-card-section>
      <q-card-section class="q-pt-none"> 选择的不是feature </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Close" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="inception01">
    <q-card>
      <q-card-section>
        <div class="text-h6">警告</div>
      </q-card-section>
      <q-card-section class="q-pt-none">未选中feature </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Close" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="inception02">
    <q-card>
      <q-card-section>
        <div class="text-h6">警告</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        对应的Geometry的数据为空
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Close" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref, computed, defineComponent, onMounted, toRaw } from "vue";
import DGMJsonIO from "../core/DGMJsonIO";
import DGMWorkSpace from "src/core/DGMWorkSpace";
import { useLayoutStore } from "../stores/layout";
import TreeNodepage from "./TreeNodepage.vue";
import { useWorkSpaceStore } from "stores/workSpace";
import { storeToRefs } from "pinia";
export default {
  components: {},
  setup() {
    const tree = ref();
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const workspaceServerDialog = ref(false);
    const workspaceListData = ref([]);
    const workspaceListselected = ref([]);
    const nodePage = ref();
    var workspaceArray = ref([]);
    var dgmJsonIO = new DGMJsonIO();
    var gWorkspace = new DGMWorkSpace();
    var root, expanded;

    //zjz
    const ConvexDialog = ref(false);
    const BIM0 = ref(0);
    const BIM1 = ref(0);
    const BIM2 = ref(0);
    const BOX0 = ref(0);
    const BOX1 = ref(0);
    const BOX2 = ref(0);
    const BOX3 = ref(0);
    const BOX4 = ref(0);
    const BOX5 = ref(0);
    const inception = ref(false);
    const inception01 = ref(false);
    const inception02 = ref(false);
    const $workSpace = useWorkSpaceStore();
    const {
      gWorkSpace,
      renderWorkSpaceArray,
      selcetWorkSpace,
      selcetConvex,
      getWkArray,
    } = storeToRefs($workSpace);
    const data = computed(() => $workSpace.selcetConvex || []);
    onMounted(() => {});
    function WorkspacefromServer() {
      workspaceServerDialog.value = true; //this.workspaceListData = GetWorkspaceList1(); //var dgmJsonIO = new DGMJsonIO(); //console.log("前", oData)
      workspaceListData.value = dgmJsonIO.GetWorkspaceList();
      //console.log("WorkspacefromServer", workspaceListData);
    }
    function sendWorkspace() {
      var workspaceListId;
      var workspaceListName;
      if (workspaceListselected.value.length != 0) {
        workspaceListId = workspaceListselected.value[0].id;
        workspaceListName = workspaceListselected.value[0].name;
        workspaceServerDialog.value = false;
        gWorkspace = dgmJsonIO.GetWorkspace(workspaceListId);
        console.log("gWorkspace", gWorkspace);
        $workSpace.changeGWorkSpace(gWorkspace);
        workspaceArray.value.push(gWorkspace);
        //$workSpace.changeGWorkSpace(workspaceArray.value);
        console.log("用户勾选的wkarray", workspaceArray.value);
        AddWorkSpace(gWorkspace);
        refresh(root);
        return 1;
      }
      return 0;
    }
    function AddWorkSpace(wk) {
      var oNode = wk; // this.workspaceArray[i];
      oNode.label = oNode.Name;
      for (var j = 0; j < oNode.ObjectArray.length; j++) {
        var ooNode = oNode.ObjectArray[j];
        ooNode.label = ooNode.name;
        oNode.children.push(ooNode); //layer
        for (var k = 0; k < ooNode.ObjectArray.length; k++) {
          var oooNode = ooNode.ObjectArray[k];
          oooNode.label = oooNode.name;
          var FeatureCollectionNode = oooNode.FeatureCollection;
          FeatureCollectionNode.id = oooNode.id + "Features";
          FeatureCollectionNode.label = "FeatureCollection";
          var tiles = { id: "Tiles", label: "Tiles" };
          oooNode.children = [tiles, FeatureCollectionNode];
          ooNode.children.push(oooNode); //目前接受的数据中若不存在featurecollection则报错
          for (
            var fc = 0;
            fc < oooNode.FeatureCollection.Features.length;
            fc++
          ) {
            var feature = oooNode.FeatureCollection.Features[fc];
            feature.label = feature.Name;
            oooNode.children[1].children.push(feature);
          }
        }
      }
    }
    function refresh(node) {
      //expanded.push(node.id); //this.expanded.pop(nodes);
    }
    function addData() {
      const res = dgmJsonIO.GetWorkspaceList();
      console.log("res", res);
    }
    function AddProjectInRenderTree() {
      console.log("openWkInRenderTree", $workSpace.selcetWorkSpace);
    }
    function ConvexDialogServer() {
      ConvexDialog.value = true; //this.workspaceListData = GetWorkspaceList1(); //var dgmJsonIO = new DGMJsonIO(); //console.log("前", oData)
      //workspaceListData.value = dgmJsonIO.GetWorkspaceList();
      //console.log("WorkspacefromServer", workspaceListData);
    }
    function sendConvex() {
      var Convex = {};
      var box = [];
      box.push(BOX0.value);
      box.push(BOX1.value);
      box.push(BOX2.value);
      box.push(BOX3.value);
      box.push(BOX4.value);
      box.push(BOX5.value);
      var bim = [];
      bim.push(BIM0.value);
      bim.push(BIM1.value);
      bim.push(BIM2.value);
      Convex["box"] = box;
      Convex["bim"] = bim;

      //workspaceListData.value = dgmJsonIO.GetWorkspaceList();
      var Geometry = [];
      //console.log(toRaw(selcetConvex.value));
      var arr = toRaw(selcetConvex.value);
      //console.log("22", arr);
      if (arr != undefined) {
        if (arr.ClassName != "DGMFeature") {
          inception.value = true;
        } else {
          //var Geometry=[];
          var featureid = arr.id;
          var layer = arr.parent;
          for (let index_i = 0; index_i < layer.ObjectArray.length; index_i++) {
            var tiles = layer.ObjectArray[index_i];
            for (
              let index_j = 0;
              index_j < tiles.PolyDataGeometry.length;
              index_j++
            ) {
              var PolyDataGeometrys = tiles.PolyDataGeometry[index_j];
              if (PolyDataGeometrys.FeatureID == featureid) {
                Geometry.push(PolyDataGeometrys);
                //console.log("22", Geometry);
              }
            }
            //console.log("22", PolyDataGeometrys.FeatureID, "  1212", featureid);
          }
          if (Geometry == []) {
            inception02.value = true;
          } else {
            var gConvex = dgmJsonIO.sendConvex(Geometry, Convex);
            $workSpace.getConvexFromServer(gConvex);
            console.log("gWorkspace数据返回：", gConvex);
            ConvexDialog.value = false;
          }
        }
      } else {
        inception01.value = true;
        //console.log(arr);
        //console.log("1111");
      }
      //ConvexDialog.value = false; //this.workspaceListData = GetWorkspaceList1(); //var dgmJsonIO = new DGMJsonIO(); //console.log("前", oData)
      //workspaceListData.value = dgmJsonIO.GetWorkspaceList();
      //console.log("WorkspacefromServer", workspaceListData);
    }
    function ConvexDialogServer01() {
      var Geometry = [];
      //console.log(toRaw(selcetConvex.value));
      var arr = toRaw(selcetConvex.value);
      if (arr != undefined) {
        if (arr.ClassName != "DGMFeature") {
          inception.value = true;
        } else {
          //var Geometry=[];
          var featureid = arr.id;
          var layer = arr.parent;
          for (let index_i = 0; index_i < layer.ObjectArray.length; index_i++) {
            var tiles = layer.ObjectArray[index_i];
            for (
              let index_j = 0;
              index_j < tiles.PolyDataGeometry.length;
              index_j++
            ) {
              var PolyDataGeometrys = tiles.PolyDataGeometry[index_j];
              if (PolyDataGeometrys.FeatureID == featureid) {
                Geometry.push(PolyDataGeometrys);
                //console.log("22", Geometry);
              }
            }
            //console.log("22", PolyDataGeometrys.FeatureID, "  1212", featureid);
          }
          if (Geometry == []) {
            inception02.value = true;
          } else {
          }
        }
      } else {
        inception01.value = true;
        //console.log(arr);
        //console.log("1111");
      }
      //console.log(Geometry);
      //this.workspaceListData = GetWorkspaceList1(); //var dgmJsonIO = new DGMJsonIO(); //console.log("前", oData)
      //workspaceListData.value = dgmJsonIO.GetWorkspaceList();
      //console.log("WorkspacefromServer", workspaceListData);
    }
    return {
      ref,
      tree,
      root,
      DGMJsonIO,
      leftDrawerOpen,
      rightDrawerOpen,
      workspaceServerDialog,
      workspaceListData,
      workspaceListselected,
      workspaceArray,
      //zjz
      $workSpace,
      ConvexDialog,
      BIM0,
      BIM1,
      BIM2,
      BOX0,
      BOX1,
      BOX2,
      BOX3,
      BOX4,
      BOX5,
      data,
      inception,
      inception01,
      inception02,
      sendConvex,
      ConvexDialogServer,
      ConvexDialogServer01,

      sendWorkspace,
      WorkspacefromServer,
      addData,
      AddProjectInRenderTree,
    };
  },
};
</script>
