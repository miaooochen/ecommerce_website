import styled from "styled-components";
import NavBar from "../components/NavBar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
 
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation()
  const cat = location.pathname.split('/')[2]
  const [filters, setFilters] = useState(null)
  const [sort, setSort] = useState('newest')

  const handleFilters = (e) => {
    const value = e.target.value
    value === 'Color' ? 
    setFilters(Object.fromEntries(Object.entries(filters).filter(([key,value]) => key !== 'color')))
    : value === 'Size' ? 
    setFilters(Object.fromEntries(Object.entries(filters).filter(([key,value]) => key !== 'size')))
    : setFilters({...filters, [e.target.name]: value })
  };
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
  return (
    <Container>
      <NavBar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name='color' onChange={handleFilters}>
            <Option>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
          </Select>
          <Select name='size' onChange={handleFilters}>
            <Option>Size</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value='newest' selected>Newest</Option>
            <Option value='asc'>Price (asc)</Option>
            <Option value='desc'>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;