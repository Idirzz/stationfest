<template>
    <div>
        <h3>Toutes les tech a veiller</h3>
        <ul>
            <li v-for="tech in technos" :key="tech.id">
                <button @click="editTechno(tech)">Edit</button>
                <button @click="deleteTechno(tech)">X</button>
                {{tech.techno}}
            </li>
        </ul>
        {{technos.length}} techno{{technos.length > 1 ? "s" : ""}}
    </div>
</template>

<script>
export default {
    emits : ["delete"],
    props : {
        technos : {
            type : Array,
            required : true,
        }
    },
    setup(props, {emit}) {
        let deleteTechno = function (tech) {
            emit("delete", tech)
        }
        let editTechno = function (tech) {
            emit("edit", tech)
        }
        return {
            deleteTechno,
            editTechno
        }
    }
}
</script>

<style>

</style>