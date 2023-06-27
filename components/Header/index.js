import { faArrowsRotate, faCreditCard, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { getMenu } from '../../store/actions/menu'
import { getProduct } from '../../store/actions/products'
import * as hamgugerActions from './../../store/actions/mobileMenu'
import MenuHamburger from './../MenuHamburger'
import SearchResult from './../SearchResult'

export default function Header(props) {
    const { headerData } = props
    const showhamburger = useSelector(state => state.hambuger.showhamburger)
    const menus = useSelector(state => state.menu.data)
    const products = useSelector(state => state.products?.data)
    const dispatch = useDispatch()

    const openHambugerMenu = () => {
        dispatch(hamgugerActions.showHamburger())
    }

    useEffect(() => {
        dispatch(getMenu())
    }, [])

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => {
        setShowModal(false)
    }

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = e => {
        let value = e.target.value
        setSearchTerm(value)
        setShowModal(true)
    }

    useEffect(() => {
        const results = products?.filter(item => {
            return Object.values(item).join('').toLowerCase().includes(searchTerm.toLowerCase())
        })
        setSearchResults(results)
    }, [searchTerm, products])

    const listSearch = () => {
        return (
            showModal && (
                <div>
                    <SearchResult result={searchResults} toggleModal={toggleModal} />
                </div>
            )
        )
    }

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (Object.keys(headerData)?.length > 0) {
            setLoading(false)
        }
    }, [headerData])

    const [menuLoading, setMenuLoading] = useState(true)
    useEffect(() => {
        if (Object.keys(menus)?.length > 0) {
            setMenuLoading(false)
        }
    }, [menus])

    return (
        <header>
            <div className='header'>
                <div className='container'>
                    <div className='header-inner'>
                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                            {loading && <Skeleton style={{ marginRight: '20px' }} className='logo--seleketon' />}
                        </SkeletonTheme>
                        <h1 className='logo' style={{ display: loading ? 'none' : undefined }}>
                            <Link href='/'>
                                <a>
                                    <img src={'/assets/img/logo.jpg'} alt={headerData?.logo_alt}/>
                                </a>
                            </Link>
                        </h1>
                        <div className='search'>
                            <form action='true' className='search-form'>
                                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                    {loading && <Skeleton className='search-form--seleketon' />}
                                </SkeletonTheme>
                                <input
                                    type='text'
                                    placeholder='Bạn cần tìm gì?'
                                    id='search'
                                    className='text-input'
                                    onChange={handleSearch}
                                    autoComplete='off'
                                    style={{ display: loading ? 'none' : undefined }}
                                />
                            </form>
                            {listSearch()}
                        </div>
                        <ul className='header-right'>
                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                {loading && (
                                    <Skeleton
                                        width={130}
                                        height={33}
                                        style={{ marginRight: '20px' }}
                                        containerClassName='avatar-skeleton'
                                    />
                                )}
                            </SkeletonTheme>
                            <li style={{ display: loading ? 'none' : undefined }}>
                                <a href={`tel:${headerData?.phone}`}>
                                    <span className='phone-icon'>
                                        <i className='fa fa-phone' aria-hidden='true' />
                                    </span>
                                    <span className='call'>
                                        <span className='call-phone'>
                                            <FontAwesomeIcon
                                                icon={faPhone}
                                                style={{
                                                    fontSize: 20,
                                                    color: '#333',
                                                }}
                                            />
                                        </span>
                                        <span className='call-text'>
                                            <span>{headerData?.phone_text}</span>
                                            <span className='hotline'>{headerData?.phone}</span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                {loading && (
                                    <Skeleton
                                        width={130}
                                        height={33}
                                        style={{ marginRight: '20px' }}
                                        containerClassName='avatar-skeleton'
                                    />
                                )}
                            </SkeletonTheme>
                            <li style={{ display: loading ? 'none' : undefined }}>
                                <Link href={`/page/${headerData.header_content?.header_link_01}`}>
                                    <a>
                                        <FontAwesomeIcon
                                            icon={faCreditCard}
                                            style={{ fontSize: 20, color: '#333' }}
                                        />
                                        {headerData.header_content?.header_text_01}
                                    </a>
                                </Link>
                            </li>
                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                {loading && <Skeleton width={130} height={33} containerClassName='avatar-skeleton' />}
                            </SkeletonTheme>
                            <li style={{ display: loading ? 'none' : undefined }}>
                                <Link href={`/page/${headerData.header_content?.header_link_02}`}>
                                    <a>
                                        <FontAwesomeIcon
                                            icon={faArrowsRotate}
                                            style={{ fontSize: 20, color: '#333' }}
                                        />
                                        {headerData.header_content?.header_text_02}
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='header-sp'>
                <div className='header-top'>
                    <div className='menu-hamberger'>
                        <button className='hamberger'>
                            <span className='btn-hamberger' onClick={openHambugerMenu}></span>
                        </button>
                        {showhamburger && <MenuHamburger headerData={headerData} />}
                    </div>
                    <h1 className='logo-sp'>
                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                            {loading && <Skeleton className='logo-sp--seleketon' />}
                        </SkeletonTheme>
                        <Link href='/'>
                            <a style={{ display: loading ? 'none' : undefined }}>
                                <img src={headerData?.logo_img} alt={headerData?.logo_alt} />
                            </a>
                        </Link>
                    </h1>
                    <div className='cart'>
                        <Link href='/'>
                            <a>
                                <i className='fa fa-shopping-cart' aria-hidden='true'></i>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            {menuLoading && (
                <div className='container-fluid'>
                    <div className='menu-inner'>
                        <div className='container'>
                            <div className='menu__item--seleketon'>
                                <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                    <Skeleton height={12} className='menu__link' count={4} />
                                </SkeletonTheme>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <nav className='menu'>
                <div className='container-fluid'>
                    <div className='menu-inner'>
                        <div className='container'>
                            <ul className='menu__list' style={{ display: menuLoading ? 'none' : undefined }}>
                                {menus?.length &&
                                    menus?.map((menu, idx) => {
                                        return (
                                            <li className='menu__item' key={idx}>
                                                <Link href={`/${menu.link}`}>
                                                    <a className='menu__link'> {menu.name}</a>
                                                </Link>
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='search-sp'>
                <form action='true' className='search-form'>
                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                        {loading && <Skeleton className='search-form--seleketon' />}
                    </SkeletonTheme>
                    <input
                        type='text'
                        placeholder='Bạn cần tìm gì?'
                        id='search'
                        className='text-input'
                        onChange={handleSearch}
                        autoComplete='off'
                        style={{ display: loading ? 'none' : undefined }}
                    />
                    {listSearch()}
                    <button className='search-icon'>
                        <span className='blind'>Search</span>
                        <i className='fa fa-search' aria-hidden='true' />
                    </button>
                </form>
            </div>
        </header>
    )
}
