let rooms = require('./rooms.json');
let Book = require("../models/book.model");

exports.getRooms = async (req, res, next) => {
   if (!(await checkDate(req.body.data.date)))
      return res.status(400).send("Mauvaise Date");
   let filteredRooms = await getRooms(rooms.rooms, req.body.data.capacity, req.body.data.equipement, req.body.data.hour,req.body.data.date)
   return res.send(filteredRooms)
}

exports.bookRoom = async (req, res, next) => {
    const newItem = new Book({
        id : req.body.roomid,
        date : req.body.at.date,
        hour : req.body.at.hour
    });
    newItem.save()
    .then(() => res.status(200).send("Booking registered !"))
}

async function getRooms(rooms, capacity, equipement, hour, date)
{
   let ret = [];
   let find = 0;
    for (let y = 0;y < rooms.length; y++)
    {
        if (rooms[y].capacity >= capacity)
        {
            find = 0;
            for (let i = 0; equipement[i]; i++)
            {
                for (let x  = 0; x < rooms[y].equipements.length; x++)
                {
                    if (rooms[y].equipements[x].name === equipement[i])
                    {
                        find++;
                        break ;
                    }
                }
            }
            if (find === equipement.length)
            {
                await Book.find({id : rooms[y].createdAt, date, hour}).then((res)=>{
                    if (!res || !res.length)
                        ret.push(rooms[y])
                })
            }
        }

    };
    return (ret)
}

async function checkDate(str)
{
   let date = str.split('/');
   if (date.length === 3)
   {
      if (isNaN(Date.parse(date[1] + "/" + date[0] + "/" + date[2])))
         return (false)
      return (true)
   }
   return (false)
}

exports.getListEquipements = async (req, res, next) => {
    let ret = []
        rooms.rooms.forEach(room => {
            room.equipements.forEach(equipement => {
                if (ret.indexOf(equipement.name) === -1)
                    ret.push(equipement.name)
            });
        });
    res.send(ret)
}