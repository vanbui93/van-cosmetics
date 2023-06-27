import {
    ADD_WARANTYS_FAIL,
    ADD_WARANTYS_REQUEST,
    ADD_WARANTYS_SUCCESS,
    DELETE_WARANTYS_FAIL,
    DELETE_WARANTYS_REQUEST,
    DELETE_WARANTYS_SUCCESS,
    FETCH_WARANTYS_FAIL,
    FETCH_WARANTYS_REQUEST,
    FETCH_WARANTYS_SUCCESS,
    UPDATE_WARANTYS_FAIL,
    UPDATE_WARANTYS_REQUEST,
    UPDATE_WARANTYS_SUCCESS,
} from '../constants/waranty'

//load video
export const getWarantys = () => async dispatch => {
    try {
        dispatch({ type: FETCH_WARANTYS_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/waranty`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_WARANTYS_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_WARANTYS_FAIL,
            message: error,
        })
    }
}

//Thêm video
export const addWarantyObject = waranty => async dispatch => {
    try {
        dispatch({
            type: ADD_WARANTYS_REQUEST,
        })

        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                waranty_text: waranty.waranty_text,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/waranty`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_WARANTYS_SUCCESS,
                waranty,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_WARANTYS_FAIL,
            message: error,
        })
    }
}

//Xóa video
export const deleteWaranty = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_WARANTYS_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/waranty/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_WARANTYS_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_WARANTYS_FAIL,
            message: error,
        })
    }
}

//Update video
export const updateWaranty = waranty => async dispatch => {
    try {
        dispatch({
            type: UPDATE_WARANTYS_REQUEST,
        })

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                waranty_text: waranty.waranty_text,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/waranty/${waranty.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: UPDATE_WARANTYS_SUCCESS,
                waranty,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_WARANTYS_FAIL,
            message: error,
        })
    }
}
