import menuValidation from '../pages/api/validateReq/menu'
import { executeQuery } from '../pages/api/db'

export async function getAllMenu(req, res) {
    try {
        const query = 'SELECT id, name, link FROM menus'
        let menu = await executeQuery(query)
        res.send(menu)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getMenuById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM menus WHERE id="${id}"`
        let menu = await executeQuery(query)
        res.send(menu)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteMenuById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from menus WHERE id="${id}"`
        let menuDada = await executeQuery(query)
        res.send(menuDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateMenuById(req, res) {
    try {
        let id = req.query.id
        const { name, link } = req.body
        let menuData = await executeQuery(`SELECT * FROM menus where id="${id}"`)
        let result = menuValidation(req.body)
        if (result.error && menuData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE menus set name="${name}", link="${link}" WHERE id="${id}"`
            let menuDada = await executeQuery(query)
            res.send(menuDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewMenu(req, res) {
    try {
        const { name, link } = req.body
        let result = menuValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let menuDada = await executeQuery(`INSERT INTO menus (name, link) VALUES("${name}","${link}")`)
            menuDada = await executeQuery(`SELECT * from menus WHERE id=${menuDada.insertId}`)
            res.send(menuDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
