<template>
  <div class="home wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <TabControl :titles="['流行','新款','精选']"
                @tabClick="tabClick" ref="tabControl1"
                class="tab-control" v-show="isFixed">
    </TabControl>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" @pullUpLoad="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad"></home-swiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','精选']"
                  @tabClick="tabClick" ref="tabControl2">
      </TabControl>
      <GoodsList :goods="goods[currentType].list"></GoodsList>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "@/views/home/childComs/HomeSwiper";
  import RecommendView from "@/views/home/childComs/RecommendView";
  import FeatureView from "@/views/home/childComs/FeatureView";

  import NavBar from "@/components/commmon/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import GoodListItem from "@/components/content/goods/GoodListItem";
  import Scroll from "@/components/commmon/scroll/Scroll";
  import BackTop from "@/components/content/backtop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "@/network/home";
  import {debounce} from "@/common/utils";

  export default {
    name: "home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBack: false,
        tabOffsetTop: 0,
        isFixed: false,
        saveY: 0
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      GoodListItem,
      Scroll,
      BackTop
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.scroll.refresh, 500);
      this.$bus.$on('itemImgLoad', () => {
        this.$refs.scroll.scroll && refresh();
      })
    },
    activated(){
      this.$refs.scroll.scroll.refresh()
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated(){
      this.saveY = this.$refs.scroll.scroll.y;
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position) {
        this.isShowBack = -position.y > 1000 ? true : false;
        this.isFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      //获取数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.scroll.finishPullUp();
          this.$refs.scroll.scroll.refresh();
        })
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  .home {
    /*padding-top: 44px;*/
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*z-index: 999;*/
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .tab-control {
    position: relative;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 9;
  }

</style>
