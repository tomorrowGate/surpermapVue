<template>
  <div>
  <div v-if="isoline && !dsMode" >
    <div class="sm-function-module-content">
      <div class="sm-function-module-sub-section">
        <label class="label-container">最大可见高程(米) :</label>
        <input class="sm-input-long" min="0" type="number" v-model="fillMaxHeight"  />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">最小可见高程(米) :</label>
        <input class="sm-input-long" min="0" type="number" v-model="fillMinHeight"  />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">等值距(米) :</label>
        <input class=" sm-input-long" min="0" type="number" v-model="equivalentIsoline"  />
      </div>
      <div class="sm-function-module-sub-section">
        <label class=" label-container">颜色选择 :</label>
        <!--            <ColorPicker  class="sm-colorpicker" v-model="color" alpha />-->
        <ColorPicker class="sm-colorpicker" editable v-model="color" />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">显示模式 ：</label>
        <select class="sm-select" id="fillOptions" v-model="fillOptionsSelected">
          <option :value="Options.id" v-for="Options in fillOptions" >{{Options.name}}</option>
        </select>
      </div>
      <label class="sm-viewshed-label-right">编辑:</label>
      <input style="margin-left: 10px" type="checkbox" v-model="isEdit"/>
      <div class="boxchild ">
        <button @click="isoLine" class="tbtn tbn1"  type="button">分析</button>
        <button @click="clearIsoLine" class="tbtn " type="button">清除</button>
      </div>
    </div>
  </div>

    <div class="sm-viewshed-panel" id="viewshed-panel" v-if="dsMode"  >
      <div
        :class="{'sm-viewshed-toggle-btn-only': !show}"
        @click="toggleVisibility"
        class="sm-viewshed-toggle-btn"
      >
        <span class="iconfont icondixing"></span>
      </div>
      <div :class="{'sm-viewshed-content-hidden' : !show}" class="sm-viewshed-content">
        <div class="sm-viewshed-panel-header">
          <span>等值线</span>
        </div>
        <div class="sm-function-module-content">
          <div class="sm-function-module-sub-section">
            <label class="label-container">最大可见高程(米) :</label>
            <input class="sm-input-long" min="0" type="number" v-model="fillMaxHeight"  />
          </div>
          <div class="sm-function-module-sub-section">
            <label class="label-container">最小可见高程(米) :</label>
            <input class="sm-input-long" min="0" type="number" v-model="fillMinHeight"  />
          </div>
          <div class="sm-function-module-sub-section">
            <label class="label-container">等值距(米) :</label>
            <input class=" sm-input-long" min="0" type="number" v-model="equivalentIsoline"  />
          </div>
          <div class="sm-function-module-sub-section">
            <label class=" label-container">颜色选择 :</label>
            <ColorPicker  alpha class="sm-colorpicker" editable v-model="color" />
          </div>
          <div class="sm-function-module-sub-section">
            <label class="label-container">显示模式 ：</label>
                  <select class="sm-select" id="" v-model="fillOptionsSelected">
                    <option :value="Options.id" v-for="Options in fillOptions" >{{Options.name}}</option>
                  </select>
          </div>
          <label class="sm-viewshed-label-right">编辑:</label>
          <input style="margin-left: 10px" type="checkbox" v-model="isEdit"/>
              <div class="boxchild ">
                <button @click="isoLine" class="tbtn tbn1"  type="button">分析</button>
                <button @click="clearIsoLine" class="tbtn " type="button">清除</button>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Sm3dTerrainIsoline",
    data(){
      return{
        show:true,
        dsMode:1,
        // 等值线
        isoline:false,
        colorTableIsoline:{},
        fillOptions:[
          {
            id: 'Line',
            name: '等高线填充'
          },
          {
            id: 'Region',
            name: '等高面填充'
          },
          {
            id: 'Line_Region',
            name: '等高线面填充'
          },
          {
            id: 'None',
            name: '无颜色表'
          }
        ],
        fillMaxHeight:9000,
        fillMinHeight:0.0,
        equivalentIsoline:100.0,
        fillOptionsSelected: '',
        hyp:{},
        color:'#ff8040',
        DisplayModeHyp:Number,
        handlerPolygon:null,
        //编辑功能
        selectHandler:null,
        editHandler: null,
        isEditZ: false,
        isEdit: false,
        EditPositions: [],
        polylineCollection: null,
        polylineTransparent: null,
      }
    },
    methods:{
      toggleVisibility() {
        this.show = !this.show;
      },
      // 等值线
      isoLine(){
        let hyp =this.hyp
        //默认参数配置
        hyp.DisplayMode = this.DisplayModeHyp;
        hyp._lineColor =  Cesium.Color.fromCssColorString(this.color);
        hyp.LineInterval = parseFloat(this.equivalentIsoline);
        hyp.MaxVisibleValue = parseFloat(this.fillMaxHeight);
        hyp.MinVisibleValue = parseFloat(this.fillMinHeight);
        hyp.ColorTableMinKey = 2736.88110351563;
        hyp.ColorTableMaxKey = 5597.06640625;
        hyp.ColorTable = this.colorTableIsoline;
        hyp.Opacity = 0.4;
        this.positions = [];

        common.handlerDrawing(this).then(res => {
          this.positions = res.positions
            let handlerPolygon = this.handlerPolygon
            //分析区域为指定区域
            hyp.CoverageArea = res.positions;
            viewer.scene.globe.HypsometricSetting = {
              hypsometricSetting : hyp,
              analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
            };
            handlerPolygon.polygon.show = false;
            handlerPolygon.polyline.show = false;
            handlerPolygon.deactivate();
            if(this.isEdit){
              common.Edit(this,this.judge)
            }
          },
          (err) => {
            console.log(err)
          })
        this.handlerPolygon.activate();
        if (!scene.pickPositionSupported) {
          alert('不支持深度纹理,无法绘制多边形，等值线功能无法使用！');
        }
      },
      clearIsoLine(){
        this.positions = []
        viewer.scene.globe.HypsometricSetting = undefined;
        this.hyp && (this.hyp.MaxVisibleValue = -1000);
        this.hyp && (this.hyp.MinVisibleValue = -1000);
        common.clearHandlerDrawing(this)
        common.clearEditHandler(this)
      },
      //动态更新地形
      judge(p){
        if(this.positions){
          if(this.positions.length==0){return}
          if(p){this.hyp.CoverageArea = p;}
          viewer.scene.globe.HypsometricSetting = {
            hypsometricSetting : this.hyp,
            analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
          };
        }
      },
      init(){
        // 等值线
        this.hyp = new Cesium.HypsometricSetting();
        this.colorTableIsoline = new Cesium.ColorTable();
        this.fillOptionsSelected = this.fillOptions[0].id;
        this.DisplayModeHyp =  Cesium.HypsometricSettingEnum.DisplayMode.LINE;
        //建立颜色表
        let colorTable = this.colorTableIsoline;
        colorTable.insert(5597.06640625,new Cesium.Color(0, 0, 255/255));
        colorTable.insert(5406.3873860677086,new Cesium.Color(0, 51/255, 255/255));
        colorTable.insert(5215.7083658854172,new Cesium.Color(0, 102/255, 255/255));
        colorTable.insert(5025.0293457031257,new Cesium.Color(0, 153/255, 255/255));
        colorTable.insert(4834.3503255208343,new Cesium.Color(0, 204/255, 255/255));
        colorTable.insert(4643.6713053385429,new Cesium.Color(0, 255/255, 255/255));
        colorTable.insert(4452.9922851562524,new Cesium.Color(51/255, 255/255, 204/255));
        colorTable.insert(4262.3132649739609,new Cesium.Color(102/255, 255/255, 153/255));
        colorTable.insert(4071.6342447916695,new Cesium.Color(153/255, 255/255, 102/255));
        colorTable.insert(3880.9552246093781,new Cesium.Color(204/255, 255/255, 51/255));
        colorTable.insert(3690.2762044270867,new Cesium.Color(255/255, 255/255, 0));
        colorTable.insert(3499.5971842447952,new Cesium.Color(255/255, 204/255, 0));
        colorTable.insert(3308.9181640625038,new Cesium.Color(255/255, 153/255, 0));
        colorTable.insert(3118.2391438802129,new Cesium.Color(255/255, 102/255, 0));
        colorTable.insert(2927.5601236979214,new Cesium.Color(255/255, 51/255, 0));
        colorTable.insert(2736.88110351563,new Cesium.Color(255/255, 0, 0));
      }

    },

    // 监听viewer
    mounted() {
      eventBus.$on("init", (e)=> {
        common.initHandler(this)
        this.init()
      })
    },
    watch:{
      // 编辑
      isoline(val){
        if(val && this.isEdit){
          common.Edit(this,this.judge)
        }else {
          if(this.handlerPolygon){
            if (this.handlerPolygon.polygon) {
              this.handlerPolygon.polygon.show = false;
            }
          }
          if(this.editHandler){ this.editHandler.deactivate();}
            if(this.selectHandler){
              this.selectHandler.removeInputAction( Cesium.ScreenSpaceEventType.LEFT_UP)
              this.selectHandler.removeInputAction( Cesium.ScreenSpaceEventType.LEFT_CLICK)
            }
        }

    },
    isEdit(val) { //编辑
      if(val){common.Edit(this,this.judge)}
      else {
        if(this.editHandler){ this.editHandler.deactivate();}
        if(this.selectHandler){ //移除鼠标移动事件监听
          this.selectHandler.removeInputAction( Cesium.ScreenSpaceEventType.LEFT_UP)
          this.selectHandler.removeInputAction( Cesium.ScreenSpaceEventType.LEFT_CLICK)
        }
        if(this.handlerPolygon.polygon){
          this.handlerPolygon.polygon.show = false;
        } }
    },
      // 等值线
      fillMaxHeight(val){
        this.hyp.MaxVisibleValue = parseFloat(val);
        this.judge()
      },
      fillMinHeight(val){
        this.hyp.MinVisibleValue = parseFloat(val);
        this.judge()
      },
      equivalentIsoline(val){
        this.hyp.LineInterval = parseFloat(val);
        this.judge()
      },
      color(val){
        this.color = val
        this.hyp._lineColor =  Cesium.Color.fromCssColorString(this.color);
        this.judge()
      },
      fillOptionsSelected(val){
        this.fillOptionsSelected = val;
        switch (this.fillOptionsSelected){
          case 'None' : {
            viewer.scene.globe.HypsometricSetting = undefined;
            this.DisplayModeHyp = undefined
          }
            break;
          case 'Line' : {
            this.DisplayModeHyp = Cesium.HypsometricSettingEnum.DisplayMode.LINE;
          }
            break;
          case 'Region' : {
            this.DisplayModeHyp = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
          }
            break;
          case 'Line_Region' : {
            this.DisplayModeHyp = Cesium.HypsometricSettingEnum.DisplayMode.FACE_AND_LINE;
          }
            break;
          default : break;
        }
        this.hyp.DisplayMode = this.DisplayModeHyp;
        this.judge()
      },
    },
    beforeMount() {
      eventBus.$emit("sendPname", {
        type:"terrain",
        name:"等值线",
        value:this.isoline
      });
      eventBus.$on("sendCname", (e)=> {
        if(this.dsMode){
          this.dsMode = 0;
        }
        if(e == "等值线"){this.isoline= true; }
        else {this.isoline= false}
      });
    },
  }
</script>

<style lang="scss" scoped>
  @import "TerrainIsoLine";
</style>




