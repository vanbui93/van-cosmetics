import nc from 'next-connect'
import { deleteWarantyById, getWarantyById, upDateWarantyById } from '../../../controller/waranty'

const handler = nc({})

handler.get(getWarantyById)
handler.delete(deleteWarantyById)
handler.put(upDateWarantyById)
export default handler
