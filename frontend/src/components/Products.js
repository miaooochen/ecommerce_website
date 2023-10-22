import React from 'react'
import styled from 'styled-components'
import axios from 'axios';
import Product from './Product'
import { useEffect, useState } from "react";

const Container = styled.div`
padding: 10px;
margin: 10px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`
const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  
  useEffect(() =>{
    const getProducts = async () => {
      try{
        const res = await axios.get(
          cat !== "All"
          ? `http://localhost:3500/product?category=${cat}`
          : "http://localhost:3500/product"
        )
        setProducts(res.data);
      } catch(err){
        console.log(err);
      }
    }
    getProducts()
  }, [cat])

//products is array, item is object, filters is object
  useEffect(() => {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [filters])

  useEffect(() => {
    if (sort === "newest") { filters === null ? 
      setProducts((prev) =>[...prev].sort((a, b) => a.id - b.id))
      : setFilteredProducts((prev) => [...prev].sort((a, b) => a.id - b.id));
    } else if (sort === "asc") { filters === null ? 
      setProducts((prev) => [...prev].sort((a, b) => a.price - b.price)) 
      : setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else { filters === null ? 
      setProducts((prev) => [...prev].sort((a, b) => b.price - a.price))
      : setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      { filters === null  ? products.map((item) => <Product item={item} key={item.id} />)
        : filteredProducts.map((item) => <Product item={item} key={item.id} />) 
      }
    </Container>
  )
}

export default Products