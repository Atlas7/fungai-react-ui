const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'dist')))

// Note: use `/*` (catch all) instead of just `/` to temporarily relieve broken link upon refreshing a route on heroku
// https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writting-manually#answer-45597445
app.get('/*', function(request, response) {
  // response.sendFile(__dirname + '/dist/index.html');
  response.sendFile(path.resolve(__dirname + '/dist/index.html'))
})

app.listen(PORT, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
))
