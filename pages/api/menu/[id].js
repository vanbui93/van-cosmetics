import nc from 'next-connect'
import { deleteMenuById, getMenuById, upDateMenuById } from '../../../controller/menu'

const handler = nc({})

handler.get(getMenuById)
handler.delete(deleteMenuById)
handler.put(upDateMenuById)
export default handler
