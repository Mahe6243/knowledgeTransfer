const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})