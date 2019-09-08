import wepy from 'wepy'

export default class extends wepy.mixin{


    data = {
        // 分类数据
        catesList:[],
        // 默认被激活的索引项
        active:0,
        // 当前屏幕可用的高度
        wh:0,
        // 所有的二级分类
        secondCate:[],
        
    }
    onLoad(){
        // 动态获取屏幕可用的高度
        this.getwindowHeight()
        // 左侧列表的数据
        this.getCatesList()
    }
    // 分类数据的列表
    async getCatesList (){
        const {data:res} = await wepy.get('/categories')
        if(res.meta.status !== 200){
            return wepy.baseToast()
        }
        console.log(res);
        
        this.catesList = res.message
        this.secondCate = res.message[0].children
        this.$apply()
        console.log(this.catesList);
        
    }
    // 动态获取屏幕可用的高度
    async getwindowHeight(){
        const res = await wepy.getSystemInfo()
        // console.log(res)
        // 如果errMag ok的话 就把当前屏幕的值给拿过来
        if(res.errMsg === "getSystemInfo:ok"){
            this.wh = res.windowHeight
            this.$apply()
        }
        
    }


    methods = {
        // 二级分类数据
        onChange(e){
            // e.detail 是点击的索引
            console.log(e.detail)
            // 获取二级分类 
           this.secondCate = this.catesList[e.detail].children
           console.log(this.secondCate)
           
            
        },
        // 点击跳转到商品列表页面 同时把s商品分类的 id 传递过去
        goGoosList(id){
            console.log(id);
            wepy.navigateTo({
                url:'/pages/goods_list?id=' + id,
            })
        }
    }
}