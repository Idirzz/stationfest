const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    id  : {
        type : String,
        required : true,
        trim : true,
    },
    date  : {
        type : String,
        required : true,
        trim : true,
    },
    hour : {
        type : Number,
        required : true,
        trim : true,
    },
});

const Book = mongoose.model("bookings", bookSchema);

module.exports = Book;