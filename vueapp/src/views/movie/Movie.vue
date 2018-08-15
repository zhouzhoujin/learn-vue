<template>
    <div>
        <ul>
            <li  class="movie" v-for="movie in movieList" :key="movie.id">
                <div class="movie-img">
                    <img :src="movie.images.large" alt="">
                </div>                
                <div class="movie-info">
                     <router-link :to="'/moviedetail/'+movie.id">
                    <div class="movie-info-title">{{movie.title}}</div>
                    </router-link>
                    <div >观众评 <span class="movie-info-average">{{movie.rating.average}}</span></div>
                    <div class="movie-info-star">主演：
                        <span v-for="item in movie.casts" :key="item.id">{{item.name}}&nbsp;</span>
                    </div>
                </div>
               
            </li>
        </ul>
        <div class="loading" v-show="isLoading">
            <img src="@/assets/img/loading.gif" alt="">
        </div>
        <div class="end" v-show="isEnd">
            <p>已经没有数据了</p>
        </div>
    </div>
</template>


<script>
import axios from "axios";
export default {
       created(){
        this.$emit('switchTab','movie')
        this.getData();

    },
    mounted(){
        window.onscroll = ()=>{
            let scrollTop = document.documentElement.scrollTop;
            let scrollHeight = document.documentElement.scrollHeight;
            let clientHeight = document.documentElement.clientHeight;
            if(scrollTop + clientHeight == scrollHeight && !this.isEnd){
                this.getData();
            };
        };
        
    },

    methods:{
        getData(){
            this.isLoading = true;
             let url1 = 'https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/in_theaters';
            let url2 = "https://api.myjson.com/bins/pb8vw";
            axios.get(url1).then(res=>{
                 /* console.log(
          res.data.subjects.slice(
            this.movieList.length,
            this.movieList.length + 5
                )
             );*/
             console.log(res)
                let getList = res.data.subjects.slice(
                    this.movieList.length,
                    this.movieList.length+5
                );
                if(getList.length<5){
                    this.isEnd = true;
                };
                this.movieList=this.movieList.concat(getList);
                 this.isLoading = false;
            })
        }

    },
    data(){
        return{
            movieList:[],
            isEnd:false,
            isLoading:true
    
        }
    }
}
</script>

<style lang="scss" scoped>
.movie {
  display: flex;
  padding: 0.2rem;
  border-bottom: 0.02rem solid #ccc;
  &-img {
    flex-grow: 1;
    width: 0;
    img {
      width: 100%;
    }
  }
  &-info {
    flex-grow: 3;
    width: 0;
    margin-left: 0.2rem;
    &-title {
      color: #333;
      font-weight: 700;
      font-size: 0.34rem;
    }
    &-average {
      font-weight: 700;
      color: #faaf00;
    }

    &-star {
      color: #666;
      font-size: 0.26rem;
    }
  }
}

.loading {
  text-align: center;
  position: fixed;
  bottom: 1rem;
  width: 100%;
  img {
    width: 3rem;
  }
}

.end {
  text-align: center;
}
</style>