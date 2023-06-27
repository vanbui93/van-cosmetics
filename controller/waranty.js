import warantyValidation from '../pages/api/validateReq/waranty'
import { executeQuery } from '../pages/api/db'

export async function getAllWaranty(req, res) {
    try {
        const query = 'SELECT * FROM warantys'
        let waranty = await executeQuery(query)
        res.send(waranty)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getWarantyById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM warantys WHERE id="${id}"`
        let waranty = await executeQuery(query)
        res.send(waranty)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteWarantyById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from warantys WHERE id="${id}"`
        let warantyDada = await executeQuery(query)
        res.send(warantyDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateWarantyById(req, res) {
    try {
        let id = req.query.id
        const { waranty_text } = req.body
        let warantyData = await executeQuery(`SELECT * FROM warantys where id="${id}"`)
        let result = warantyValidation(req.body)
        if (result.error && warantyData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE warantys set waranty_text="${waranty_text}" WHERE id="${id}"`
            let warantyDada = await executeQuery(query)
            res.send(warantyDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewWaranty(req, res) {
    try {
        const { waranty_text } = req.body
        let result = warantyValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let warantyDada = await executeQuery(`INSERT INTO warantys (waranty_text) VALUES("${waranty_text}")`)
            warantyDada = await executeQuery(`SELECT * from warantys WHERE id=${warantyDada.insertId}`)
            res.send(warantyDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
