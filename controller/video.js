import { executeQuery } from '../pages/api/db'
import videoValidation from '../pages/api/validateReq/video'

export async function getAllVideo(req, res) {
    try {
        const query = 'SELECT * FROM videos'
        let video = await executeQuery(query)
        res.send(video)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getVideoById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM videos WHERE id="${id}"`
        let video = await executeQuery(query)
        res.send(video)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteVideoById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from videos WHERE id="${id}"`
        let videoDada = await executeQuery(query)
        res.send(videoDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateVideoById(req, res) {
    try {
        let id = req.query.id
        const { video_link, video_text } = req.body
        let videoData = await executeQuery(`SELECT * FROM videos where id="${id}"`)
        let result = videoValidation(req.body)
        if (result.error && videoData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE videos set video_link="${video_link}", video_text="${video_text}" WHERE id="${id}"`
            let videoDada = await executeQuery(query)
            res.send(videoDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewVideo(req, res) {
    try {
        const { video_link, video_text } = req.body
        let result = videoValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let videoDada = await executeQuery(
                `INSERT INTO videos (video_link, video_text) VALUES("${video_link}","${video_text}")`
            )
            videoDada = await executeQuery(`SELECT * from videos WHERE id=${videoDada.insertId}`)
            res.send(videoDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
