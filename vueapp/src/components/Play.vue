<template>
    <div>
        <div class="album">
            <div class="album-mask" :style="{background:`url(`+albumImg+`) no-repeat center/cover`}"></div>
            <div class="album-img">
                <img :src="albumImg" alt="">
            </div>
            <div class="album-info">
                <p class="album-info-title">{{albumTitle}}</p>
                <p class="album-info-author">{{albumAuthor}}</p>
                <div class="album-info-control">
                     <div class="album-info-control-icon">
                        <i class="icon iconfont icon-shangyishou" @click="prev"></i>
                        <i class="icon iconfont icon-bofang" v-show="!isPlay" @click="play" ></i>
                        <i class="icon iconfont icon-zanting" v-show="isPlay" @click="pause"></i>
                        <i class="icon iconfont icon-xiayishou" @click="next"></i>

                </div>
                <span class="album-info-control-menu" @click='toggle'>歌单</span>
                </div>
               
            </div>

        </div>
        <div class="mask"  :style="{background:`url(`+albumImg+`) no-repeat center/cover`}"></div>
        <div class="lrc-list" ref="lrcList">
            <ul lrc-list-lrc >
                <li :class=" lrcIndex==index?'selected': ''" v-for="(lrc,index) in lrcList" :key="index" >
                    {{lrc[1]}}
                </li>
            </ul>
        </div>
        <transition name="showToggleList">
            <ul class="music-list" v-show="toggleList">
                <li :class="['music-list-item', nowIndex == index?'selected': '']" v-for="(music,index) in musicList " :key="index" @click="selected(index)">
                    <span class="music-list-item-title">{{music.title}}&nbsp;-&nbsp;</span>
                    <span class="music-list-item-author">{{music.author}}</span>1
                </li>
            </ul>
        </transition>
        
           <div class="playMusic">
               <audio :src="musicSrc" autoplay controls ref="musicAudio" @play="isPlay=true" @pause="isPlay=false"></audio>
           </div>
    </div>
</template>
<script>
import "@/assets/font/iconfont.css";
import axios from "axios";
export default{
    props:["musicList"],
    data(){
        return{
            albumImg:"http://img3.imgtn.bdimg.com/it/u=1039246244,1205520727&fm=27&gp=0.jpg",
            albumTitle:'',
            albumAuthor:'',
            isPlay:false,
            nowIndex:-1,
            musicSrc: "",
            toggleList:false,
            lrcList:[],
            lrcIndex:-1,
            

        }

    },
   
    methods: {
        selected(index){
            this.nowIndex = index;
            console.log(this.nowIndex)
        },
        play(){
            console.log(this.$refs.musicAudio)
            this.$refs.musicAudio.play();
        },
        pause(){
            console.log(this.$refs.musicAudio)
            this.$refs.musicAudio.pause();
        },
        toggle(){
            this.toggleList = !this.toggleList;
        },
        next(){
            this.nowIndex++;
            if(this.nowIndex == this.musicList.length){
                this.nowIndex = 0;
            }
        },
        prev(){
            this.nowIndex--;
            if(this.nowIndex<0){
                this.nowIndex = this.musicList.length - 1;
            }
        },
        parseLrc(text){
            let line = text.split('\n');
            //console.log(line);
            line.forEach(element => {
                 let time = element.match(/\[\d{2}:\d{2}.\d{2}\]/);
                 //console.log(time);
                 if(time != null){
                    let lrc = element.split(time)[1];//得到【“ ”，“中文”】，所以取第2个
                    let timeReg = time[0].match(/(\d{2}):(\d{2}).(\d{2})/);
                 //console.log(timeReg);
                    let timeChangeSeconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3])/1000;
                 //console.log(timeChangeSeconds)
                    this.lrcList.push([timeChangeSeconds,lrc])
                    //console.log(this.lrcList)
                 };
                
            });
        }
    },
    watch:{
        nowIndex(){
            let nowMusic = this.musicList[this.nowIndex]
            this.albumImg=nowMusic.musicImgSrc;
            this.albumTitle=nowMusic.title;
            this.albumAuthor=nowMusic.author;
            this.isPlay=false;
            this.musicSrc=nowMusic.src;
            axios.get(nowMusic.lrc).then(res=>{
            this.lrcList=[];
            this.parseLrc(res.data);
            this.lrcIndex=-1;
            console.log
            })
          
        }
    },
    mounted(){
         let musicAudio = this.$refs.musicAudio;
        musicAudio.addEventListener('timeupdate',()=>{
            let currentTime = musicAudio.currentTime;
            //console.log(currentTime);
            this.lrcList.forEach((element,index) =>{
               if(currentTime<=(element[0]) && index<this.lrcList.length){
                    this.lrcList.forEach((element,index) =>{
                         if( currentTime>element[0] ){
                            this.lrcIndex = index;
                       
                         }
                    })
                     this.$refs.lrcList.scrollTop = (this.lrcIndex-1) * 25;
                          console.log(`当前歌词`+this.lrcIndex)
                            console.log(`当前滚动高度`+this.$refs.lrcList.scrollTop)

                  
               
               }    
            
        })
    })

    }
       
    


}
    
</script>
<style lang="scss" scoped>
.album{
    display: flex;
    position: relative;
    color:white;
    text-align: center;
    &-mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(20px);
    z-index: -1;
    }
    &-img{
        flex-grow: 1;
        width: 0;
        img{
            width: 100%;
            border-radius: 50%;
        }
    }
    &-info{
        flex-grow: 2;
        width: 0;
         .icon {
          font-size: 0.5rem;
        }
    }
}
.music-list{
    position: fixed;
    bottom: 2rem;
    height: 4rem;
    width: 100%;
    background-color: #2a2929;
    overflow-y: scroll;
    z-index: 2;

    &-item{
    color: #dcdbdb;
    border-bottom: 0.02rem solid #343433;
    padding: 0.2rem; 
    }
    & .selected {
      color: #299557;
    }
}
.playMusic{
    background: #ccc;
    height: 1rem;
    position: fixed;
    bottom: 1rem;
    width: 100%;
    z-index: 3;
    & audio{
        width: 100%;

    }
}
.showToggleList{
    &-enter{
        transform: translateY(100%);
        &-to{
                transform: translateY(0);
            }
            &-active{
                transition: transform 1s ease;
            }
    }
    &-leave{
         transform: translateY(0);
    &-to {
      transform: translateY(100%);
    }
    &-active {
      transition: transform 1s ease;
    }
  
}
  
}
.mask{
     text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 2rem;
    top: 3.3rem;
    overflow-y: scroll;   
    margin-top: 1rem;
    padding-top: 1rem;
    filter: blur(30px)
}
.lrc-list{
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 2rem;
    top: 3.3rem;
    overflow-y: scroll;   
    margin-top: 1rem;
    padding-top: 1rem;
    z-index: 1;
    &-lrc{
        position: absolute;
        z-index: 3;
    }
    
    .selected{
    color: #299557;
    font-size: 120%;
  }
    }

</style>
