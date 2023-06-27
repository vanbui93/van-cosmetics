import {
    ADD_SLIDE_FAIL,
    ADD_SLIDE_REQUEST,
    ADD_SLIDE_SUCCESS,
    DELETE_SLIDE_FAIL,
    DELETE_SLIDE_REQUEST,
    DELETE_SLIDE_SUCCESS,
    FETCH_SLIDE_IMG_FAIL,
    FETCH_SLIDE_IMG_REQUEST,
    FETCH_SLIDE_IMG_SUCCESS,
    UPDATE_SLIDE_FAIL,
    UPDATE_SLIDE_REQUEST,
    UPDATE_SLIDE_SUCCESS,
} from '../constants/slides'

//gọi api firebase
export const getSlides = () => async dispatch => {
    try {
        dispatch({ type: FETCH_SLIDE_IMG_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/home_slide`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_SLIDE_IMG_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_SLIDE_IMG_FAIL,
            message: error,
        })
    }
}

//Thêm slide
export const addSlideObject = slide => async dispatch => {
    try {
        dispatch({
            type: ADD_SLIDE_REQUEST,
        })

        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                text: slide.text,
                image_url: slide.image_url,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/home_slide`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_SLIDE_SUCCESS,
                slide,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_SLIDE_FAIL,
            message: error,
        })
    }
}

//Xóa slide
export const deleteSlide = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_SLIDE_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/home_slide/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_SLIDE_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_SLIDE_FAIL,
            message: error,
        })
    }
}

//Update slide
export const updateSlide = slide => async dispatch => {
    try {
        dispatch({
            type: UPDATE_SLIDE_REQUEST,
        })

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                text: slide.text,
                image_url: slide.image_url,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/home_slide/${slide.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: UPDATE_SLIDE_SUCCESS,
                slide,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_SLIDE_FAIL,
            message: error,
        })
    }
}
