import nc from 'next-connect'
import { addNewComment, getAllComment } from '../../../controller/comment'

const handler = nc({})

handler.get(getAllComment)
handler.post(addNewComment)
export default handler
