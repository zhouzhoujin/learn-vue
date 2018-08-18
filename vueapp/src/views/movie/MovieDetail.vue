<template>
    <div>
        <h1>电影详情页面</h1>
        <h1>电影ID： {{$route.params.movieId}}</h1>

        <div>{{detail.title}}</div>
        <div>{{detail.summary}}</div>
        
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

