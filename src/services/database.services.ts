import { MongoClient, Db, Collection } from 'mongodb'
import 'dotenv/config'
import User from '~/models/schemas/User.schema'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learning-cluster.0adzo.mongodb.net/?retryWrites=true&w=majority&appName=learning-cluster`

class DatabaseService {
  private client: MongoClient
  private db?: Db // Để db có thể là undefined cho đến khi kết nối thành công

  // Hàm khởi tạo
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  // Phương thức connect
  async connect() {
    try {
      // Kết nối đến MongoDB
      await this.client.connect()

      // Khởi tạo db sau khi kết nối thành công
      this.db = this.client.db(process.env.DB_NAME)

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
    // Nếu db chưa được khởi tạo
    if (!this.db) {
      throw new Error('Database not connected')
    }
    return this.db.collection('users')
  }
}

// Tạo 1 đối tượng databaseService và export nó ra
const databaseService = new DatabaseService()
export default databaseService
