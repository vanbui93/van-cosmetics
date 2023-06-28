import { useEffect, useState } from 'react'
import ProductItem from './../../components/ProductItem'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const HomeProduct = props => {
    const { products } = props
    let data = { ...products }

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (products && Object.keys(products)?.length > 0) {
            setLoading(false)
        }
    }, [products])

    var arrayHomeProduct = []
    data !== null &&
        data !== undefined &&
        Object.values(data)?.map(item => {
            if (item !== null) {
                const id = item.id ? item.id : ''
                const images = item.images ? item.images : ''
                const name = item.name ? item.name : ''
                const price = item.price ? item.price : ''
                const comparePrice = item.compare_price ? item.compare_price : ''
                const newPercent = item.newBox ? item.newBox : ''
                const isDisplay = item.isDisplay ? item.isDisplay : ''
                arrayHomeProduct.push({
                    id: id,
                    name: name,
                    price: price,
                    comparePrice: comparePrice,
                    images: images,
                    newPercent: newPercent,
                    isDisplay: isDisplay,
                })
            }
        })

    const currentList = [...arrayHomeProduct]
    const getDulieu = (litmits) => {
        return currentList?.filter(item => item).slice(0, litmits).map((item, idx) => {
            return (
                item?.isDisplay === 1 && (
                    <ProductItem
                        key={idx}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        comparePrice={item.compare_price}
                        images={item.images}
                        newPercent={item.newPercent}
                    />
                )
            )
        })
    }

    return (
        <section className='collections'>
            <div className='home-sale container'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                </SkeletonTheme>
                <div className='home-sale-area' style={{ display: loading ? 'none' : undefined }}>
                    <h3 className='home-sale-subtit'>
                        <a href='/collections/khuyen-mai' className='home-sale-link'>
                            <img src={'/assets/img/sale-off.webp'} alt='Sản phẩm khuyến mãi'/>
                        </a>
                    </h3>
                    <div className='count-down'>
                        <span className='count-down-tit'>Thời gian còn lại</span>
                        <div className='count-down-time'>
                            <span className='count-down-date'><span className='count-down-number'>00</span> NGÀY</span>
                            <span className='count-down-hour'><span className='count-down-number'>03</span> GIỜ</span>
                            <span className='count-down-minute'><span className='count-down-number'>37</span> PHÚT</span>
                            <span className='count-down-second'><span className='count-down-number'>46</span> GIÂY</span>
                        </div>
                    </div>
                    <div className='see-all'>
                        <a className='see-all-link'>Xem tất cả</a>
                    </div>
                </div>
                <ul className='collections__list'>{getDulieu(1, 15)}</ul>
            </div>
            <div className='home-collect01 container'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                </SkeletonTheme>
                <div className='page-title' style={{ display: loading ? 'none' : undefined }}>
                    <h3>KEM CHỐNG NẮNG</h3>
                </div>
                <ul className='collections__list'>{getDulieu(1, 15)}</ul>
            </div>
            <div className='home-collect02 container'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                </SkeletonTheme>
                <div className='page-title' style={{ display: loading ? 'none' : undefined }}>
                    <h3>THỰC PHẨM CHỨC NĂNG</h3>
                </div>
                <ul className='collections__list'>{getDulieu(2, 15)}</ul>
            </div>
        </section>
    )
}

export default HomeProduct
