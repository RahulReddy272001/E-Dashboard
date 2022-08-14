import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const navigate = useNavigate();

  const params = useParams()


  useEffect(() => {
    getProductDetails();
  }, [])
  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json()
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)


  }
  const UpdateProducthandle = async () => {

    console.warn(name, price, category, company)
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`

      }
    })
    result = await result.json()
    navigate("/")
  }
  return (
    <div className='product'>
      <h1>Update Product</h1>
      <input type="text" placeholder="Enter Product name" className='inputBox' value={name} onChange={(e) => setName(e.target.value)} />

      <input type="text" placeholder="Enter Product price" className='inputBox' value={price} onChange={(e) => setPrice(e.target.value)} />


      <input type="text" placeholder="Enter Product category" className='inputBox' value={category} onChange={(e) => setCategory(e.target.value)} />

      <input type="text" placeholder="Enter Product company" className='inputBox' value={company} onChange={(e) => setCompany(e.target.value)} />

      <button className='appButton' onClick={() => UpdateProducthandle()}>Update Product</button>

    </div>
  )
}

export default UpdateProduct
