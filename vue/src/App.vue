<template>
    <div>
        <h1 class="title">Salles</h1>
        <FormRoom @search="searchRooms" :equipements="state.listEquipements"/>
        <p>{{state.errmessage}}</p>
        <RoomList :rooms="state.rooms" @book="bookRoom" />
        
    </div>
</template>

<script>
import axios from 'axios'
import RoomList from "./components/RoomList"
import FormRoom from "./components/FormRoom"
import { onMounted, reactive } from 'vue'

export default {
    name: 'App',
    components: {
        FormRoom,
       // RoomList
    },
    setup() {
        // TODO :   BACK :      RESERVATION ONCLICK AVEC DATE + HEURE DANS UN JSON
        //                      ENLEVER LES ROOMS RESERVÉE
        //          FRONT :     LITTLE DESIGN
        const state = reactive({
            listEquipements: [],
            rooms : [],
            errmessage : "",
            search : null,
        });
        onMounted(async () => {
            const equipementRes = await axios.get("http://localhost:3001/getEquipements");
            state.listEquipements = equipementRes.data;
        });
        const bookRoom = function (room){ // WIP, quand on appui sur le bouton X d'une room
            for (let i = 0; i < state.rooms.length; i++)
            {
                if (room.createdAt === state.rooms[i].createdAt)
                {
                    state.rooms.splice(i, 1);
                    break ;
                }
            }
            axios.post("http://localhost:3001/bookRoom", {roomid : room.createdAt, at : {date : state.search.date, hour : state.search.hour }})
            state.rooms.splice(state.rooms.indexOf(), 0);
        };
        const searchRooms = async function (data){
            try {
                state.search = data;
                const response = await axios.post("http://localhost:3001/postRooms", {data})
                state.rooms = response.data
                state.errmessage = "";
            } catch (err) {
                state.errmessage = "Probleme de date";
            }

        };
        return {
            state,
            bookRoom,
            RoomList,
            searchRooms,
        }
    }
}
</script>

<style>
body {
    background-color: rgb(0, 0, 0);
    margin:0;

}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ffffff;
}
.title{
    background-color:white;
    color:black;
    margin-top:0px;
    margin-bottom:0px;
    padding-top:50px;
    padding-bottom: 50px;
}
ul {
    list-style: none;
}
</style>
