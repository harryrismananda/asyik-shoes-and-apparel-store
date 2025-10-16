import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI

let db: Db

const client: MongoClient = new MongoClient(uri as string)

function connect(): Db {
  db = client.db(process.env.MONGO_DB_NAME)
  return db
}

export function getDb(): Db {
  if(!db) return connect()
  return db
}

