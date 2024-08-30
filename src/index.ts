import express from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
const app = express()
const port = 3000 // PORT

// Connect to database bằng đối tượng databaseService
databaseService.connect()

app.use(express.json())
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
