<template>
  <Swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </Swiper>
</template>

<script>
  import Swiper from "@/components/commmon/swiper/Swiper";
  import SwiperItem from "@/components/commmon/swiper/SwiperItem";
  export default {
    name: "DetailSwipper",
    components:{
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
