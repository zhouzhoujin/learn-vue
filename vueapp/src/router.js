import Vue from 'vue';
import Router from 'vue-router';
import Movie from '@/views/movie/Movie.vue';
import Music from '@/views/music/Music.vue';
import Book from '@/views/book/Book.vue';
import Photo from '@/views/photo/Photo.vue';
import MovieDetail from '@/views/movie/MovieDetail.vue'






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
    },
    {
      name:'book',
      path:'/book',
      component:Book
    },
    {
      name:'photo',
      path:'/photo',
      component:Photo
    },
    {
      path: '/moviedetail/:movieId',
      component: MovieDetail
    },

  ],
});
