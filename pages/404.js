import Link from 'next/link';
import styles from '../styles/404.module.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HeaderTop from '../components/HeaderNotifi';

const NotFoundPage = () => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    },4000)
  }, [])

  return (
    <>
      <div className={styles.container}>
        <h1>404 - Không tìm thấy trang</h1>
        <p>Xin lỗi, Chúng tôi không tìm thấy trang mà bạn tìm kiếm</p>
        <input
          type='search'
          className={styles.searchBox} 
          placeholder='Just a dummy search box...'
        />
        <div className={styles.links}>
          <Link href='/' className={styles.link}>
            Trang chủ
          </Link>
          <Link href='/contact' className={styles.link}>
            Liên hệ với chúng tôi
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;