const mongoose = require("mongoose");
const { News } = require("./news.model.js")
mongoose.Promise = global.Promise;

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
} = process.env;

const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
const db = {
    mongoose: mongoose,
    url: url
};

module.exports = db;
