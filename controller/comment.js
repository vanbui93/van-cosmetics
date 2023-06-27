import commentValidation from '../pages/api/validateReq/comment'
import { executeQuery } from '../pages/api/db'

export async function getAllComment(req, res) {
    try {
        const query = 'SELECT * FROM comments'
        let comment = await executeQuery(query)
        res.send(comment)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getCommentById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM comments WHERE id="${id}"`
        let comment = await executeQuery(query)
        res.send(comment)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteCommentById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from comments WHERE id="${id}"`
        let commentDada = await executeQuery(query)
        res.send(commentDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateCommentById(req, res) {
    try {
        let id = req.query.id
        const { name, position, image, content } = req.body
        let commentData = await executeQuery(`SELECT * FROM comments where id="${id}"`)
        let result = commentValidation(req.body)
        if (result.error && commentData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE comments set name='${name}', position='${position}', image='${image}', content='${content}' WHERE id="${id}"`
            let commentDada = await executeQuery(query)
            res.send(commentDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewComment(req, res) {
    try {
        const { name, position, image, content } = req.body
        let result = commentValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let commentDada = await executeQuery(
                `INSERT INTO comments (name, position, image, content) VALUES("${name}","${position}","${image}","${content}")`
            )
            commentDada = await executeQuery(`SELECT * from comments WHERE id=${commentDada.insertId}`)
            res.send(commentDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
