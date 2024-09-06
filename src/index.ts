import express, { Request, Response, NextFunction } from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
const app = express()
const port = 3000 // PORT

// Connect to database bằng đối tượng databaseService
databaseService.connect()

app.use(express.json())
app.use('/users', usersRouter)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Lỗi: ', err.message)
  res.status(400).json({ error: err.message })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
