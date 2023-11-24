<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
</template>
<script setup>
import router from "../router";

const id = router.currentRoute.value.params.id
</script>