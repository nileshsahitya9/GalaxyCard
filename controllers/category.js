const categoryWorker = require('../database/category')
exports.addCategory = async (req, res) => {
    try {

        if (!req.body.name) {
            return res.status(422).json({
                status: false,
                error: 'Category Name Required',
            });
        }

        let payload = {
            name: req.body.name,
        }
        let category = await categoryWorker.createCategory({
            ...payload
        });
        res.status(201).json({
            status: true,
            data: category,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getCategory = async (req, res) => {
    try {
        let categories = await categoryWorker.categories();
        res.status(200).json({
            status: true,
            data: categories,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.updateCategory = async (req, res) => {
    try {

        const { id, name } = req.body;
        if (!id || !name) {
            return res.status(422).json({
                status: false,
                error: 'id and name required',
            });
        }


        let category = await categoryWorker.updateCategory(id, name);
        res.status(200).json({
            status: true,
            data: category,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
exports.removeCategory = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(422).json({
                status: false,
                error: 'id required',
            });
        }
        let category = await categoryWorker.removeCategory(id)
        res.status(200).json({
            status: true,
            data: category,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}