import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import Slide from "../Slider/Slider";


function Products() {
  const [products, setProducts] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [categories, setCategories] = useState(null);
  

  async function getAllProducts() {
    setIsloading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
    setIsloading(false);
  }
  async function getAllCategories() {
    setIsloading(true);
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
    setIsloading(false);
  }
  
  useEffect(() => {
    getAllProducts();
    getAllCategories();
   
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <>
        
          <Slide data={categories} />
          <div className="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-2 md:gap-2  grid-cols-1 ">
            {products?.map((product, index) => {
              return <Product key={index} product={product} />;
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Products;
