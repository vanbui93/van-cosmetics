import nc from 'next-connect'
import { deleteVideoById, getVideoById, upDateVideoById } from '../../../controller/video'

const handler = nc({})

handler.get(getVideoById)
handler.delete(deleteVideoById)
handler.put(upDateVideoById)
export default handler
