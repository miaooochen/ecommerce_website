import React from 'react'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import axios from 'axios';

const Container = styled.div``
const Wrapper = styled.div`
display: flex;
padding: 50px;
`
const ImgContainer = styled.div`
flex: 1;
`
const Image = styled.img`
width: 100%;
height: 80vh;
object-fit: contain;
`
const InfoContainer = styled.div`
flex: 1;
padding: 0px 50px;
display: flex;
flex-direction: column;
justify-content: center;

`
const Title = styled.h1`
font-weight: 200;
`
const Desc = styled.p`
margin: 20px 0px;
`
const Price = styled.span`
font-weight: 100;
font-size: 40px;
`
const FilterContainer = styled.div`
width: 50%;
margin: 30px 0px;
display: flex;
justify-content: space-between;
`
const Filter = styled.div`
display: flex;
align-items: center;
`
const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`
const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${(props)=> props.color};
margin: 0px 5px;
cursor: pointer;
&:hover {
    border: 3px solid;
}
`
const FilterSize = styled.select`
margin-left: 10px;
padding: 5px;
border-radius: 5px;
`
const FilterSizeOption = styled.option``

const AddContainer = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: space-between;
`
const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight: 700;
`
const Amount = styled.span`
width: 30px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;
border-radius: 5px;
border: 1px solid;
`
const Button = styled.button`
padding: 15px;
border: 3px solid teal;
border-radius: 5px;
background-color: white;
cursor: pointer;
font-size: 15px;
font-weight: 500;
&:hover{
    background-color: #f8f4f4;
}
`

const Product = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("S");
    const dispatch = useDispatch();

    useEffect(()=> {
        const getProduct =  async (id) => {
            try {
               const res = await axios.get(`http://localhost:3500/product/find/${id}`)
               setProduct(res.data[0])
            } catch (err){
                console.log(err);
            }
        }
        getProduct(id)
    },[id])
    
    const handleQuantity = (type) => {
        if (type === "dec") {
          quantity > 1 && setQuantity(quantity - 1);
        } else {
          setQuantity(quantity + 1);
        }
      };

    const handleClick = () => {
        dispatch(
            addProduct({ ...product, quantity, color, size })
        );
    };
    

  return (
    <Container>
        <NavBar/>
        <Announcement />
        <Wrapper>
            <ImgContainer>
                <Image src={product.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
                iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
                tristique tortor pretium ut. Curabitur elit justo, consequat id
                condimentum ac, volutpat ornare.
                </Desc>
                <Price>$ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        <FilterColor color="black" onClick={() => setColor('black')}/>
                        <FilterColor color="darkblue" onClick={() => setColor('darkblue')}/>
                        
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e) => setSize(e.target.value)}>
                            
                            <FilterSizeOption>S</FilterSizeOption>
                            <FilterSizeOption>M</FilterSizeOption>
                            <FilterSizeOption>L</FilterSizeOption>
                            
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <RemoveIcon onClick={() => handleQuantity("dec")}/>
                        <Amount>{quantity}</Amount>
                        <AddIcon onClick={() => handleQuantity("inc")}/>
                    </AmountContainer>
                    <Button onClick={handleClick}>Add To Cart</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer /> 
    </Container>
  )
}

export default Product