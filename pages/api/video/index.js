import nc from 'next-connect'
import { addNewVideo, getAllVideo } from '../../../controller/video'

const handler = nc({})

handler.get(getAllVideo)
handler.post(addNewVideo)
export default handler
