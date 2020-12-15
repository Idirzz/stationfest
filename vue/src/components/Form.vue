<template>
  <form @submit.prevent="addTechno">
    <label for="techno">Techno à ajouter</label>
    <br />
    <input type="text" name="techno" v-model="techToLearn" />
    <br />
    <button type="submit">Ajouter</button>
  </form>
</template>

<script>
import {ref} from 'vue';
export default {
    setup(props, ctx) {
        let techToLearn = ref("");

        let addTechno = function () {
            ctx.emit("add", techToLearn.value)
            techToLearn.value = "";
        };

        return {
            techToLearn,
            addTechno,
        };
    },
};
</script>

<style>
</style>