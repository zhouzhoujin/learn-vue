<template>
  <div id="app">
     <Comheader :selectTitle="selectTitle"></Comheader>
    <router-view class="content" @switchTab="switchTab"/>
    <Comfooter :footerBgColor='selectTitle.color' :menuList='menuList' ></Comfooter>
  </div>
</template>
<script>
import Comheader from '@/components/Comheader.vue';
import Comfooter from '@/components/Comfooter.vue';
export default{
  components:{
    Comheader,
    Comfooter
  },
  /*created: function () {
      this.$router.push('/movie')//创建app之前导向movie
  },*/
  methods: {   
    switchTab(menu){
      this.menuList.forEach(Element=>{
        if(Element.Ename == menu){
          this.selectTitle=Element;
        }
      })
    }
  },
  data(){
    return{
        menuList:[
              {
              name:'电影',
              color:' #e54847',
              Ename:'movie',
              path:'/movie'
            },  {
              name:'音乐',
              color:'#009688',
              Ename:'music',
              path:'/music'
            },{
                name:'测试',
                color:'#009688',
                Ename:'test',
                path:'/test'
            },
            ],
            selectTitle:{}  
    }
  }
}
</script>
<style lang="scss">
.content{
  margin: 1rem 0;
}

</style>
