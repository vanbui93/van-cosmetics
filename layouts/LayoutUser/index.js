import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { getMain } from '../../store/actions/main'
import HeaderNotifi from '../../components/HeaderNotifi'

function LayoutUser({ children }) {
    const dispatch = useDispatch()
    const mainData = useSelector(state => state.main.data)

    const jsonMain = {
        id: mainData.id,
        page_title: mainData.page_title ? JSON.parse(mainData.page_title) : '',
        phone: mainData.phone ? JSON.parse(mainData.phone) : '',
        phone_text: mainData.phone_text ? JSON.parse(mainData.phone_text) : '',
        hotline: mainData.hotline ? JSON.parse(mainData.hotline) : '',
        logo_img: mainData.logo_img ? JSON.parse(mainData.logo_img) : '',
        logo_alt: mainData.logo_alt ? JSON.parse(mainData.logo_alt) : '',
        address: mainData.address ? JSON.parse(mainData.address) : '',
        core_content_01: mainData.core_content_01 ? JSON.parse(mainData.core_content_01) : '',
        core_content_02: mainData.core_content_02 ? JSON.parse(mainData.core_content_02) : '',
        core_content_03: mainData.core_content_03 ? JSON.parse(mainData.core_content_03) : '',
        core_content_04: mainData.core_content_04 ? JSON.parse(mainData.core_content_04) : '',
        core_title_01: mainData.core_title_01 ? JSON.parse(mainData.core_title_01) : '',
        core_title_02: mainData.core_title_02 ? JSON.parse(mainData.core_title_02) : '',
        core_title_03: mainData.core_title_03 ? JSON.parse(mainData.core_title_03) : '',
        core_title_02: mainData.core_title_02 ? JSON.parse(mainData.core_title_02) : '',
        core_title_04: mainData.core_title_04 ? JSON.parse(mainData.core_title_04) : '',
        footer_sub: mainData.footer_sub ? JSON.parse(mainData.footer_sub) : '',
        footer_title: mainData.footer_title ? JSON.parse(mainData.footer_title) : '',
        header_content: mainData.header_content ? JSON.parse(mainData.header_content) : '',
        menu_hambuger: mainData.menu_hambuger ? JSON.parse(mainData.menu_hambuger) : '',
    }

    useEffect(() => {
        dispatch(getMain())
    }, [])
    return (
        <div className='layout_user'>
            <HeaderNotifi />
            <Header headerData={jsonMain} />
            {children}
            <div className='tel'>
                <a href={`tel:${mainData.phone}`} className='tel-call'>
                    <FontAwesomeIcon icon={faPhone} style={{ fontSize: 25, color: '#fff' }} />
                </a>
            </div>
            <Footer footerData={jsonMain} />
        </div>
    )
}
export default LayoutUser
