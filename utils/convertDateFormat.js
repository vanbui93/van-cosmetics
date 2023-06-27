export default function convertDateFormat(mysqlStr) {
    return new Date(mysqlStr).toLocaleString('vi-VN', { timeZone: 'UTC' })
}
