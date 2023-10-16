const express = require('express')
const app = express()
const port = 3002

app.get('/', (req, res) => {
  res.send('Hello, World')
})

app.listen(port, '0.0.0.0', () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`)
})
