import React, { useEffect, useState } from "react";
import { products } from "../localFiles/product";
import "./style.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Home = () => {
  const [filteredProduct, setFilteredProduct] = useState(products);
  const [searchProduct, setSearchProducts] = useState("");
  const [uniqueCategory, setUniqueCetegory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Select Cetegory");
  const [sortProducts, setSortProducts] = useState("Sort Products");
  

  

  useEffect(() => {
    const allCategory = products.map((product) => product.category);
    const categories = new Set(allCategory);
  
    setUniqueCetegory([...categories])
  }, [])

  useEffect(() => {
    if (selectedCategory === "Select Cetegory") {
      setFilteredProduct(products);
    } else {
      const categoryName =
        selectedCategory.charAt(0).toLowerCase() + selectedCategory.slice(1);
      const filterCategory = products.filter(
        (product) => product.category === categoryName
      );
      setFilteredProduct(filterCategory);
    }
  }, [selectedCategory])


  const handleSearch = () => {
    if (searchProduct === "") {
      setFilteredProduct(products);
    } else {
      const newProducts = products.filter((item) =>
        item.title.toLowerCase().includes(searchProduct.toLowerCase())
      );

      setFilteredProduct(newProducts);
      // console.log(filteredProduct)
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else {
      return;
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); 
    setSortProducts("Sort Products")
  };

  const handleSortingChange = (e) => {
    setSortProducts(e.target.value);
    console.log(e.target.value)

    if(e.target.value === "Sort Low To High"){
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setFilteredProduct(sortedProducts);
    }
    else if(e.target.value === "Sort High To Low"){
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setFilteredProduct(sortedProducts);
    }
    else{
      setFilteredProduct(products)
    }
    


  };

  return (
    <div>
      <div className="menuDiv">
        <div className="searchDiv">
          <input
            type="text"
            onChange={(e) => setSearchProducts(e.target.value)}
            onKeyDown={handleKeyPress}
          ></input>
          <button onClick={handleSearch}>search</button>
        </div>

        <div className="functionalityDiv">
              <div className="select-container">
                <select
                  className="selectBox"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option>Select Catagory</option>
                  {uniqueCategory.map((category) => (
                    <option key={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select-container">
                <select
                  className="selectBox"
                  value={sortProducts}
                  onChange={handleSortingChange}
                >
                  <option>Sort Products</option>
                  <option>Sort Low To High</option>
                  <option>Sort High To Low</option>
                  {/* {catagories.map((category) => (
                    <option key={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))} */}
                </select>
              </div>
            </div>
      </div>

      <div className="allProducts">
        {filteredProduct.map((item) => {
          return (
            <Card sx={{ width: 300 }} key={item.id}>
              <CardMedia
                sx={{ objectFit: "contain" }}
                component="img"
                alt="green iguana"
                height="140"
                image={item.icon}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`$ ${item.price}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
