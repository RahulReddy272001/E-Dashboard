import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Productlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    let result = await fetch("/products", {

      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    })
    result = await result.json();
    setProducts(result);
  }

  const deleteProduct = async (id) => {
    let result = await fetch(`/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    })
    result = await result.json()
    if (result) {
      getProducts()
    }
  }

  const searchHandle = async (event) => {
    let key = event.target.value
    if (key) {
      let result = await fetch(`/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
      result = await result.json();
      if (result) {
        setProducts(result)
      }
    } else {
      getProducts()
    }

  }

  return (
    <div className='product-list'>
      <h2>Product List</h2>
      <input className='search-product-box' type="text" placeholder="Search Product" onChange={searchHandle} />
      <ul className='product-list-ul'>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {
        products.length > 0 ? products.map((item, index) =>
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>₹{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li><button onClick={() => deleteProduct(item._id)}>Delete</button>

              <button className='update'><Link className='update_link' to={"/update/" + item._id}>Update</Link></button>
            </li>
          </ul>
        )
          : <h1>No Product Found</h1>

      }
    </div>
  )
}

export default Productlist
