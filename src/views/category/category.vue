<template>
    <div class="wrapper">
      <h2>分类</h2>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "category",
      data(){
          return{
            scroll:null
          }
      },
      mounted(){
          this.scroll = new BScroll('.wrapper',{
            probeType:3,
            pullUpLoad:true
          })
          this.scroll.on('scroll',(position)=>{
            console.log(position);
          })
          this.scroll.on('pullingUp',()=>{
              this.scroll.finishPullUp();
          })
      },
      methods:{

      }
    }
</script>

<style scoped>
</style>
