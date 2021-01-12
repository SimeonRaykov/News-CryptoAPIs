const Sequelize = require('sequelize');
const db = require('../db/index');

const News = db.define('news', {
    title: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATEONLY
    },
    shortDescription: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.TEXT
    },
});

News.sync().then(() => {
  //  console.log('News table created');
});
module.exports = News;