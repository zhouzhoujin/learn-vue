<template>
    <div class="header" :style="{background:selectTitle.color}">
        <span class="header-home" @click="$router.push('/')">
            首页
        </span>
        <p class="header-title">
            {{selectTitle.name}}
        </p>
    </div>
</template>
<script>
export default{
    props:["selectTitle"],
   
}


    
</script>
<style lang="scss" scoped>
.header{
    width:100%;
    height: 1rem;
    background-color: #e54847;
    position: fixed;
    top: 0;
    left: 0;
    line-height: 1rem;
    z-index: 999;
    &-home{
        margin-left: 0.2rem;
    }
    &-title{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}
    
</style>