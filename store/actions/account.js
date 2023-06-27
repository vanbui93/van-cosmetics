import {
    ADD_USER_FAIL,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    FETCH_ACCOUNT_FAIL,
    FETCH_ACCOUNT_REQUEST,
    FETCH_ACCOUNT_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
} from '../constants/account'

//gọi api firebase
export const getUser = () => async dispatch => {
    try {
        dispatch({ type: FETCH_ACCOUNT_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/user`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: FETCH_ACCOUNT_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_ACCOUNT_FAIL,
            message: error,
        })
    }
}

//Thêm user
export const addAccoutObject = user => async dispatch => {
    try {
        dispatch({
            type: ADD_USER_REQUEST,
        })

        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                pass: user.pass,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/user`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_USER_SUCCESS,
                user,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_USER_FAIL,
            message: error,
        })
    }
}

//Xóa user
export const deleteUser = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_USER_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_USER_FAIL,
            message: error,
        })
    }
}

//Update user
export const updateUser = user => async dispatch => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST,
        })

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: user.name,
                pass: user.pass,
                email: user.email,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: UPDATE_USER_SUCCESS,
                user,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_USER_FAIL,
            message: error,
        })
    }
}
