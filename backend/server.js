const cors = require("cors");
const { response } = require("express");
const express = require("express");
require('./db/config')
const User = require("./db/User")
const Product = require("./db/Product");

const jwt = require("jsonwebtoken")
const jwtkey = "e-comm"
const PORT = process.env.PORT || 5000

//swagger
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node JS API project',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:5000/'
      }
    ]
  },
  apis: [
    './server.js'
  ]
}
const app = express();
app.use(express.json());
app.use(cors());

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
//




app.post("/register", async (req, res) => {
  const user = new User(req.body);
  const result = await user.save();
  jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "something went wrong ,Please try after sometime" });

    }
    res.send({ result, auth: token })
  })
})

app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body).select("-password")
  if (req.body.password && req.body.email) {
    if (user) {
      jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "something went wrong ,Please try after sometime" });

        }
        res.send({ user, auth: token })
      })
    } else {
      res.send({ result: "No User Found" });
    }

  } else {
    res.send({ result: "No User Found" });
  }

})
/**
 * @swagger
 * components:
 *    schemas:
 *       products:
 *               type: object
 *               properties:
 *                 
 *                  name: 
 *                     type: string
 *                  price:
 *                      type: string
 *                  category:
 *                          type: string
 *                  company:
 *                        type: string
 */

/**
 * @swagger
 * /add-product:
 *   post:
 *       summary: This get products.
 *       description: this is a description.
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#components/schemas/products'
 *       responses:
 *           200:
 *              description: To test get method
 *              
 *
 */


app.post("/add-product", async (req, resp) => {
  const product = new Product(req.body);
  const result = await product.save();
  resp.send(result)
})



/**
 * @swagger
 * /products:
 *   get:
 *       summary: This get products.
 *       description: this is a description.
 *       responses:
 *           200:
 *              description: To test get method
 *              content:
 *                 application/json:
 *                     schema:
 *                        type: array
 *                        items: 
 *                           $ref: "#components/schemas/products"
 *
 */

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products)
  } else {
    res.send({ result: "No Products Found" })
  }
})

app.delete("/product/:id", verifyToken, async (req, res) => {

  const result = await Product.deleteOne({ _id: req.params.id })
  res.send(result)
})


app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result)
  } else {
    res.send({ result: "No Record Found" })
  }
})

app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body
    }
  )
  res.send(result)
})

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    //for find 
    "$or": [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },

    ]
  })
  res.send(result)
})

//middleware

function verifyToken(req, res, next) {
  let token = req.headers["authorization"]
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.status(401).send("Please provide valid token ")

      } else {
        next()
      }
    })
  } else {
    res.status().send("Please add token with header")
  }


}

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}



app.listen(PORT, console.log(`Server is running on port ${PORT}`))
