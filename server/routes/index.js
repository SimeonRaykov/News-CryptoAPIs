const express = require('express');
const router = express.Router();
const News = require('../models/News');

router.get('/', (req, res, next) => {
    const NEWS_COLS = ['id', 'date', 'title', 'shortDescription', 'text']
    const SORT_TYPES = ['ASC', 'DESC'];
    const DEFAULT_SORT_TYPE = 'ASC';
    const { id, date, text, shortDescription, title, orderBy, type } = req.query;
    let order = [];

    // examples 
    // news?orderBy=id&title=Aba&id=2
    // news?orderBy=title&type=desc&orderBy=shortDescription&type=asc
    // news?title=Test1&id=4&orderBy=title&type=desc&orderBy=id&type=asc

    if (orderBy && typeof orderBy !== 'string' && type && type !== 'string') {
        for (let i = 0; i < orderBy.length; i += 1) {
            let newSort = [];
            if (NEWS_COLS.includes(orderBy[i]) && SORT_TYPES.includes(type[i].toUpperCase())) {
                newSort.push(orderBy[i], type[i]);
            }
            else if (NEWS_COLS.includes(order[i])) {
                newSort.push(orderBy[i], DEFAULT_SORT_TYPE);
            }
            if (newSort.length) {
                order.push(newSort);
            }
        }
    }
    else if (orderBy && typeof orderBy === 'string') {
        let newSort = [];
        let sortType = DEFAULT_SORT_TYPE;
        if (type && typeof type === 'string' && SORT_TYPES.includes(type.toUpperCase())) {
            sortType = type;
        }
        else if (type) {
            if (SORT_TYPES.includes(type[0].toUpperCase())) {
                sortType = type[0];
            }
        }
        if (NEWS_COLS.includes(orderBy)) {
            newSort.push(orderBy, sortType.toUpperCase());
        }
        if (newSort.length) {
            order.push(newSort);
        }
    }

    let where = {};
    id ? where.id = id : '';
    date ? where.date = date : '';
    text ? where.text = text : '';
    shortDescription ? where.shortDescription = shortDescription : '';
    title ? where.title = title : '';
    News.findAll({
        where,
        order,
    }).then(function (news) {
        res.json(news);
    }).catch(err => console.log(err));
});

router.post('/', (req, res, next) => {
    const { title, date, shortDescription, text } = req.body;
    News.create({
        title, date, shortDescription, text
    }).then(() => res.sendStatus(201)).catch(err => console.log(err));
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    News.findOne({
        where: { id }
    }).then(news => {
        if (!news) return res.status(404).end();
        res.json(news);
    });
});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    News.destroy({
        where: { id }
    }).then(deletedRecord => {
        if (deletedRecord === 1) {
            res.status(200).json({ message: "Deleted successfully" });
        }
        else {
            res.status(404).json({ message: "record not found" })
        }
    });
});

router.get('/add', (req, res, next) => {
    const testNews = {
        title: 'Test1',
        date: '01-01-2020',
        shortDescription: 'asdqwe',
        text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.'
    }

    const { title, date, shortDescription, text } = testNews;

    News.create({
        title, date, shortDescription, text
    }).then(() => res.sendStatus(201)).catch(err => console.log(err));
});
 
module.exports = router; 