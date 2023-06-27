import nc from 'next-connect'
import { addNewPage, getAllPage } from '../../../controller/page'

const handler = nc({})

handler.get(getAllPage)
handler.post(addNewPage)
export default handler
