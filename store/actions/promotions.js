import {
    ADD_PROMOTIONS_FAIL,
    ADD_PROMOTIONS_REQUEST,
    ADD_PROMOTIONS_SUCCESS,
    DELETE_PROMOTIONS_FAIL,
    DELETE_PROMOTIONS_REQUEST,
    DELETE_PROMOTIONS_SUCCESS,
    FETCH_PROMOTIONS_FAIL,
    FETCH_PROMOTIONS_REQUEST,
    FETCH_PROMOTIONS_SUCCESS,
    UPDATE_PROMOTIONS_FAIL,
    UPDATE_PROMOTIONS_REQUEST,
    UPDATE_PROMOTIONS_SUCCESS,
} from './../constants/promotions'

//load khuyến mãi
export const getPromotions = () => async dispatch => {
    try {
        dispatch({ type: FETCH_PROMOTIONS_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/promotion`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_PROMOTIONS_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_PROMOTIONS_FAIL,
            message: error,
        })
    }
}

//Thêm khuyến mãi
export const addPromotionObject = promotion => async dispatch => {
    try {
        dispatch({
            type: ADD_PROMOTIONS_REQUEST,
        })

        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                promotion_text: promotion.promotion_text,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/promotion`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_PROMOTIONS_SUCCESS,
                promotion,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_PROMOTIONS_FAIL,
            message: error,
        })
    }
}

//Xóa khuyến mãi
export const deletePromotion = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_PROMOTIONS_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/promotion/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_PROMOTIONS_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_PROMOTIONS_FAIL,
            message: error,
        })
    }
}

//Update promotion
export const updatePromotion = promotion => async dispatch => {
    try {
        dispatch({
            type: UPDATE_PROMOTIONS_REQUEST,
        })

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                promotion_text: promotion.promotion_text,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/promotion/${promotion.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: UPDATE_PROMOTIONS_SUCCESS,
                promotion,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_PROMOTIONS_FAIL,
            message: error,
        })
    }
}
