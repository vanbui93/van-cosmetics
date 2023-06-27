import collectionValidation from '../pages/api/validateReq/collection'
import { executeQuery } from '../pages/api/db'

export async function getAllCollection(req, res) {
    try {
        const query = 'SELECT id, name, collection FROM collections'
        let collection = await executeQuery(query)
        res.send(collection)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getCollectionById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM collections WHERE id="${id}"`
        let collection = await executeQuery(query)
        res.send(collection)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteCollectionById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from collections WHERE id="${id}"`
        let collectionDada = await executeQuery(query)
        res.send(collectionDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateCollectionById(req, res) {
    try {
        let id = req.query.id
        const { name, collection } = req.body
        let collectionData = await executeQuery(`SELECT * FROM collections where id="${id}"`)
        let result = collectionValidation(req.body)
        if (result.error && collectionData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE collections set name="${name}", collection="${collection}" WHERE id="${id}"`
            let collectionDada = await executeQuery(query)
            res.send(collectionDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewCollection(req, res) {
    try {
        const { name, collection } = req.body
        let result = collectionValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let collectionDada = await executeQuery(
                `INSERT INTO collections (name, collection) VALUES("${name}","${collection}")`
            )
            collectionDada = await executeQuery(`SELECT * from collections WHERE id=${collectionDada.insertId}`)
            res.send(collectionDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
