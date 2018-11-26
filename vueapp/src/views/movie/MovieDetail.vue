<template>
    <div class="detil">
        <p class="detile-name">电影详情页面</p>


        <div class="detile-title">电影名：{{detail.title}}</div>
        <div class="detile-content"><p>内容简介：</p>
            {{detail.summary}}
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
export default {
    data () {
        return {
            detail: {}
        }
    },
    created(){
       
        let url = `https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/subject/${this.$route.params.movieId}`;
         axios.get(url).then(res=>{
             this.detail = res.data;
         });
        
    }
}
</script>
<style lang="scss" scoped>
    .detile{
        &-name{
            text-align: center;
            font-size: 0.5rem;
         }
        &-title{
            font-size: 0.4rem;
            color: #729d91;

        }

    }
</style>

