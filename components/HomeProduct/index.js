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
            if (item !== null && item.fullbox) {
                const id = item.id ? item.id : ''
                const images = item.images ? item.images : ''
                const name = item.name ? item.name : ''
                const price = item.price ? item.price : ''
                const comparePrice = item.compare_price ? item.compare_price : ''
                const newPercent = item.newBox ? item.newBox : ''
                const fullbox = item.fullbox ? item.fullbox : ''
                const promotions = item.promotions ? JSON.parse(item.promotions) : []
                const isDisplay = item.isDisplay ? item.isDisplay : ''
                arrayHomeProduct.push({
                    id: id,
                    name: name,
                    price: price,
                    comparePrice: comparePrice,
                    images: images,
                    newPercent: newPercent,
                    fullbox: fullbox,
                    promotions: promotions,
                    isDisplay: isDisplay,
                })
            }
        })

    const currentList = [...arrayHomeProduct]
    const getDulieu = (fullbox, litmits) => {
        const arrFullbox = currentList?.filter(item => {
            if (fullbox === item.fullbox) {
                return item
            }
        })

        return arrFullbox.slice(0, litmits).map((item, idx) => {
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
                        promotions={item.promotions}
                    />
                )
            )
        })
    }

    return (
        <section className='collections'>
            <div className='home-collect01 container'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                </SkeletonTheme>
                <div className='page-title' style={{ display: loading ? 'none' : undefined }}>
                    <h3>iPhone Đã sử dụng</h3>
                </div>
                <ul className='collections__list'>{getDulieu(1, 15)}</ul>
            </div>
            <div className='home-collect02 container'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                </SkeletonTheme>
                <div className='page-title' style={{ display: loading ? 'none' : undefined }}>
                    <h3>iPhone New FullBox</h3>
                </div>
                <ul className='collections__list'>{getDulieu(2, 15)}</ul>
            </div>
        </section>
    )
}

export default HomeProduct
