<template>
  <div class="goods-list" @click="itemClick">
    <img :src="showImage" alt="" @load='imgLoad'>
    <div class="text">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span><img src="~assets/img/common/collect.svg" alt=""></span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed :{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoad() {
        this.$bus.$emit('itemImgLoad')
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-list {
    width: 49%;
    padding: 2px;
  }

  .goods-list img {
    width: 100%;
    border-radius: 5px;
  }

  .text {
    width: 100%;
    text-align: center;
  }

  .text p {
    width: 90%;
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  .text span {
    display: inline-block;
    height: 18px;
  }

  .price {
    color: var(--color-tint);
  }

  .text span img {
    width: 14px;
    height: 14px;
  }

  .collect {
  }
</style>
