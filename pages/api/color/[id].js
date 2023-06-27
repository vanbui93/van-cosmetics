import nc from 'next-connect'
import { deleteColorById, getColorById, upDateColorById } from '../../../controller/color'

const handler = nc({})

handler.get(getColorById)
handler.delete(deleteColorById)
handler.put(upDateColorById)
export default handler
