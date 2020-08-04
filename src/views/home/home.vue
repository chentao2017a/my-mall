<template>
  <div class="home wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper :banners="banners"></home-swiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></TabControl>
      <GoodsList :goods="goods[currentType].list"></GoodsList>
    </scroll>
    <back-top @click.native="backClick"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "@/views/home/childComs/HomeSwiper";
  import RecommendView from "@/views/home/childComs/RecommendView";
  import FeatureView from "@/views/home/childComs/FeatureView";

  import NavBar from "@/components/commmon/navbar/NavBar";
  import TabControl from "@/components/content/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import GoodListItem from "@/components/content/goods/GoodListItem";
  import Scroll from "@/components/commmon/scroll/Scroll";
  import BackTop from "@/components/content/backtop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "@/network/home";

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
        currentType: 'pop'
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
      },
      backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0,500);
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
        })
      }
    }
  }
</script>

<style scoped>
  .home {
    padding-top: 44px;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    background-color: #fff;
  }
  .content{
    height: calc(100vh - 48px);
    overflow: hidden;
  }
</style>
