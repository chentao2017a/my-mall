<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/commmon/navbar/NavBar";
  import CartList from "@/views/cart/childComps/CartList";
  import BottomBar from "@/views/cart/childComps/BottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "cart",
    data() {
      return {}
    },
    components: {
      NavBar,
      CartList,
      BottomBar
    },
    computed: {
      ...mapGetters(['cartCount','cartList'])
    }
  }
</script>

<style scoped>
  .nav-bar {
    color: white;
    font-weight: 700;
    background-color: var(--color-tint);
  }
</style>
