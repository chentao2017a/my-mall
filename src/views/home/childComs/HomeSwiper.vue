<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import Swiper from "@/components/commmon/swiper/Swiper";
  import SwiperItem from "@/components/commmon/swiper/SwiperItem";

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad(){
        this.$emit('swiperImageLoad')
      }
    }
  }
</script>

<style scoped>

</style>
