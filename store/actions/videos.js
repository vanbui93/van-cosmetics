import {
    ADD_VIDEOS_FAIL,
    ADD_VIDEOS_REQUEST,
    ADD_VIDEOS_SUCCESS,
    DELETE_VIDEOS_FAIL,
    DELETE_VIDEOS_REQUEST,
    DELETE_VIDEOS_SUCCESS,
    FETCH_VIDEOS_FAIL,
    FETCH_VIDEOS_REQUEST,
    FETCH_VIDEOS_SUCCESS,
    UPDATE_VIDEOS_FAIL,
    UPDATE_VIDEOS_REQUEST,
    UPDATE_VIDEOS_SUCCESS,
} from '../constants/videos'

//load sản phẩm
export const getVideo = () => async dispatch => {
    try {
        dispatch({ type: FETCH_VIDEOS_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/video`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_VIDEOS_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_VIDEOS_FAIL,
            message: error,
        })
    }
}

//Thêm video
export const addVideoObject = video => async dispatch => {
    try {
        dispatch({
            type: ADD_VIDEOS_REQUEST,
        })

        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                video_link: video.video_link,
                video_text: video.video_text,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/video`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_VIDEOS_SUCCESS,
                video,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_VIDEOS_FAIL,
            message: error,
        })
    }
}

//Xóa video
export const deleteVideo = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_VIDEOS_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/video/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_VIDEOS_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_VIDEOS_FAIL,
            message: error,
        })
    }
}

//Update video
export const updateVideo = video => async dispatch => {
    try {
        dispatch({
            type: UPDATE_VIDEOS_REQUEST,
        })

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                video_link: video.video_link,
                video_text: video.video_text,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/video/${video.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: UPDATE_VIDEOS_SUCCESS,
                video,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_VIDEOS_FAIL,
            message: error,
        })
    }
}
