import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { getMenu } from '../../store/actions/menu'
import { getPromotions } from '../../store/actions/promotions'
import { numberInputFormat } from '../../utils/numberInputFormat'

export default function ProductItem(props) {
    const { id, name, price, comparePrice, newPercent, images, promotions } = props
    const imgObject = JSON.parse(images)
    const allPromotions = useSelector(state => state.promotions.data)
    const mainData = useSelector(state => state.main.data)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPromotions())
    }, [])

    const img = []
    imgObject !== null &&
        imgObject !== undefined &&
        Object.values(imgObject)?.map(item => {
            if (item !== null) {
                img.push(item.img)
            }
        })

    const getPromoDefault = promoDefault => {
        const promo = []
        promoDefault !== undefined &&
            Object.values(promoDefault)?.map(item => {
                if (item !== null) {
                    promo.push(item)
                }
            })
    }

    const ckPromotionIds =
        promotions !== null &&
        promotions !== undefined &&
        promotions.length &&
        promotions?.map(item => {
            if (item !== null) {
                return item.id
            }
        })

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (Object.values(mainData)?.length > 0) {
            setLoading(false)
        }
    }, [mainData])

    return Object.values(mainData).length ? (
        <li className='collections__item'>
            <Link href={`/product/${id}`} className='collection__link'>
                <a>
                    <div className='collections__img' style={{ display: loading ? 'none' : undefined }}>
                        <img src={img[0]} alt='' />
                    </div>
                    <div className='collections__sticker'>
                        {newPercent ? (
                            <p className='collections__percent-pin'>
                                <span>new: {newPercent}%</span>
                            </p>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className='collections__info'>
                        <h4 className='collections__title' style={{ display: loading ? 'none' : undefined }}>
                            {name}
                        </h4>
                        <p className='collections__price' style={{ display: loading ? 'none' : undefined }}>
                            <strong className='collections__new-price'>
                                {price ? `${numberInputFormat(price.toString())} đ` : `Liên hệ: ${mainData?.phone}`}
                            </strong>
                            {price && comparePrice && (
                                <strike className='collections__compare-price'>
                                    {numberInputFormat(comparePrice.toString())} đ
                                </strike>
                            )}
                        </p>
                    </div>
                    {ckPromotionIds ? (
                        <div className='collections__promotion' style={{ display: loading ? 'none' : undefined }}>
                            <div className='promotion'>
                                <div className='promotion__item'>
                                    <span className='bag'>KM</span>
                                    {getPromoDefault(promotions)}
                                    <strong className='promotion__other'>
                                        VÀ {promotions ? promotions.length : ''} KM KHÁC
                                    </strong>
                                </div>
                            </div>
                            <ul className='promo-list'>
                                {allPromotions !== null &&
                                    allPromotions !== undefined &&
                                    Object.values(allPromotions)?.map((item, idx) => {
                                        if (ckPromotionIds?.includes(item.id)) {
                                            return (
                                                item && (
                                                    <li className='promo-list__item' key={idx}>
                                                        <span className='bag'>KM</span>
                                                        <span className='promotion__detail'>{item.promotion_text}</span>
                                                    </li>
                                                )
                                            )
                                        }
                                    })}
                            </ul>
                        </div>
                    ) : (
                        ''
                    )}
                </a>
            </Link>
        </li>
    ) : (
        <li className='collections__item'>
            <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                {loading && <Skeleton className='collections__img--sekeleton' />}
            </SkeletonTheme>
            <div className='collections__info'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                    {loading && <Skeleton className='collections__title--sekeleton' />}
                </SkeletonTheme>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                    {loading && <Skeleton className='collections__price--sekeleton' />}
                </SkeletonTheme>
            </div>
            <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                {loading.length > 0 && <Skeleton className='collections__promotion--sekeleton' />}
            </SkeletonTheme>
        </li>
    )
}
