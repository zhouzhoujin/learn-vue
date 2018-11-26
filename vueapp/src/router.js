import Vue from 'vue';
import Router from 'vue-router';
import Movie from '@/views/movie/Movie.vue';
import Music from '@/views/music/Music.vue';
import MovieDetail from '@/views/movie/MovieDetail.vue';
import Test from '@/views/test/test.vue'






Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect:'/movie'
    },
    {
      name:'movie',
      path:'/movie',
      component:Movie,
      
    },
    {
      name:'music',
      path:'/music',
      component:Music
    },{
          name:'test',
          path:'/test',
          component:Test
      },
    {
        path: '/moviedetail/:movieId',
        name:'moviedetail',
        component: MovieDetail
    },

  ],
});
