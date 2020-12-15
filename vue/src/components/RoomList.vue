<template>
    <ul class="roomparent">
        <li class="room" v-for="room in rooms" :key="room.name">
            <h1 class="item" >{{room.name}}</h1>
            <p class="item" >{{room.capacity}} places</p>
            <div v-if="room.equipements.length" class="listofequipements">
                <p>Equipements:</p>
                <p class="equipement"  v-for="equipement in room.equipements" :key="equipement.name">{{equipement.name}}</p>
            </div>
            <button class="buttonbook" @click="bookRoom(room)">Reserver</button>
        </li>
    </ul>
</template>

<script>
export default {
    props : {
        rooms : {
            type : Array,
            required : true,
        }
    },
    setup(props, {emit}) {
        let bookRoom = function (room) {
            emit("book", room)
        }
        return {
            bookRoom,
        }
    }
}
</script>

<style>
.roomparent{
    width:60%;
    padding : 0;
    padding-top:2%;
    margin-left:20%;
    margin-right:20%;
    display : flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.room{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2.5%;
    padding-top: 2.5%;
    width:32.3%;
    min-width: 32.3%;
    max-width: 32.3%;
    margin-bottom: 1%;
    flex-grow: 1;
    background-color: rgb(0, 0, 0);
    border : 1px solid rgb(255, 255, 255);
}
.listofequipements{
    margin-top:3%;
    margin-bottom: 7%;
}
.equipement{
    margin:0;
}
.buttonbook{
    background-color:black;
    display:inline-block;
    padding:0.35em 1.2em;
    border:0.1em solid #FFFFFF;
    margin:0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    font-weight:300;
    color:#ffffff;
    text-align:center;
    transition: all 0.2s;
}
.buttonbook:hover{
    color:#000000;
    background-color:#FFFFFF;
}
@media all and (max-width:30em){
    .buttonbook{
        display:block;
        margin:0.4em auto;
    }
}
</style>