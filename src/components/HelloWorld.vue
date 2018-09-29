<template>
<div>
  <p>{{value}}</p>
  <div id="mapDiv" class="mapDiv" ref="mapDiv">
  </div>
</div>
</template>

<script>
import BaiduMap from '@/common/js/baidu-map'
// import {getCity} from '@/api/remote'
// import BMap from 'BMap'

export default {
  data() {
    return {
      value: '',
      zoom: '11',
      points: [],
      line: '',
      T: '',
      lay: '',
      map: '',
      drivingRoute: '',

      _CarTrack: '',
      startIcon: '',
      endIcon: '',
      config: '',
      iconMaker: [],
      myIcon: ''
    }
  },
  created() {
    this.startIcon = 'http://lbs.tianditu.gov.cn/images/bus/start.png'
    this.endIcon = 'http://lbs.tianditu.gov.cn/images/bus/end.png'
    this.myIcon = 'http://lbs.tianditu.gov.cn/images/bus/end.png'
  },
  mounted() {
    this.$nextTick(() => {
      this.getPosition()
    })
  },
  watch: {
    '$route': 'getPosition'
  },
  methods: {
    getPosition() {
      this.value = 111
      window.onload = function() {
        console.log(11111)
      }
      BaiduMap.init().then((T) => {
        this.T = T
        this.zoom = 12
        var imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
                'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
                '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'
        // 创建自定义图层对象
        this.lay = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 })
        var config = { layers: [this.lay] }
        this.map = new T.Map(this.$refs.mapDiv, config)// 初始化地图对象
        this.map.centerAndZoom(new T.LngLat(116.40969, 39.94940), this.zoom)// 设置显示地图的中心点和级别
        // 创建图片对象
        var icon = new T.Icon({
          iconUrl: 'http://api.tianditu.gov.cn/img/map/markerA.png',
          iconSize: new T.Point(19, 27),
          iconAnchor: new T.Point(10, 25)
        })
        var marker = new T.Marker(new T.LngLat(116.404, 39.945), { icon: icon }) // 创建点
        this.map.addOverLay(marker) // 增加点
        this.points.push(new T.LngLat(116.404, 39.945), new T.LngLat(116.411794, 39.9068), new T.LngLat(116.32969, 39.92940), new T.LngLat(116.385438, 39.90610))
        const points1 = []
        points1.push(new T.LngLat(116.404, 39.845), new T.LngLat(116.411794, 39.915))
        // 创建线对象
        var line = new T.Polyline(points1, { color: '#fff' })
        var line1 = new T.Polyline(this.points, { color: '#f00' })
        // 向地图上添加线
        this.map.addOverLay(line1)
        this.map.addOverLay(line)
        // // 创建信息窗口对象
        // var infoWin = new T.InfoWindow()
        // infoWin.setLngLat(new T.LngLat(116.404, 39.945))
        // // 设置信息窗口要显示的内容
        // infoWin.setContent('起始点')
        // // 向地图上添加信息窗口
        // this.map.addOverLay(infoWin)
      }).catch(error => {
        console.log(error)
      })
    }

  }
}
</script>

<style scoped>
.mapDiv{
  width: 100%;
  height: 85vh;
}
</style>
