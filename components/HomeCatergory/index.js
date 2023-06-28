import React from 'react'

export default function HomeCatergory() {
  return (
    <div className='home-categories'>
        <ul className='home-categories-list'>
            <li className='home-categories-item'>
                <a href="/collections/kem-chong-nang" className='home-categories-link'>
                    <span className='home-categories-img'>
                        <img src={'/assets/img/kem-chong-nang.png'} alt='Kem chống nắng'/>
                    </span>
                    <span className='home-categories-title'>Kem chống nắng</span>
                </a>
            </li>
            <li className='home-categories-item'>
                <a href="/collections/sua-rua-mat" className='home-categories-link'>
                    <span className='home-categories-img'>
                        <img src={'/assets/img/sua-rua-mat.png'} alt='Sửa rửa mặt'/>
                    </span>
                    <span className='home-categories-title'>Sữa rửa mặt</span>
                </a>
            </li>
            <li className='home-categories-item'>
                <a href="/collections/duong-am" className='home-categories-link'>
                    <span className='home-categories-img'>
                        <img src={'/assets/img/duong-am.png'} alt='Dưỡng ẩm'/>
                    </span>
                    <span className='home-categories-title'>Dưỡng ẩm</span>
                </a>
            </li>
            <li className='home-categories-item'>
                <a href="/collections/kem-chong-nang" className='home-categories-link'>
                    <span className='home-categories-img'>
                        <img src={'/assets/img/nuoc-tay-trang.png'} alt='Tẩy trang'/>
                    </span>
                    <span className='home-categories-title'>Tẩy trang</span>
                </a>
            </li>
            <li className='home-categories-item'>
                <a href="/collections/nuoc-hoa-hong" className='home-categories-link'>
                    <span className='home-categories-img'>
                        <img src={'/assets/img/nuoc-hoa-hong.png'} alt='Nước hoa hồng'/>
                    </span>
                    <span className='home-categories-title'>Nước hoa hồng</span>
                </a>
            </li>
            <li className='home-categories-item'>
                <a href="/collections/tay-te-bao-chet" className='home-categories-link'>
                    <span className='home-categories-img'>
                        <img src={'/assets/img/tay-te-bao-chet.png'} alt='Tẩy tế bào chết'/>
                    </span>
                    <span className='home-categories-title'>Tẩy tế bào chết</span>
                </a>
            </li>
            <li className='home-categories-item'>
                <a href="/collections/mat-na" className='home-categories-link'>
                    <span className='home-categories-img'>
                        <img src={'/assets/img/mat-na.png'} alt='Mặt nạ'/>
                    </span>
                    <span className='home-categories-title'>Mặt nạ</span>
                </a>
            </li>
            <li className='home-categories-item'>
                <a href="/collections/thuc-pham-chuc-nang" className='home-categories-link'>
                    <span className='home-categories-img'>
                        <img src={'/assets/img/thuc-pham-chuc-nang.png'} alt='Thực phẩm chức năng'/>
                    </span>
                    <span className='home-categories-title'>Thực phẩm<br/> Chức năng</span>
                </a>
            </li>
        </ul>
    </div>
  )
}
