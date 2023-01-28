<template>
    <div class="vue-c">{{ message }}</div>
</template>
<script>
export default {
    data() {
        return {
            message: 'Hello, vue'
        }
    }
}
</script>
<style scoped>
.vue-c {
    color: orangered;
}
</style>