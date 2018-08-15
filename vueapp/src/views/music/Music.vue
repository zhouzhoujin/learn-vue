<template>
    <Play :musicList="musicList"></Play>
</template>


<script>
import Play from '@/components/Play.vue';
import axios from 'axios';
export default {
    data(){
        return{
            musicList:[]
        }
    },
    components:{
        Play,
    },
       created(){
        this.$emit('switchTab','music')
        axios.get('/data/musicdata.json').then(res=>{
            this.musicList = res.data.musicData;
        })
    }
}
</script>

<style lang="scss" scoped>

</style>