import nc from 'next-connect'
import { deletePageById, getPageById, upDatePageById } from '../../../controller/page'

const handler = nc({})

handler.get(getPageById)
handler.delete(deletePageById)
handler.put(upDatePageById)
export default handler
