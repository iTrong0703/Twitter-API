import { MongoClient, Db, Collection } from 'mongodb'
import 'dotenv/config'
import User from '~/models/schemas/User.schema'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learning-cluster.0adzo.mongodb.net/?retryWrites=true&w=majority&appName=learning-cluster`

class DatabaseService {
  private client: MongoClient
  private db: Db
  // Hàm khởi tạo
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  // Phương thức connect
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.error('Failed to connect to MongoDB', error)
      throw error
    }
  }

  // Các getter collections
  get users(): Collection<User> {
    return this.db.collection('users')
  }
}

// Tạo 1 đối tượng databaseService và export nó ra
const databaseService = new DatabaseService()
export default databaseService
