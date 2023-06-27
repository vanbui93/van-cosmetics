const mysql = require('mysql')

const pool = mysql.createConnection({
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    user: process.env.NEXT_PUBLIC_MYSQL_USER,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    port: process.env.NEXT_PUBLIC_MYSQL_PORT,
    connectionLimit: 10000,
    timezone: 'Asia/Ho_Chi_minh',
    dateStrings: ['DATE', 'DATETIME'],
})

export async function executeQuery(query) {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, function (error, results) {
                if (error) throw error
                resolve(results)
            })
        } catch (error) {
            reject(error)
        }
    })
}
