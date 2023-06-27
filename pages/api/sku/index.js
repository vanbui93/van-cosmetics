import nc from 'next-connect'
import { addNewSku, getAllSku } from '../../../controller/sku'

const handler = nc({})

handler.get(getAllSku)
handler.post(addNewSku)
export default handler
