import colorValidation from '../pages/api/validateReq/color'
import { executeQuery } from '../pages/api/db'

export async function getAllColor(req, res) {
    try {
        const query = 'SELECT * FROM colors'
        let color = await executeQuery(query)
        res.send(color)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getColorById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM colors WHERE id="${id}"`
        let color = await executeQuery(query)
        res.send(color)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteColorById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from colors WHERE id="${id}"`
        let colorDada = await executeQuery(query)
        res.send(colorDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateColorById(req, res) {
    try {
        let id = req.query.id
        const { data_color, color_name } = req.body
        let colorData = await executeQuery(`SELECT * FROM colors where id="${id}"`)
        let result = colorValidation(req.body)
        if (result.error && colorData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE colors set data_color="${data_color}", color_name="${color_name}" WHERE id="${id}"`
            let colorDada = await executeQuery(query)
            res.send(colorDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewColor(req, res) {
    try {
        const { data_color, color_name } = req.body
        let result = colorValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let colorDada = await executeQuery(
                `INSERT INTO colors (data_color, color_name) VALUES("${data_color}","${color_name}")`
            )
            colorDada = await executeQuery(`SELECT * from colors WHERE id=${colorDada.insertId}`)
            res.send(colorDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
