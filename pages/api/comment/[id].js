import nc from 'next-connect'
import { deleteCommentById, getCommentById, upDateCommentById } from '../../../controller/comment'

const handler = nc({})

handler.get(getCommentById)
handler.delete(deleteCommentById)
handler.put(upDateCommentById)
export default handler
