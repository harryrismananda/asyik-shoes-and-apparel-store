import { Db, MongoClient } from "mongodb";

const uri: string = "mongodb+srv://admin:admin@cluster0.l4jc60j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

let db: Db

const client: MongoClient = new MongoClient(uri)

function connect(): Db {
  db = client.db("asyik_store")
  return db
}

export function getDb(): Db {
  if(!db) return connect()
  return db
}

