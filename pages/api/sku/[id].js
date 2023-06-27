import nc from 'next-connect'
import { deleteSkuById, getSkuById, upDateSkuById } from '../../../controller/sku'

const handler = nc({})

handler.get(getSkuById)
handler.delete(deleteSkuById)
handler.put(upDateSkuById)
export default handler
