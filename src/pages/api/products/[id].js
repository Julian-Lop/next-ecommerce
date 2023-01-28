const { default: Product } = require("@/models/Product")
const { default: db } = require("@/utils/db")

const handler = async (res,req) => {
  await db.connect()
  const product = await Product.findById(req.query.id)
  res.send(product)
}

export default handler