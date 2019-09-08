import wepy from 'wepy'

export default class extends wepy.mixin {
  config = {}

  data = {
    // 轮播图的数据 默认为空数组
    swiperList: [],
    // 分类数据的数组
    cateItems: [],
    // 楼层数据
    floorData:[]
  }

  onLoad() {
    // 轮播图
    this.getSwiperData()
    // 获取首页分类数据
    this.getCateItems()
    // 获取楼层数据
    this.getFloorData()
  }
  // 轮播图
  async getSwiperData() {

    const {data:res} = await wepy.get("/home/swiperdata")

    if (res.meta.status !== 200) {
       return wepy.baseToast()
    }
    this.swiperList = res.message
    this.$apply()
  }
  
  // 获取分类
  async getCateItems() {
    const {data: res} = await wepy.get('/home/catitems')
    if (res.meta.status !== 200) {
      return wepy.baseToast()
      }
    this.cateItems = res.message
    this.$apply()

  }
  // 获取楼层 数据
  async getFloorData(){
    const {data:res} = await wepy.get('/home/floordata')
    if(res.meta.status !== 200){
      return wepy.baseToast()
    }
    this.floorData = res.message
    this.$apply()
    console.log(this.floorData)
    
  }

  methods = {
    // 点击楼层每一张图片 都要跳转到商品页面
    goGoodsList(url){
      // navigateTo 跳转商品列表页面
      wepy.navigateTo({
        url:url
      })
    }
  }
}
