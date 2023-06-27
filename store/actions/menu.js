import {
    ADD_MENUS_FAIL,
    ADD_MENUS_REQUEST,
    ADD_MENUS_SUCCESS,
    DELETE_MENUS_FAIL,
    DELETE_MENUS_REQUEST,
    DELETE_MENUS_SUCCESS,
    FETCH_MENUS_FAIL,
    FETCH_MENUS_REQUEST,
    FETCH_MENUS_SUCCESS,
    UPDATE_MENUS_FAIL,
    UPDATE_MENUS_REQUEST,
    UPDATE_MENUS_SUCCESS,
} from '../constants/menus'

//gọi api firebase
export const getMenu = () => async dispatch => {
    try {
        dispatch({ type: FETCH_MENUS_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/menu`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_MENUS_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_MENUS_FAIL,
            message: error,
        })
    }
}

//Thêm menu
export const addMenuObject = menu => async dispatch => {
    try {
        dispatch({
            type: ADD_MENUS_REQUEST,
        })

        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: menu.name,
                link: menu.link,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/menu`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_MENUS_SUCCESS,
                menu,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_MENUS_FAIL,
            message: error,
        })
    }
}

//Xóa menu
export const deleteMenu = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_MENUS_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/menu/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_MENUS_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_MENUS_FAIL,
            message: error,
        })
    }
}

//Update menu
export const updateMenu = menu => async dispatch => {
    try {
        dispatch({
            type: UPDATE_MENUS_REQUEST,
        })

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: menu.name,
                link: menu.link,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/menu/${menu.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: UPDATE_MENUS_SUCCESS,
                menu,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_MENUS_FAIL,
            message: error,
        })
    }
}
