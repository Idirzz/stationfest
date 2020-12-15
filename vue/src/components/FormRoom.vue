<template>
  <form class="parent" @submit.prevent>
        Capacité minimum
        <div class="item">
            <button class="qtybutton" @click="(minCapacity > 0 ) ? minCapacity-- : minCapacity">-</button>
            <input v-on:input="minCapacity = $event.target.value" type="text" :value="minCapacity" />
            <button class="qtybutton" @click="(minCapacity < 500 ) ? minCapacity++ : minCapacity">+</button>
        </div>
        <label>Date </label><input placeholder="JJ/MM/YYYY" v-on:input="date = $event.target.value" type="text" :value="date" style="margin-bottom:10px;" />
        <div class="item">
        à <select @change="selectedHour = $event.target.value">
            <option selected key="0" value='0'>00</option>
            <option key="1" value='1'>01</option>
            <option key="2" value='2'>02</option>
            <option key="3" value='3'>03</option>
            <option key="4" value='4'>04</option>
            <option key="5" value='5'>05</option>
            <option key="6" value='6'>06</option>
            <option key="7" value='7'>07</option>
            <option key="8" value='8'>08</option>
            <option key="9" value='9'>09</option>
            <option key="10" value='10'>10</option>
            <option key="11" value='11'>11</option>
            <option key="12" value='12'>12</option>
            <option key="13" value='13'>13</option>
            <option key="14" value='14'>14</option>
            <option key="15" value='15'>15</option>
            <option key="16" value='16'>16</option>
            <option key="17" value='17'>17</option>
            <option key="18" value='18'>18</option>
            <option key="19" value='19'>19</option>
            <option key="20" value='20'>20</option>
            <option key="21" value='21'>21</option>
            <option key="22" value='22'>22</option>
            <option key="22" value='23'>23</option>
        </select>
            heure
        </div>
        <ul class="listofequipement">
            <li class="equipement" v-for="equipement in equipements" :key="equipement">
                <input class="test" @click="clickEquipement(equipement)" type="checkbox" :name="equipement" value="TOPKEK" /><label :for="equipement">{{equipement}}</label>
            </li>
        </ul>

        <input class="buttonsearch" @click="searchRooms()" type="button" value="recherche" />
  </form>
</template>

<script>
import {ref} from "vue"
export default {
    props : {
        equipements : {
            type : Array,
            required : true,
        }
    },
    setup(props, {emit}) {
        let selected = [];
        let minCapacity = ref(0);
        let selectedHour = ref(0);
        let date = ref("");
        let clickEquipement = function (equipement) { // On ajoute / suppr du tableau des equipements recherché quand cliqué
            if (selected.indexOf(equipement) !== -1)
                selected.splice(selected.indexOf(equipement) , 1)
            else if (selected.indexOf(equipement) === -1)
                selected.push(equipement)
        }
        let searchRooms = function () { // validation du form on envoi au parent la recherche
            emit("search", {
                "capacity" : minCapacity.value,
                "equipement" : selected,
                "hour" : parseInt(selectedHour.value),
                "date" : date.value,
            })
        }
        return {
            clickEquipement,
            minCapacity,
            searchRooms,
            selectedHour,
            date
        }
    }
}
</script>

<style>
form{
    background-color: white;
    color:black;
    padding-bottom: 50px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
}
.item{
    margin-bottom: 20px;
}
input[type=text], .qtybutton, select{
    border: 1px solid black;
    padding:5px;
    border-radius: 0;
}
input[type=text]{
    text-align:center;
}
.listofequipement{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.equipement{
    align-self: flex-start;
}
.buttonsearch{
    background-color:rgb(255, 255, 255);
    display:inline-block;
    padding:0.35em 1.2em;
    border:0.1em solid #000000;
    margin:0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    font-weight:300;
    color:#000000;
    text-align:center;
    transition: all 0.2s;
}
.buttonsearch:hover{
    color:#ffffff;
    background-color:#000000;
}
@media all and (max-width:30em){
    .buttonsearch{
        display:block;
        margin:0.4em auto;
    }
}
</style>