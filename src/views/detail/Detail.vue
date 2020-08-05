<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swipper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="goods"/>
    </Scroll>
    <detail-bottom-bar/>
    <back-top @click.native="backTop" v-show="showBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/Comps/DetailNavBar";
  import DetailSwipper from "@/views/detail/Comps/DetailSwipper";
  import DetailBaseInfo from "@/views/detail/Comps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/Comps/DetailShopInfo";
  import DetailGoodsInfo from "@/views/detail/Comps/DetailGoodsInfo";
  import DetailParamInfo from "@/views/detail/Comps/DetailParamInfo";
  import DetailCommentInfo from "@/views/detail/Comps/DetailCommentInfo";
  import GoodsList from "@/components/content/goods/GoodsList";
  import DetailBottomBar from "@/views/detail/Comps/DetailBottomBar";

  import Scroll from "@/components/commmon/scroll/Scroll";
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "@/network/detail";
  import {debounce} from "@/common/utils";
  import {backTopMixin} from "@/common/mixin";

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwipper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    data() {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTop: null,
      }
    },
    mixins : [backTopMixin],
    created() {
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        console.log(res);
        let data = res.result;
        this.topImages = res.result.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
        this.getThemeTop = debounce(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.goods.$el.offsetTop - 44)
          this.themeTopYs.push(Number.MAX_VALUE)
          console.log(this.themeTopYs);
        })

      })
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.scroll.refresh()
        this.getThemeTop()
      },
      titleClick(index) {
        this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 1000)
      },
      contentScroll(position) {
         this.showBackTop = -position.y > 1000 ? true : false;

        const positionY = -position.y
        for (let i = 0; i < this.themeTopYs.length - 1; i++) {
          if (this.$refs.nav.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i + 1])) {
            this.$refs.nav.currentIndex = i
          }
        }
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 99;
    background-color: white;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 999;
    background-color: white;
  }

  .content {
    height: calc(100vh - 96px);
  }
</style>
