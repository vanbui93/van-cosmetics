import nc from 'next-connect'
import { getAllMain } from '../../../controller/main'

const handler = nc({})

handler.get(getAllMain)
export default handler
