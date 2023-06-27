import skuValidation from '../pages/api/validateReq/sku'
import { executeQuery } from '../pages/api/db'

export async function getAllSku(req, res) {
    try {
        const query = 'SELECT * FROM skus'
        let sku = await executeQuery(query)
        res.send(sku)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getSkuById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM skus WHERE id="${id}"`
        let sku = await executeQuery(query)
        res.send(sku)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteSkuById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from skus WHERE id="${id}"`
        let skuDada = await executeQuery(query)
        res.send(skuDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateSkuById(req, res) {
    try {
        let id = req.query.id
        const { data_sku, memory } = req.body
        let skuData = await executeQuery(`SELECT * FROM skus where id="${id}"`)
        let result = skuValidation(req.body)
        if (result.error && skuData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE skus set data_sku="${data_sku}" memory="${memory}" WHERE id="${id}"`
            let skuDada = await executeQuery(query)
            res.send(skuDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewSku(req, res) {
    try {
        const { data_sku, memory } = req.body
        let result = skuValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let skuDada = await executeQuery(`INSERT INTO skus (data_sku, memory) VALUES("${data_sku}","${memory}")`)
            skuDada = await executeQuery(`SELECT * from skus WHERE id=${skuDada.insertId}`)
            res.send(skuDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
