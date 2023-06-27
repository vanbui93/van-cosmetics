import nc from 'next-connect'
import { getMainById, upDateMainById } from '../../../controller/main'

const handler = nc({})

handler.get(getMainById)
handler.put(upDateMainById)
export default handler
