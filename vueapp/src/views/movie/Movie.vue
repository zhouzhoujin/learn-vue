<template>
    <h1>Movie</h1>
</template>


<script>
export default {
       created(){
        this.$emit('switchTab','movie')
    }
}
</script>

<style lang="scss" scoped>

</style>