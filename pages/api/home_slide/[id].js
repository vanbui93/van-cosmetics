import nc from 'next-connect'
import { deleteSlideById, getSlideById, upDateSlideById } from '../../../controller/home_slide'

const handler = nc({})

handler.get(getSlideById)
handler.delete(deleteSlideById)
handler.put(upDateSlideById)
export default handler
