<template>
    <div>
        <h2>Vue渲染出来的</h2>
        <helloWorld></helloWorld>
    </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue'
export default {
    components: {
        HelloWorld
    },
    data(){
        return {
            title: "Hello world",
            message: "蛤 update"
        }
    }
}
</script>
<style></style>