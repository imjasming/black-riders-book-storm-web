<template>
  <div>
    <div class="nav-body">
      <!-- 侧边导航 -->
      <div class="nav-side" ref="navSide">
        <ul v-for="(category, index) in categoryList" :key="index">
          <li @mouseenter="showDetail(category.id)" @mouseleave="hideDetail(category.id)"
          >
            <span v-for="(item, index) in category.navTitles" :key="index" class="nav-side-item">{{item + ' '}}</span>/
          </li>
        </ul>
      </div>
      <div class="nav-content">
        <!-- 幻灯片 -->
        <div>
          <Carousel autoplay loop>
            <CarouselItem v-for="(item, index) in marketing.banner" :key="index">
              <router-link :to="item.targetUrl">
                <img :src="item.imgUrl">
              </router-link>
            </CarouselItem>
          </Carousel>
        </div>
        <!--<div class="nav-show">
          <div class="nav-show-img" v-for="(item, index) in marketing.activities" :key="index">
            <router-link :to="item.targetUrl">
              <img :src="item.imgUrl">
            </router-link>
          </div>
        </div>-->
      </div>
    </div>
    <transition name="fade">
      <div class="detail-item-panel panel-1" :duration="{ enter: 100, leave: 100 }"
           v-show="showItemPanel"
           @mouseenter="showDetail(currentCategory.id)" ref="itemPanel" @mouseleave="hideDetail()">
        <div class="nav-detail-item">
          <span v-for="(item, index) in currentCategory.navTags" :key="index">{{item}} > </span>
        </div>
        <ul>
          <li v-for="(items, index) in currentCategory.classNav" :key="index" class="detail-item-row">
            <span class="detail-item-title">{{items.title}}
              <span class="glyphicon glyphicon-menu-right"></span>
            </span>
            <router-link to="/goodsList" v-for="(item, subIndex) in items.tags" :key="subIndex">
              <span class="detail-item">{{item}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import store from '@/store';
  import request from '@/utils/request'

  export default {
    name: 'HomeNav',
    data() {
      return {
        showItemPanel: false,
        currentShow: 0,
        categoryList: [
          {
            id: 0,
            navTitles: ["手机", "数码"],
            navTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
            classNav: [
              {
                title: '面部护肤',
                tags: ['补水保湿', '卸妆', '洁面', '爽肤水', '乳液面霜', '精华', '眼霜', '防晒', '面膜', '剃须', '套装']
              },
              {
                title: '洗发护发',
                tags: ['洗发', '护发', '染发', '造型', '假发', '美发工具', '套装']
              }
            ]
          },
          {
            id: 1,
            navTitles: ["电脑", "办公"],
            navTags: ['赛事', '运动城', '户外馆', '健身房', '骑行馆', '钟表城'],
            classNav: [
              {
                title: '2017新品',
                tags: ['休闲鞋', '商务休闲鞋', '正装鞋', '帆布鞋', '凉鞋', '拖鞋', '功能鞋', '增高鞋', '工装鞋', '雨鞋']
              },
              {
                title: '运动鞋包',
                tags: ['跑步鞋', '休闲鞋', '篮球鞋', '帆布鞋', '板鞋', '拖鞋', '运动包']
              }
            ]
          }
        ],
        nav: [
          '秒杀',
          '优惠券',
          '闪购',
          '拍卖',
          '服装城',
          '超市',
          '生鲜',
          '全球购',
          '金融'
        ],
        marketing:{},
      };
    },
    computed: {
      /*marketing(){
        return this.$store.getters.marketing
      },*/
      currentCategory() {
        return this.categoryList[this.currentShow]
      }
    },
    mounted() {
      this.setItemPanel()
      this.getMarketing()
    },
    updated() {
      this.setItemPanel()
    },
    methods: {
      getMarketing(){
        request('/index/marketing').then(response => {
          let t = this.showItemPanel
          this.marketing = response.data.data
        }).catch(error => {
        })
      },
      showDetail(index) {
        this.currentShow = index;
        this.showItemPanel = true
      },
      hideDetail() {
        this.showItemPanel = false;
      },
      setItemPanel() {
        if (this.$refs.itemPanel) {
          this.$refs.itemPanel.style.left =
            this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + 'px';
          this.$refs.itemPanel.style.top = this.$refs.navSide.offsetTop + 'px';
        }
      }
    },
    store
  };
</script>

<style lang="scss" scoped>
  $color-primary: #409EFF;

  .nav-item {
    width: 680px;
    height: 36px;
    margin: 0 auto;
  }

  .nav-item ul {
    list-style: none;
    margin-left: 15px;
  }

  .nav-item li {
    float: left;
    font-size: 16px;
    font-weight: bold;
    margin-left: 30px;
  }

  .nav-item a {
    text-decoration: none;
    color: #555555;
  }

  .nav-item a:hover {
    color: #d9534f;
  }

  /*大的导航信息，包含导航，幻灯片等*/
  .nav-body {
    width: 1050px;
    height: 485px;
    margin: 0px auto;
  }

  .nav-side {
    width: 200px;
    height: 100%;
    padding: 0px;
    color: #fff;
    float: left;
    border: 1px solid $color-primary;
    border-right: none;
    background-color: $color-primary;
  }

  .nav-side ul {
    width: 100%;
    padding: 10px 0 0;
    list-style: none;
  }

  .nav-side li {
    padding: 6px 7.5px 6px 15px;
    font-size: 14px;
    line-height: 18px;
  }

  .nav-side li:hover {
    background: #fff;
    color: $color-primary;
  }

  .nav-side-item:hover {
    cursor: pointer;
    color: #c81623;

  }

  /*导航内容*/
  .nav-content {
    width: 792px;
    margin-left: 15px;
    overflow: hidden;
    float: left;
  }

  /*导航图片*/
  .nav-show-img {
    margin-top: 10px;
    float: left;
  }

  .nav-show-img:nth-child(2) {
    margin-left: 12px;
  }

  /*显示商品*/
  .content {
    width: 100%;
  }

  /*显示商品详细信息*/
  .detail-item-panel {
    width: 815px;
    height: 485px;
    background-color: #fff;
    position: absolute;
    top: 168px;
    left: 389px;
    z-index: 99;
    border: 1px solid $color-primary;
    border-left: none;
  }

  .nav-detail-item {
    margin-left: 26px;
    margin-top: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    color: #eee;
  }

  .nav-detail-item span {
    padding: 6px 6px 6px 12px;
    margin-left: 15px;
    font-size: 12px;
    background-color: $color-primary;
    color: #fff;
  }

  .nav-detail-item span:hover {
    margin-left: 15px;
    background-color: #fff;
    color: $color-primary;
  }

  .detail-item-panel ul {
    list-style: none;
  }

  .detail-item-panel li {
    line-height: 38px;
    margin-left: 40px;
  }

  .detail-item-title {
    padding-right: 6px;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
    color: #555555;
  }

  .detail-item-title:hover {
    color: #d9534f;
  }

  .detail-item-row a {
    color: #555555;
  }

  .detail-item {
    font-size: 14px;
    padding-left: 12px;
    padding-right: 8px;
    cursor: pointer;
    border-left: 1px solid #ccc;
  }

  .detail-item:hover {
    color: #d9534f;
  }
</style>
