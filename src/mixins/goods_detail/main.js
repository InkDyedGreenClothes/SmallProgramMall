import wepy from 'wepy'

export default class extends wepy.mixin{

    data = {
        // 商品的ID值
        goods_id:'',
        // 商品的详情
        goodsInfo:{},
        // 收货地址
        addressInfo:null
    }
    // 接受页面传入过来的ID
    onLoad(options){
        console.log(options);
        this.goods_id = options.id
        // 发送数据请求
        this.getGoodsInfo()
    }

    // 获取商品详情数据
    async getGoodsInfo(){
        console.log('id')
        console.log(this.goods_id)
       const {data:res } = await wepy.get('/goods/detail',{
            goods_id:this.goods_id
        })
        console.log(res);
        this.goodsInfo = res.message
        this.$apply()
        
    }
    methods = {
        // 点击图片实现预览
        swipersBtn(current){
            wepy.previewImage({
                // 所有图片的路径
                urls:this.goodsInfo.pics.map(x => x.pics_big),
                // 当前默认看到的图片
                current:current
            })
            
        },

        // 获取用户的收货地址 chooseAddress()
        async chooseAddress(){
           const res = await wepy.chooseAddress().catch(err => err)
           if(res.errMsg !=="chooseAddress:ok"){
               return wepy.baseToast('获取失败')
           }
           console.log(res);

           this.addressInfo = res
           wepy.setStorageSync('address',res)
           this.$apply()
        },
        // 点击购物车 把商品添加到购物车列表
        addToCart(){
            // console.log(this.goodsInfo);
            this.$parent.addGoodsTocart(this.goodsInfo)
            wepy.showToast({
                // 提示用户加入购物车成功
                title:'已加入购物车',
                icon:'success'
            })
        }
    }
    // 计算属性
    computed = {
        addressStr(){
            if(this.addressInfo == null){
                return '请选择收货地址'
            }
            const addRes = this.addressInfo
            // 省市区详细地址
            const str = addRes.provinceName + addRes.cityName + addRes.countyName + addRes.detailInfo
            return str
        },
        // 所有已经勾选的商品的数量
        total(){
           return this.$parent.globalData.total 
        }
    }
}