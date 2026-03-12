import mongoose from "mongoose"

export const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("Database Connected Successfully")
    console.log("Database Name:", mongoose.connection.name)
  } catch (error) {
    console.log(error.message)
  }
}