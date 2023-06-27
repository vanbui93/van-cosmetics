import userValidation from '../pages/api/validateReq/user'
import { executeQuery } from '../pages/api/db'

export async function getAllUser(req, res) {
    try {
        const query = 'SELECT * FROM users'
        let user = await executeQuery(query)
        res.send(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getUserById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM users WHERE id="${id}"`
        let user = await executeQuery(query)
        res.send(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteUserById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from users WHERE id="${id}"`
        let dataDelete = await executeQuery(query)
        res.send(dataDelete)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateUserById(req, res) {
    try {
        let id = req.query.id
        const { name, email, pass } = req.body
        let dataSelect = await executeQuery(`SELECT * FROM users where id="${id}"`)
        let result = userValidation(req.body)
        if (result.error && dataSelect.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE users set name="${name}", email="${email}", pass="${pass}" WHERE id="${id}"`
            let dataUpdate = await executeQuery(query)
            res.send(dataUpdate)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewUser(req, res) {
    try {
        const { name, email, pass } = req.body
        let result = userValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let dataInsert = await executeQuery(
                `INSERT INTO users (name, email, pass) VALUES("${name}","${email}","${pass}")`
            )
            dataInsert = await executeQuery(`SELECT * from users WHERE id=${userDada.insertId}`)
            res.send(dataInsert)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
