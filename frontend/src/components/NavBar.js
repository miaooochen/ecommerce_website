import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { mobile } from '../responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../redux/userRedux"
import {removeProduct} from "../redux/cartRedux"
import {removeHeart} from "../redux/heartRedux"

const Container = styled.div`
height: 60px;
${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`;
const Language = styled.span`
font-size: 14px;
cursor: pointer;
${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
${mobile({ marginLeft: '10px' })}`;

const Input = styled.input`
border: none;
${mobile({ width: "60px" })}
`;

const Center = styled.div`
flex: 1;
text-align: center;
`;

const Logo = styled.h1`
font-weight: bold;
${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ justifyContent: "flex-start" })}
`;

const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const NavBar = () => {
    const quantity = useSelector(state=>state.cart.cartQuantity)
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleFilter = () => {
        navigate('/products/All')
    }
    const handleLogout = () => {
        dispatch(logout());
        dispatch(removeProduct());
        dispatch(removeHeart());
    }
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder='Search' onChange={handleFilter}/>
                    <SearchIcon style={{color: 'gray', fontSize : 16}}/>
                </SearchContainer>
            </Left>
            <Center>
                <Logo><Link to='/' style={{ textDecoration:'none', color:'black'}}>MIAO</Link></Logo>
            </Center>
            <Right>
                <MenuItem>{!user && <Link to='/register' style={{ textDecoration:'none', color:'black'}}>Register</Link>}</MenuItem>
                <MenuItem>
                    { user ? <Link to='/' onClick={handleLogout} style={{ textDecoration:'none', color:'black'}}>Log Out</Link>
                        : <Link to='/login' style={{ textDecoration:'none', color:'black'}}>Log In</Link>
                    }
                </MenuItem>
                <MenuItem>
                    <Link to='/cart'>
                        <Badge badgeContent={quantity} color='primary'>
                            <ShoppingCartIcon />
                        </Badge>
                    </Link>
                </MenuItem>
            </Right>
        </Wrapper>
        
    </Container>
  )
}

export default NavBar