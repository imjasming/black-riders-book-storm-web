<template>
  <div>
    <Tabs value="name1" type="card">
      <TabPane label="未支付订单" name="name1">
        <Table border :columns="columns" :data="order1" size="large" no-data-text="你还没有订单，快去购物吧"></Table>
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
export default {
  name: 'MyOrder',
  data () {
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
      order3: [{
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
          title: '订单号',
          key: 'order_id',
          width: 180,
          align: 'center'
        },
        {
          title: '图片',
          key: 'img',
          width: 86,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.img
                }
              })
            ]);
          },
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '套餐',
          width: 198,
          key: 'package',
          align: 'center'
        },
        {
          title: '数量',
          key: 'count',
          width: 68,
          align: 'center'
        },
        {
          title: '价格',
          width: 68,
          key: 'price',
          align: 'center'
        },
        {
          title: '购买时间',
          width: 120,
          key: 'createAt',
          align: 'center'
        }
      ]
    };
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
