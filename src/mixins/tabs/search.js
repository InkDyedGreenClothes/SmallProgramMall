import wepy from 'wepy'

export default class extends wepy.mixin{

    data = {
        // 搜素框中的默认内容
        value:'',
        // 搜素建议列表
        suggestList:[],
        // 搜索历史列表
        keyList:[],
    }
    // 搜索历史逻辑 
    onLoad(){
        // 如果没有获得数据的话 就返回一个空数组
        const keyWordList = wx.getStorageSync('keyWord') || []
        this.keyList = keyWordList
        console.log(this.keyList);

    }
    methods = {
        // 搜素关键字发生变化会触发这个函数
        onChange(e){
            // console.log(e.detail);
            this.value = e.detail.trim()

            if(e.detail.trim().length <= 0){
                this.suggestList = []
                return 
            }
            // 当搜索框发生变化的时候 就调用函数接口
            this.getSuggestList(e.detail)
        },
        // 触发了搜素
        onSearch(e){
            // e.detail 可以拿到最新的搜素内容
            // console.log(e.detail);
            const kw = e.detail.trim()
            if(kw.length <= 0){
                return
            }
            // 判断用户输入的是不是重复
            if(this.keyList.indexOf(kw) === -1){
                this.keyList.unshift(kw)
            }
            // 超过十个切割
            this.keyList = this.keyList.slice(0,10)
            // 存进 Stor
            wepy.setStorageSync('keyWord',this.keyList)
            wepy.navigateTo({
                url:'/pages/goods_list?query=' + kw
            })
        },
        // 触发了取消
        onCancel(){
            // 触底取消 就把这个数组清空
            this.suggestList = []
        },
        // 点击搜索项跳转页面
        goGoodsDetail(id){
            wepy.navigateTo({
               url:'/pages/goods_detail/main?id='+ id
            })
        },
        // 点击每个搜索历史标签，导航到商品页面 同时把参数传递过去
        goGoodList(query){
            wepy.navigateTo({
                url:'/pages/goods_list?query='+ query
            })
        },
        // 删除搜索历史
        clearHistory(){
            this.keyList = []
            wepy.setStorageSync('keyWord',[])
        }
    }

    // 计算属性
    computed = {
        // true 展示搜索历史
        // false 展示搜索列表
        isShowHistry(){
            if(this.value.length <= 0){
                return true
            }
            return false
        }
    }
    // 获取搜素建议列表
    async getSuggestList(searchStr){
        const {data:res} = await wepy.get('/goods/qsearch',{
            query:searchStr
        })

        // console.log(res)

        if(res.meta.status !== 200){
            return wepy.baseToast()
        }

        this.suggestList = res.message
        this.$apply()

    }
}