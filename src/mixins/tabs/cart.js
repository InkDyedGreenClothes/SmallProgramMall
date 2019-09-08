import wepy from 'wepy'

export default class extends wepy.mixin{
    data = {
        // 购物车商品列表
        cart:[]
    }

    onLoad(){
        // 页面一上来 拿到购物车的数据 
        this.cart = this.$parent.globalData.cart
    }
    methods = {
        // 监听数量变化
        countChange(e){
            console.log(e.detail);
            // console.log(e.detail)
            // 商品的Id值
            // console.log(e.target.dataset.id);
            const count = e.detail
            const id = e.target.dataset.id
            this.$parent.dateGoodsCount(id,count)
            
        },
        // 当前面的复选框发生边框 会出发这个函数
        statusChanged(e){
            console.log(e);
            // 当前最新的最新选中状态
            const status = e.detail
            // 点击对应的ID 
            const id = e.target.dataset.id
            this.$parent.dateGoodsStatus(id,status)
        },
        // 滑动点击删除
        close(id){
            console.log(id);
            this.$parent.removeGoodsById(id)
        },
        // 监听全选f复选框改变
        onFullCheckdChanged(e){
            // console.log(e.detail);
            this.$parent.dateAllGoosStatus(e.detail)
        },
        // 提交订单
        submitBtn(){
            if(this.amout <= 0) {
                return wepy.baseToast('订单金额不能为空')
            }
            wepy.navigateTo({
                url:'/pages/order'
            })
        }
    }
    computed = {
        // 判断购物车是否为空
        isEmpty(){
            if(this.cart.length <= 0){
                return true
            }
            return false
        },
        // 总价位 
        amout(){
            let total = 0 // 元
            this.cart.forEach(x =>{
                if(x.isCheck == true){
                    // 单价 * 数量 = 多少钱
                    total += x.price *x.count 
                }
            })
            // 元改成分
            return total * 100
        },
        // 是不是全选
        isFullCheckd(){
            // 获取所有商品的个数
            const allCount = this.cart.length
            let c = 0;
            this.cart.forEach(x =>{
                if(x.isCheck == true){
                    c++
                }
            })
           return allCount === c 
        }
    }
}