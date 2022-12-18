<script>
export default {
    // props: ['open'],
    emits: ['open']
}
</script>

<template>
    <div class="backdrop" v-on:click="$emit('open')">
    </div>
</template>


<style scoped>
.backdrop {
    position: fixed;
    z-index: 12;
    background-color: rgba(66, 63, 63, 0.75);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>