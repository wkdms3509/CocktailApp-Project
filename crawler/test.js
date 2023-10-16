const express = require('express')
const app = express()
const port = 3333

app.get('/', (req, res) => {
  res.send('Hello, World')
})

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`)
})
