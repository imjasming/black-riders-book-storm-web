<template>
  <div>
    <Tabs value="name1" type="card">
      <TabPane label="未支付订单" name="name1">
        <Table border :columns="columns" :data="order1" size="large" no-data-text="你还没有订单，快去购物吧">
          <template slot-scope="{ row, index }" slot="orderId">
            <span :src="row.orderId"></span>
          </template>
          <template slot-scope="{ row, index }" slot="imgUrl">
            <div>
              <img :src="row.imgUrl">
            </div>
          </template>
          <template slot-scope="{ row, index }" slot="bookName">
            <span :src="row.bookName"></span>
          </template>
          <template slot-scope="{ row, index }" slot="mount">
            <span :src="row.mount"></span>
          </template>
          <template slot-scope="{ row, index }" slot="totalPrice">
            <span :src="row.totalPrice"></span>
          </template>
        </Table>
      </TabPane>
      <TabPane label="未完成订单" name="name2">
        <Table border :columns="columns" :data="order2" size="large" no-data-text="你还没有订单，快去购物吧"></Table>
      </TabPane>
      <TabPane label="已完成订单" name="name3">
        <Table border :columns="columns" :data="order3" size="large" no-data-text="你还没有订单，快去购物吧"></Table>
      </TabPane>
    </Tabs>

    <div class="page-size">
      <Page :total="100" show-sizer></Page>
    </div>
  </div>

</template>
<script>
  import request from '@/utils/request'

  export default {
    name: 'MyOrder',
    data() {
      return {
        order1: [{
          order_id: 1529931938150,
          goods_id: 1529931938150,
          count: 1,
          img: 'static/img/goodsDetail/pack/1.jpg',
          package: '4.7英寸-深邃蓝',
          price: 28,
          title: 'xxxxx',
          createAt: '2018-06-06 20:06:08'
        },
          {
            order_id: 1529931938150,
            goods_id: 1529931938150,
            count: 1,
            img: 'static/img/goodsDetail/pack/1.jpg',
            package: '4.7英寸-深邃蓝',
            price: 28,
            title: 'xxxxx',
            createAt: '2018-06-06 20:06:08'
          }
        ],
        order2: [{
          order_id: 1529931938150,
          goods_id: 1529931938150,
          count: 1,
          img: 'static/img/goodsDetail/pack/1.jpg',
          package: '4.7英寸-深邃蓝',
          price: 28,
          title: 'xxxxx',
          createAt: '2018-06-06 20:06:08'
        },
          {
            order_id: 1529931938150,
            goods_id: 1529931938150,
            count: 1,
            img: 'static/img/goodsDetail/pack/1.jpg',
            package: '4.7英寸-深邃蓝',
            price: 28,
            title: 'xxxxx',
            createAt: '2018-06-06 20:06:08'
          }
        ],
        order3: [
          {
            order_id: 1529931938150,
            goods_id: 1529931938150,
            count: 1,
            img: 'static/img/goodsDetail/pack/1.jpg',
            package: '4.7英寸-深邃蓝',
            price: 28,
            title: 'xxxxx',
            createAt: '2018-06-06 20:06:08'
          },
          {
            order_id: 1529931938150,
            goods_id: 1529931938150,
            count: 1,
            img: 'static/img/goodsDetail/pack/1.jpg',
            package: '4.7英寸-深邃蓝',
            price: 28,
            title: 'xxxxx',
            createAt: '2018-06-06 20:06:08'
          }
        ],
        columns: [
          {
            title: '订单编号',
            slot: 'orderId'
          },
          {
            title: '图片',
            slot: 'imgUrl'
          },
          {
            title: '图书信息',
            slot: 'bookName'
          },
          {
            title: '数量',
            slot: 'mount'
          },
          {
            title: '金额',
            slot: 'totalPrice'
          }
        ],
        orderPanel: [
          {
            title: '未支付',
            orders: []
          },
          {
            title: '未完成',
            orders: []
          },
          {
            title: '已完成',
            orders: []
          },
        ],
        orderList: []
      }
    },
    created() {
      this.loadMyOrderList()
    },
    computed: {},
    methods: {
      loadMyOrderList() {
        const username = this.$store.getters.username
        request.get(`/order/user?username=${username}`).then(response => {
          this.orderList = response.data.data
          this.computeShowOrder()
        }).catch(error => {
          this.$Message.error({
            content: `数据加载失败：${error}`
          })
        })
      },
      computeShowOrder() {
        if (this.orderList) {
          this.orderList.forEach(item => {
            this.orderPanel[parseInt(item.status)].orders.push(item)
          })
        }
      }
    }
  };
</script>

<style scoped>
  .page-size {
    margin: 15px 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
