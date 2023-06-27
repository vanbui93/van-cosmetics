import nc from 'next-connect'
import { addNewColor, getAllColor } from '../../../controller/color'

const handler = nc({})

handler.get(getAllColor)
handler.post(addNewColor)
export default handler
