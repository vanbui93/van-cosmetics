import {
    FETCH_MAIN_FAIL,
    FETCH_MAIN_REQUEST,
    FETCH_MAIN_SUCCESS,
    UPDATE_MAIN_FAIL,
    UPDATE_MAIN_REQUEST,
    UPDATE_MAIN_SUCCESS,
} from '../constants/main'

//gọi api firebase
export const getMain = () => async dispatch => {
    try {
        dispatch({ type: FETCH_MAIN_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/main`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_MAIN_SUCCESS,
                data: res[0],
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_MAIN_FAIL,
            message: error,
        })
    }
}

//Update main
export const updateMain = main => async dispatch => {
    try {
        dispatch({
            type: UPDATE_MAIN_REQUEST,
        })

        const dataUpdate = {
            id: JSON.stringify(main.id),
            page_title: JSON.stringify(main.page_title),
            phone: JSON.stringify(main.phone),
            phone_text: JSON.stringify(main.phone_text),
            hotline: JSON.stringify(main.hotline),
            logo_img: JSON.stringify(main.logo_img),
            logo_alt: JSON.stringify(main.logo_alt),
            address: JSON.stringify(main.address),
            core_content_01: JSON.stringify(main.core_content_01),
            core_content_02: JSON.stringify(main.core_content_02),
            core_content_03: JSON.stringify(main.core_content_03),
            core_content_04: JSON.stringify(main.core_content_04),
            core_title_01: JSON.stringify(main.core_title_01),
            core_title_02: JSON.stringify(main.core_title_02),
            core_title_03: JSON.stringify(main.core_title_03),
            core_title_04: JSON.stringify(main.core_title_04),
            footer_sub: JSON.stringify(main.footer_sub),
            footer_title: JSON.stringify(main.footer_title),
            header_content: JSON.stringify(main.header_content),
            menu_hambuger: JSON.stringify(main.menu_hambuger),
        }

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(dataUpdate),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/main/0`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: UPDATE_MAIN_SUCCESS,
                main: dataUpdate,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_MAIN_FAIL,
            message: error,
        })
    }
}
