import {
    ADD_COLORS_FAIL,
    ADD_COLORS_REQUEST,
    DELETE_COLORS_FAIL,
    DELETE_COLORS_REQUEST,
    DELETE_COLORS_SUCCESS,
    FETCH_COLORS_FAIL,
    FETCH_COLORS_REQUEST,
    FETCH_COLORS_SUCCESS,
    UPDATE_COLORS_FAIL,
    UPDATE_COLORS_REQUEST,
    UPDATE_COLORS_SUCCESS,
} from '../constants/colors'

//load màu
export const getColors = () => async dispatch => {
    try {
        dispatch({ type: FETCH_COLORS_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/color`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_COLORS_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_COLORS_FAIL,
            message: error,
        })
    }
}

//Thêm color
export const addColorObject = color => async dispatch => {
    try {
        dispatch({
            type: ADD_COLORS_REQUEST,
        })

        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                color_name: color.color_name,
                data_color: color.data_color,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/color`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_SKUS_SUCCESS,
                color,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_COLORS_FAIL,
            message: error,
        })
    }
}

//Xóa color
export const deleteColor = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_COLORS_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/color/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_COLORS_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_COLORS_FAIL,
            message: error,
        })
    }
}

//Update color
export const updateColor = color => async dispatch => {
    try {
        dispatch({
            type: UPDATE_COLORS_REQUEST,
        })

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                color_name: color.color_name,
                data_color: color.data_color,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/color/${color.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: UPDATE_COLORS_SUCCESS,
                color,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_COLORS_FAIL,
            message: error,
        })
    }
}
