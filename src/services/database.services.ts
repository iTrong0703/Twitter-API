import { MongoClient } from 'mongodb'
import 'dotenv/config'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learning-cluster.0adzo.mongodb.net/?retryWrites=true&w=majority&appName=learning-cluster`

class DatabaseService {
  private client: MongoClient
  // Hàm khởi tạo
  constructor() {
    this.client = new MongoClient(uri)
  }

  // Phương thức connect
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.client.db('admin').command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.error('Failed to connect to MongoDB', error)
    } finally {
      // Nên tạo phương thức close() riêng
      await this.client.close()
    }
  }
}

// Tạo 1 đối tượng databaseService và export nó ra
const databaseService = new DatabaseService()
export default databaseService
