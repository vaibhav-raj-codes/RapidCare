const mongoose = require("mongoose");
const initData = require("./dummyData.js");
const Database = require("../models/componentDbSchema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/rapidcare";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    console.log("Initializing database...");
    await Database.deleteMany({});
    console.log("Deleted old data");
    await Database.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();
