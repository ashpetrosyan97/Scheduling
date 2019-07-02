const sequelize = require('../models').sequelize;
const Sequelize = require('../models').Sequelize;

const schedule = require('../models/schedule')(sequelize, Sequelize.DataTypes);

const create = async (req, res) => {
    const body = req.body;
    try {
        let item = await schedule.create(body);
        console.log(JSON.stringify(item));
        res.status(201).json(item);
    } catch (e) {
        res.status(401).json(e.message);
    }
};

const get = async (req, res) => {
    let id = req.query.id;
    try {
        if (id) {
            let item = await schedule.findByPk(id);
            res.status(201).json(item)
        } else {
            let items = await schedule.findAll();
            res.status(201).json(items)
        }

    } catch (e) {
        res.status(201).json(e.message)
    }
};

const remove = async (req, res) => {
    let id = req.query.id;
    try {
        if (id) {
            await schedule.destroy({where: {id}});
            res.status(201).json('Success')
        } else {
            throw new Error(`There is no schedule with id ${id}`);
        }

    } catch (e) {
        res.status(201).json(e.message)
    }
};

const edit = async (req, res) => {
    const body = req.body;
    req.checkBody('id').notEmpty();
    try {
        await req.asyncValidationErrors();
        let item = await schedule.findByPk(body.id);
        if (item) {
            let resp = await schedule.update(body, {where: {id: body.id}});
            res.status(201).json(resp);
        } else {
            throw new Error(`There is no schedule with id ${id}`);
        }
    } catch (e) {
        res.status(401).json(e.message);
    }
};


module.exports = {
    create,
    get,
    remove,
    edit
};
