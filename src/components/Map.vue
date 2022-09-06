<template>
  <div class="m-map">
    <div class="search" v-if="placeSearch">
      <icon name="arrow-left" size="0.5rem" @click="onClickLeft" />
      <input type="text" placeholder="请输入关键字" v-model="searchKey">
      <button type="button" @click="handleSearch">搜索</button>
      <div id="js-result" v-show="searchKey" class="result"></div>
    </div>
    <div id="js-container" class="map">正在加载数据 ...</div>
  </div>
</template>

<script>
import AMap from '@/utils/aMap.js'
import { Icon } from 'vant';
import { MapKey, MapCityName } from '@/config/config'
export default {
  props: ['lat', 'lng'],
  data () {
    return {
      searchKey: '',
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null
    }
  },
  components: {
   Icon
  },
  watch: {
    searchKey () {
      if (this.searchKey === '') {
        this.placeSearch.clear()
      }
    }
  },
  methods: {
    // 搜索
    onClickLeft() {
     this.$router.go(-1);
    },
    handleSearch () {
      if (this.searchKey) {
        this.placeSearch.search(this.searchKey)
      }
    },
    // 实例化地图
    initMap () {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = this.AMapUI = window.AMapUI
      let AMap = this.AMap = window.AMap
      AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
        let mapConfig = {
          zoom: 16,
          cityName: MapCityName
        }
        if (this.lat && this.lng) {
          mapConfig.center = [this.lng, this.lat]
        }
        let map = new AMap.Map('js-container', mapConfig)
        // 加载地图搜索插件
        AMap.service('AMap.PlaceSearch', () => {
          this.placeSearch = new AMap.PlaceSearch({
            pageSize: 5,
            pageIndex: 1,
            citylimit: true,
            city: MapCityName,
            map: map,
            panel: 'js-result'
          })
        })
        // 启用工具条
        AMap.plugin(['AMap.ToolBar'], function () {
          map.addControl(new AMap.ToolBar({
            position: 'RB'
          }))
        })
        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map // 依赖地图对象
        })
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on('success', positionResult => {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!this.dragStatus) {
            this.dragStatus = true
          } else {
            this.$emit('drag', positionResult)
          }
        })
        // 启动拖放
        positionPicker.start()
      })
    }
  },
  async created () {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap()
    // 未载入高德地图API，则先载入API再初始化
    } else {
      await AMap(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`)
      await AMap('http://webapi.amap.com/ui/1.1/main.js')
      this.initMap()
    }
  }
}
</script>

<style lang="less" scoped>
.m-map{width: auto; height: 100%; }
.m-map .map{ width: 100%;height: 12.5rem; }
.m-map .search .van-icon{vertical-align:middle;padding-right: 0.3rem;}
.m-map .search{ position: absolute; top: 0.4rem; left: 0.4rem; width: 7rem; z-index: 1; }
.m-map .search input{ width: 4.5rem; border: 0.01rem solid #ccc; line-height: 0.3rem; padding: 0.1rem; outline: none; }
.m-map .search button{ line-height: 0.5rem; background: #fff; border: 0.01rem solid #ccc; width: 1rem; text-align: center; }
.m-map .result{ max-height: 5rem; overflow: auto; margin-top: 0.2rem; }
</style>