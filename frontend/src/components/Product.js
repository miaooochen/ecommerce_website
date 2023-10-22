import React from 'react';
import styled from 'styled-components';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from "react-router-dom";
import { addProduct } from "../redux/cartRedux";
import { addHeart } from "../redux/heartRedux";
import { useDispatch } from "react-redux";

const Info = styled.div`
opacity: 0;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: rgba(0,0,0,0.2);
z-index: 3;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.5s ease;
cursor: pointer;
`
const Container = styled.div`
flex: 1;
margin: 10px;
mid-width: 280px;
height: 350px;
display: flex;
align-items: center;
justify-content: center;
background-color: #f5fafd;
position: relative;

&:hover ${Info}{
    opacity: 1;
}
`
const Circle = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background-color: white;
position: absolute;
`
const Image = styled.img`
height: 90%;
z-index: 2;
`
const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
margin: 5px;
transition: all 0.5s ease;
&:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
}
`

const Product = ({item}) => {
    const dispatch = useDispatch();
    const quantity = 1
    const heart = 1
    const handleClick = (item) => {
        dispatch(
            addProduct({...item, quantity})
        );
    }
    const handleHeartClick = (item) => {
        dispatch(
            addHeart({...item, heart})
        );
    }
  return (
    <Container>
        <Circle />
        <Image src={item.img}/>
        <Info>
            <Icon>
                <ShoppingCartIcon onClick={()=> handleClick(item)}/>
            </Icon>
            <Icon>
                <Link to={`/product/${item.productID}`}>
                    <SearchOutlinedIcon />
                </Link>
            </Icon>
            <Icon>
                <FavoriteBorderOutlinedIcon onClick={()=> handleHeartClick(item)}/>
            </Icon>
        </Info>
    </Container>
  )
}

export default Product