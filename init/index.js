const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../model/listing.js");

main()
    .then((res) => {
        console.log('Connected!');
    })
    .catch((err) => {
        console.log("could no found");
    });

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:"676a56ccf15d26ae7e609bf7"}));
    await Listing.insertMany(initData.data);
    console.log("successful data add");
}

initDB();