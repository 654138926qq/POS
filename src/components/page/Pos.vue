<template>
  <div class="pos">
    <el-row>
      <!--点餐栏-->
      <el-col :span="6" class="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <template>
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="goodsName" label="商品" width="120">
                </el-table-column>
                <el-table-column prop="count" label="数量" width="120">
                </el-table-column>
                <el-table-column prop="price" label="金额" width="120">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template scope="scope">
                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="addGoodsList(scope.row)">增加</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <div class="countPrice">
              总计数量：<span>{{totalCount}}</span>件,&nbsp;&nbsp;总价：<span>{{totalPrice}}</span>元
            </div>
            <div class="block">
              <el-button type="primary">挂单</el-button>
              <el-button type="success" @click="checkout()">结账</el-button>
              <el-button type="danger" @click="delAllGoods()">删除</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <!--商品栏-->
      <el-col :span="18" class="goods-list">
        <!--热销商品-->
        <div class="hot-sales">
          <h2 class="title">热销商品</h2>
          <div class="hot-sales-list">
            <ul>
              <li v-for="item in hotGoods" :key="item.goodsId" @click="addGoodsList(item)">
                <span>{{item.goodsName}}</span>
                <span class="o-price">￥{{item.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <!--商品分类-->
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <ul class='cookList'>
                <li v-for="item in typeGoods[0]" :key="item.goodsid" @click="addGoodsList(item)">
                  <span class="foodImg">
                    <img :src="item.goodsImg" width="100%">
                  </span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <p class="foodPrice">&nbsp;&nbsp;￥{{item.price}}元</p>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <ul class='cookList'>
                <li v-for="item in typeGoods[1]" :key="item.goodsid" @click="addGoodsList(item)">
                  <span class="foodImg">
                    <img :src="item.goodsImg" width="100%">
                  </span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <p class="foodPrice">&nbsp;&nbsp;￥{{item.price}}元</p>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <ul class='cookList'>
                <li v-for="item in typeGoods[2]" :key="item.goodsid" @click="addGoodsList(item)">
                  <span class="foodImg">
                    <img :src="item.goodsImg" width="100%">
                  </span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <p class="foodPrice">&nbsp;&nbsp;￥{{item.price}}元</p>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <ul class='cookList'>
                <li v-for="item in typeGoods[3]" :key="item.goodsid" @click="addGoodsList(item)">
                  <span class="foodImg">
                    <img :src="item.goodsImg" width="100%">
                  </span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <p class="foodPrice">&nbsp;&nbsp;￥{{item.price}}元</p>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Pos',
  data () {
    return {
      tableData: [],
      hotGoods: [],
      typeGoods: [],
      totalCount: 0,
      totalPrice: 0
    }
  },
  created () {
    this.getHotGoods()
    this.getTypeGoods()
  },
  mounted: function () {
    var orderListHeight = document.body.clientHeight
    document.getElementsByClassName('order-list')[0].style.height = orderListHeight + 'px'
  },
  methods: {
    // 获取热销商品数据
    getHotGoods () {
      this.$axios.get('http://jspang.com/DemoApi/oftenGoods.php')
        .then(res => {
          console.log(res)
          this.hotGoods = res.data
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问')
        })
    },
    // 获取商品分类数据
    getTypeGoods () {
      this.$axios.get('http://jspang.com/DemoApi/typeGoods.php')
        .then(res => {
          this.typeGoods = res.data
        })
    },
    // 添加商品至点餐列表
    addGoodsList (goods) {
      // 判断商品是否已存在于点餐列表
      let isHave = false
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true   // 存在
        }
      }
      // 商品存在于点餐列表时
      if (isHave) {
        // 存在就进行数量添加
        let arr = this.tableData.filter(o => o.goodsId === goods.goodsId)
        arr[0].count++
        // console.log(arr)
      } else {
        // 不存在的就先存进数据，再添加进列表
        let newGoods = { goodsId: goods.goodsId, goodsName: goods.goodsName, price: goods.price, count: 1 }
        this.tableData.push(newGoods)
      }
      this.getAllCount()
    },
    // 删除单个商品
    delSingleGoods (goods) {
      this.tableData = this.tableData.filter(o => o.goodsId !== goods.goodsId)
      this.getAllCount()
    },
    // 删除点餐列表清单
    delAllGoods () {
      this.tableData = []
      this.totalCount = 0
      this.totalPrice = 0
    },
    // 统计商品总数及价格
    getAllCount () {
      this.totalCount = 0
      this.totalPrice = 0
      // 计算合计数量及价格
      this.tableData.forEach((item) => {
        this.totalCount += item.count
        this.totalPrice += item.count * item.price
      })
    },
    // 模拟结账
    checkout () {
      if (this.totalCount && this.totalPrice) {
        this.totalCount = 0
        this.totalPrice = 0
        this.tableData = []
        this.$message({
          type: 'success',
          message: '结账成功',
          duration: 1000
        })
      } else {
        this.$message({
          type: 'error',
          message: '请先添加商品',
          duration: 1000
        })
      }
    }
  }
}
</script>


<style scnewGoodsped>
.order-list {
  background-color: #e0e0e0;
  border-right: 1px solid #666;
}

.block {
  margin-top: 20px;
}

.countPrice{
  height: 20px;
  line-height: 20px;
  padding: 10px 0px;
}
.countPrice span{
  padding: 0 5px;
  color: red;
}



/*商品栏*/

.title {
  height: 20px;
  border-bottom: 1px solid #D3DCE6;
  background-color: #F9FAFC;
  padding: 10px;
  text-align: left;
}

.hot-sales-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #E5E9F2;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  cursor: pointer;
}

.o-price {
  color: red;
}

.goods-type {
  clear: both;
}

.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #E5E9F2;
  height: auto;
  overflow: hidden;
  background-color: #fff;
  padding: 5px;
  float: left;
  margin: 4px;
  cursor: pointer;
}

.cookList li span {

  display: block;
  float: left;
}

.foodImg {
  width: 40%;
}

.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}

.foodPrice {
  font-size: 14px;
  padding-left: 10px;
  padding-top: 10px;
  text-align: left;
}
</style>
