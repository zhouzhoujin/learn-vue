<template>
    <ul class="footer" :style="{background:footerBgColor}">
        <li v-for="(item,index) in menuList" :key="index" class="footer-menu" >
            <router-link :to="{path:item.path}" >{{item.name}}</router-link>
        </li>
    </ul>
</template>
<script>
export default{
    data(){
        return{       
        }
    },
    methods:{  
    },    
  props: ["menuList" ,"footerBgColor"]
}
    
</script>
<style lang="scss" scoped>
.footer{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1rem;
    display: flex;
    width: 100%;
    z-index: 999;
    background-color: #e54847;
    &-menu{
        flex-grow: 1;
        text-align: center;
        line-height: 1rem;
        a{
            outline: none;
            color: #ccc ;
            &.router-link-active{
             color: #fff;
        }
       
        }
    }

}


</style>

