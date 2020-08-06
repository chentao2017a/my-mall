<template>
  <div class="car-list">
    <scroll class="content">
      <cart-list-item v-for="(item,index) in cartList"
                      :key="index"
                      :itemInfo="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "@/components/commmon/scroll/Scroll";
  import CartListItem from "@/views/cart/childComps/CartListItem";
  import {mapGetters} from 'vuex'

	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem
    },
    props: {
		  product: {
		    type: Array,
        default() {
		      return []
        }
      }
    },
    computed:{
		  ...mapGetters(['cartList'])
    }
	}
</script>

<style scoped>
  .car-list{
  }
  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>

