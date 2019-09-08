import wepy from 'wepy'
 
export default class extends wepy.mixin{
    data = {
        // 查询关键词
        query:'',
        // 商品分类的ID
        cid:'',
        // 页面值
        pagenum:1,
        // 页面显示多少条数据
        pagesize:10,
        // 商品列表数据
        goodsList:[],
        // 数据条数
        total:0,
        // 数据是不是加载完毕 false 
        isOver:false,
        // 数据是不是正在请求中 不让用户多次请求数据
        isLoading:false
    }
    methods = {
        // 点击跳转到详情页面
        goGoosDetail(id){
            wepy.navigateTo({
                url:"/pages/goods_detail/main?id=" + id
            })
        }
    }
    onLoad(options){
        console.log(options)
        this.query = options.query || ''
        this.cid = options.cid || ''
        this.getGoodsList()
    }
    // 上拉触底操作
    onReachBottom(){
        // console.log('到底了');
        // 到底了 判断一下 是不是true
        if(this.isLoading == true){
            return 
        }
        /**
         * 判断下一页还有没有数据 阻止多次发请求
         * 当前的页码数 * 页码数据条数 >= 数据条数
         * 35
         * 3 * 10
         */
        if(this.pagenum * this.pagesize >= this.total){
            // 
            this.isOver = true
            return
        }
        this.pagenum++;
        this.getGoodsList()
    }
    // 获取商品列表数据
    async getGoodsList(cb){
        // 请求之前
        this.isLoading = true
        const {data:res} = await wepy.get('/goods/search',{
            query:this.query,
            cid:this.cid,
            pagenum:this.pagenum,
        })
        console.log(res);
        if(res.meta.status !== 200){
            return wepy.baseToast()
        }
        // 获取列表数据 防止第二页的数据覆盖第一页
        this.goodsList = [...this.goodsList,...res.message.goods]
        // 获取数据的条数
        this.total = res.message.total
        // 发送请求之后改成 false
        this.isLoading = false
        this.$apply()

        cb && cb()
    }
    // 下拉刷新
    onPullDownRefresh(){
        // 初始化
        this.pagenum = 1
        this.total = 0
        this.goodsList= []
        this.isLoading = this.isLoading = false
        // 重新发起数据请求
        this.getGoodsList(()=>{
        // 停止下拉刷新
        wepy.stopPullDownRefresh()
        })
        
    }

}