import parse from 'html-react-parser'
import { useEffect, useState } from 'react'

import { faShield } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import LayoutUser from '../../layouts/LayoutUser'
import { numberInputFormat } from '../../utils/numberInputFormat'
import ProductRelated from './../../components/ProductRelated'
import ProductSlide from './../../components/ProductSlide'
import VideoReview from './../../components/VideoReview'
import { getColors } from './../../store/actions/colors'
import { getProductDetail } from './../../store/actions/productDetail'
import { getPromotions } from './../../store/actions/promotions'
import { getSkus } from './../../store/actions/skus'
import { getVideo } from './../../store/actions/videos'
import { getWarantys } from './../../store/actions/warantys'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function ProductDetail(props) {
    const [skuInvalid, setSkuInvalid] = useState(false)
    const [colorInvalid, setColorInvalid] = useState(false)
    const detailProduct = useSelector(state => state.product?.data)
    const allPromotions = useSelector(state => state.promotions.data)
    const allColor = useSelector(state => state.colors.data) //lấy từ bảng colors
    const allSku = useSelector(state => state.skus.data) //lấy từ bảng skus
    const allWarantys = useSelector(state => state.warantys.data) //lấy từ bảng warantys
    const allVideo = useSelector(state => state.videos.data) //lấy từ bảng videos
    const mainData = useSelector(state => state.main.data)
    const router = useRouter()
    const { id } = router.query

    const product = detailProduct?.length ? detailProduct[0] : []

    const parseColor = product?.colors ? JSON.parse(product.colors) : ''
    const parseSku = product?.skus ? JSON.parse(product.skus) : ''
    const parsePromotion = product?.promotions ? JSON.parse(product.promotions) : ''
    const parseWaranty = product?.warantys ? JSON.parse(product.warantys) : ''
    const parseVideo = product?.videos ? JSON.parse(product.videos) : ''
    const parseImage = product?.images ? JSON.parse(product.images) : ''

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [id])

    useEffect(() => {
        dispatch(getSkus())
    }, [])

    useEffect(() => {
        dispatch(getColors())
    }, [])

    useEffect(() => {
        dispatch(getVideo())
    }, [])

    useEffect(() => {
        dispatch(getWarantys())
    }, [])

    useEffect(() => {
        dispatch(getPromotions())
    }, [])

    const [skuSelected, setSkuSelected] = useState({})
    const [colorSelected, setColorSelected] = useState({})
    const [isSkuSelected, setIsSkuSelected] = useState('init')
    const setSkuValue = newValue => {
        setIsSkuSelected({ ...isSkuSelected, value: newValue })
    }

    const [isColorSelected, setIsColorSelected] = useState('init')
    const setColorValue = newValue => {
        setIsColorSelected({ ...isColorSelected, newValue })
    }

    //Lọc màu sắc
    let dataColor = []
    if (product && Object(product.colors).length > 0) {
        allColor &&
            Object.values(allColor).filter(el => {
                return parseColor?.some(f => {
                    if (f.id === el.id) {
                        dataColor.push(el)
                    }
                })
            })
    }

    //Lọc phiên bản sử dụng arr2.some(arr1)
    let dataSku = []
    if (product && Object(product.skus).length > 0) {
        allSku &&
            Object.values(allSku)?.filter(el => {
                return parseSku?.some(f => {
                    if (f.id === el.id) {
                        dataSku.push(el)
                    }
                })
            })
    }

    // Lọc bảo hành
    let dataWaranty = []
    if (product && Object(product.warantys).length > 0) {
        allWarantys &&
            Object.values(allWarantys)?.filter(el => {
                return parseWaranty?.some(f => {
                    if (f.id === el.id) {
                        dataWaranty.push(el)
                    }
                })
            })
    }

    // Lọc video
    let dataVideo = []
    if (product && Object(product.videos).length > 0) {
        allVideo &&
            Object.values(allVideo)?.filter(el => {
                if (el) {
                    return parseVideo?.some(f => {
                        if (f.id === el.id) {
                            dataVideo.push(el)
                        }
                    })
                }
            })
    }

    const toggleClassSku = (index, skuId) => {
        setIsSkuSelected(index)
        setSkuSelected(skuId)
    }

    const toggleClassColor = (index, colorId) => {
        setIsColorSelected(index)
        setColorSelected(colorId)
    }

    const getThumbnail = () => {
        let imgThumb = JSON.parse(product.images)
        const img = []
        Object.values(imgThumb)?.map(item => {
            if (item !== null) {
                img.push(item.img)
            }
        })
        return img[0]
    }

    //Đi tới trang giỏ hàng
    const gotoCheckout = e => {
        e.preventDefault()
        if (
            dataColor.length !== 0 &&
            dataColor.length !== 0 &&
            dataColor.length !== undefined &&
            dataColor.length !== undefined
        ) {
            if (isSkuSelected !== 'init' || isColorSelected !== 'init') {
                router.push(
                    {
                        pathname: '/checkout',
                        query: {
                            productName: product.name ? product.name : '',
                            productPrice: product.price ? product.price : '',
                            productNewBox: product.newBox ? product.newBox : '',
                            productFullBox: product.fullbox ? product.fullbox : '',
                            productSku: skuSelected ? skuSelected : [],
                            productPromotion: product.promotions ? JSON.stringify(product.promotions) : '',
                            productColor: colorSelected ? colorSelected : [],
                            productImage: getThumbnail(),
                        },
                    },
                    '/checkout'
                )
            } else {
                setSkuInvalid(true)
                setColorInvalid(true)
            }
        } else {
            router.push(
                {
                    pathname: '/checkout',
                    query: {
                        productName: product.name ? product.name : '',
                        productPrice: product.price ? product.price : '',
                        productNewBox: product.newBox ? product.newBox : '',
                        productFullBox: product.fullbox ? product.fullbox : '',
                        productPromotion: product.promotions ? JSON.stringify(product.promotions) : [],
                        productImage: getThumbnail(),
                    },
                },
                '/checkout'
            )
        }
    }

    const ckPromotionIds =
        product &&
        product.promotions?.length &&
        product.promotions !== null &&
        product.promotions !== undefined &&
        parsePromotion?.map(item => {
            if (item !== null) {
                return item.id
            }
        })

    const ckWarantyIds =
        product &&
        product.warantys?.length &&
        product.warantys !== null &&
        product.warantys !== undefined &&
        parseWaranty?.map(item => {
            if (item !== null) {
                return item.id
            }
        })

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (Object.values(product)?.length > 0) {
            setLoading(false)
        }
    }, [product])

    return (
        <div>
            <Head>
                <title>{`${product?.name}`}</title>
                <meta name='description' content={`${mainData?.page_title} - ${product?.name}`} />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <LayoutUser>
                {!loading ? (
                    <div className='product-detail'>
                        <div className='container'>
                            <BreadCrumb productName={product?.name} collection={product.collection} />
                            <h2 className='product-detail__title'>{product.name}</h2>
                            <div className='product-detail__content'>
                                <div className='product-detail__info'>
                                    <div className='product-detail__images'>
                                        <ProductSlide productImages={parseImage} />
                                    </div>
                                    <div className='product-detail__variant'>
                                        <div className='product-detail__current-price'>
                                            <strong>
                                                {product.price
                                                    ? `${numberInputFormat(product.price.toString())} đ`
                                                    : `Liên hệ : ${mainData?.phone ? mainData?.phone : ''}`}
                                            </strong>
                                            &nbsp;&nbsp; | <i>Giá đã bao gồm 10% VAT</i>
                                        </div>
                                        <p className='product-detail__free-ship'>
                                            <span>Miễn phí vận chuyển toàn quốc</span>
                                        </p>
                                        <div className='product-detail__color'>
                                            <div className='option__title'>
                                                {dataColor.length > 0 && (
                                                    <strong className='option__title'>
                                                        Lựa chọn màu
                                                        {colorInvalid && (
                                                            <span className={colorInvalid ? 'option__highlight' : ''}>
                                                                {' '}
                                                                ( vui lòng chọn màu ! )
                                                            </span>
                                                        )}
                                                    </strong>
                                                )}
                                                <ul className='color'>
                                                    {dataColor?.map((colorId, idx) => {
                                                        return (
                                                            <li
                                                                key={idx}
                                                                className={`color__item ${
                                                                    isColorSelected === idx ? 'selected' : ''
                                                                }`}
                                                                data-sku='IPN1164W'
                                                                data-id='22'
                                                                data-bestprice='12,990,000 ₫'
                                                                data-lastprice='21,990,000 ₫'
                                                                data-color='#fffc17'
                                                            >
                                                                <span
                                                                    className='color__option'
                                                                    style={{ backgroundColor: `${colorId.data_color}` }}
                                                                    onClick={() =>
                                                                        toggleClassColor(idx, colorId.data_color)
                                                                    }
                                                                >
                                                                    <span className='blind'>{colorId.data_color}</span>
                                                                </span>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='product-detail__version'>
                                            <div className='option'>
                                                {dataSku.length > 0 && (
                                                    <strong className='option__title'>
                                                        Lựa chọn dung lượng
                                                        {skuInvalid && (
                                                            <span className={skuInvalid ? 'option__highlight' : ''}>
                                                                {' '}
                                                                ( vui lòng chọn dung lượng ! )
                                                            </span>
                                                        )}
                                                    </strong>
                                                )}
                                                <ul className='option__list'>
                                                    {dataSku?.map((skuId, idx) => {
                                                        return (
                                                            <li
                                                                className={`option__item ${
                                                                    isSkuSelected === idx ? 'selected' : ''
                                                                }`}
                                                                data-sku={skuId.data_sku}
                                                                key={idx}
                                                            >
                                                                <div className='option__wrap'>
                                                                    <label className='option__label'>
                                                                        <strong
                                                                            onClick={() =>
                                                                                toggleClassSku(idx, skuId.memory)
                                                                            }
                                                                        >
                                                                            {skuId.memory}
                                                                        </strong>
                                                                    </label>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        {ckPromotionIds ? (
                                            <div className='product-detail__promotion'>
                                                <strong>KHUYẾN MÃI</strong>
                                                <ul className='promotion'>
                                                    {allPromotions !== null &&
                                                        allPromotions !== undefined &&
                                                        Object.values(allPromotions)?.map((ckPromotion, idx) => {
                                                            if (ckPromotionIds?.includes(ckPromotion.id)) {
                                                                return (
                                                                    <li className='promotion__item' key={idx}>
                                                                        <span className='bag'>KM {idx}</span>
                                                                        <span className='promotion__detail'>
                                                                            {ckPromotion.promotion_text}
                                                                        </span>
                                                                        <Link href='/xem-them-khuyen-mai'>
                                                                            <a className='promotion__link'>
                                                                                Xem thêm&gt;&gt;
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            }
                                                        })}
                                                </ul>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <div className='product-detail__purchase'>
                                            <div className='purchase'>
                                                <button
                                                    className='purchase__link'
                                                    data-sku='IPN11128G'
                                                    onClick={e => gotoCheckout(e)}
                                                >
                                                    <strong className='purchase__action'>MUA NGAY</strong>
                                                    <span> Giao tận nhà (COD) hoặc Nhận tại cửa hàng</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-detail__waranty'>
                                        <div className='waranty'>
                                            <h4 className='waranty__title'>Thông tin sản phẩm</h4>
                                            <div className='warranty__info'>
                                                {allWarantys?.map((item, idx) => {
                                                    if (ckWarantyIds?.includes(item.id)) {
                                                        return (
                                                            <div className='waranty__item' key={idx}>
                                                                <span className='waranty__icon'>
                                                                    <FontAwesomeIcon
                                                                        icon={faShield}
                                                                        style={{ color: '#515154' }}
                                                                    />
                                                                    <i className='fa fa-shield' aria-hidden='true'></i>
                                                                </span>
                                                                <p className='waranty__detail'>
                                                                    {parse(item.waranty_text)}
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                })}
                                                <div className='waranty__item waranty__item--more'>
                                                    <Link href={'/page/chinh-sach-bao-hanh'}>
                                                        <a>
                                                            <br />
                                                            Xem chi tiết
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='product-detail__related'>
                                    <div className='page-title'>
                                        <h3>Gợi ý cho bạn</h3>
                                    </div>
                                    <ProductRelated productCollection={product.collection} />
                                </div>
                                <VideoReview dataVideo={dataVideo} productName={product.name} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='product-detail' style={{ padding: 20 }}>
                        <div className='container'>
                            <ul style={{ display: 'flex' }}>
                                <li>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                        {loading && <Skeleton width={90} style={{ marginRight: '10px' }} />}
                                    </SkeletonTheme>
                                </li>
                                /
                                <li>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                        {loading && <Skeleton width={90} style={{ marginRight: '10px' }} />}
                                    </SkeletonTheme>
                                </li>
                                /
                                <li>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                        {loading && <Skeleton width={200} style={{ marginRight: '10px' }} />}
                                    </SkeletonTheme>
                                </li>
                            </ul>
                            <h2 className='product-detail__title'>
                                <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                    {loading && <Skeleton className='product-detail__title--seleketon' />}
                                </SkeletonTheme>
                            </h2>
                            <div className='product-detail__content'>
                                <div className='product-detail__info'>
                                    <div className='product-detail__images product-detail__images--seleketon'>
                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                            {loading && <Skeleton className='product-slide--seleketon' />}
                                        </SkeletonTheme>
                                        <ul style={{ display: 'flex', padding: '10px 0' }}>
                                            <li>
                                                <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                    {loading && (
                                                        <Skeleton
                                                            width={63}
                                                            height={63}
                                                            style={{ marginRight: '10px' }}
                                                        />
                                                    )}
                                                </SkeletonTheme>
                                            </li>
                                            <li>
                                                <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                    {loading && (
                                                        <Skeleton
                                                            width={63}
                                                            height={63}
                                                            style={{ marginRight: '10px' }}
                                                        />
                                                    )}
                                                </SkeletonTheme>
                                            </li>
                                            <li>
                                                <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                    {loading && <Skeleton width={63} height={63} />}
                                                </SkeletonTheme>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='product-detail__variant'>
                                        <div className='product-detail__current-price' style={{ display: 'flex' }}>
                                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                {loading && (
                                                    <Skeleton
                                                        className='product-detail__current-price--seleketon'
                                                        style={{
                                                            marginRight: '10px',
                                                        }}
                                                    />
                                                )}
                                            </SkeletonTheme>
                                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                {loading && (
                                                    <Skeleton className='product-detail__current-price--seleketon' />
                                                )}
                                            </SkeletonTheme>
                                        </div>
                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                            {loading && <Skeleton height={40} />}
                                        </SkeletonTheme>
                                        <div className='product-detail__color'>
                                            <div className='option__title'>
                                                <strong className='option__title'>
                                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                        {loading && (
                                                            <Skeleton width={120} style={{ marginRight: '10px' }} />
                                                        )}
                                                    </SkeletonTheme>
                                                </strong>
                                                <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                    {loading && (
                                                        <Skeleton
                                                            style={{
                                                                width: '30px',
                                                                height: '30px',
                                                                borderRadius: '50%',
                                                            }}
                                                        />
                                                    )}
                                                </SkeletonTheme>
                                            </div>
                                        </div>
                                        <div className='product-detail__version'>
                                            <div className='option'>
                                                <strong className='option__title'>
                                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                        {loading && (
                                                            <Skeleton width={120} style={{ marginRight: '10px' }} />
                                                        )}
                                                    </SkeletonTheme>
                                                </strong>
                                                <div style={{ display: 'flex' }}>
                                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                        {loading && (
                                                            <Skeleton
                                                                style={{
                                                                    width: '70px',
                                                                    height: '37px',
                                                                    borderRadius: '4px',
                                                                    marginRight: '10px',
                                                                }}
                                                            />
                                                        )}
                                                    </SkeletonTheme>
                                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                        {loading && (
                                                            <Skeleton
                                                                style={{
                                                                    width: '70px',
                                                                    height: '37px',
                                                                    borderRadius: '4px',
                                                                }}
                                                            />
                                                        )}
                                                    </SkeletonTheme>
                                                </div>
                                            </div>
                                        </div>
                                        {ckPromotionIds ? (
                                            <div className='product-detail__promotion'>
                                                <strong>
                                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                        {loading && (
                                                            <Skeleton width={90} style={{ marginRight: '10px' }} />
                                                        )}
                                                    </SkeletonTheme>
                                                </strong>
                                                <ul className='promotion'>
                                                    <li className='promotion__item' style={{ display: 'flex' }}>
                                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                            {loading && (
                                                                <Skeleton width={30} style={{ marginRight: '10px' }} />
                                                            )}
                                                        </SkeletonTheme>
                                                        <span className='promotion__detail'>
                                                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                                {loading && (
                                                                    <Skeleton
                                                                        style={{ marginRight: '10px' }}
                                                                        className='promotion__detail--seleketon'
                                                                    />
                                                                )}
                                                            </SkeletonTheme>
                                                        </span>
                                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                            {loading && (
                                                                <Skeleton width={90} style={{ marginRight: '10px' }} />
                                                            )}
                                                        </SkeletonTheme>
                                                    </li>
                                                    <li className='promotion__item' style={{ display: 'flex' }}>
                                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                            {loading && (
                                                                <Skeleton width={30} style={{ marginRight: '10px' }} />
                                                            )}
                                                        </SkeletonTheme>
                                                        <span className='promotion__detail'>
                                                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                                {loading && (
                                                                    <Skeleton
                                                                        style={{ marginRight: '10px' }}
                                                                        className='promotion__detail--seleketon'
                                                                    />
                                                                )}
                                                            </SkeletonTheme>
                                                        </span>
                                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                            {loading && (
                                                                <Skeleton width={90} style={{ marginRight: '10px' }} />
                                                            )}
                                                        </SkeletonTheme>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <div className='product-detail__purchase'>
                                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                {loading && (
                                                    <Skeleton
                                                        height={46}
                                                        className='product-detail__purchase--seleketon'
                                                    />
                                                )}
                                            </SkeletonTheme>
                                        </div>
                                    </div>
                                    <div className='product-detail__waranty'>
                                        <div className='waranty'>
                                            <h4 className='waranty__title'>
                                                <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                    {loading && <Skeleton height={20} />}
                                                </SkeletonTheme>
                                            </h4>
                                            <div className='warranty__info'>
                                                <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                    {loading && <Skeleton height={46} />}
                                                </SkeletonTheme>
                                                <div
                                                    className='waranty__item waranty__item--more'
                                                    style={{ marginTop: 20 }}
                                                >
                                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                                        {loading && <Skeleton width={100} height={20} />}
                                                    </SkeletonTheme>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </LayoutUser>
        </div>
    )
}
