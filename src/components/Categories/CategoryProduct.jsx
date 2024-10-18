import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";

function CategoryProducts() {
  const { id } = useParams();

  const [products, setProducts] = useState(null);
  const [isloading, setIsloading] = useState(false);

  async function getAllProducts() {
    setIsloading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data.filter((product) => product.category._id == id));
    setIsloading(false);
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <div className="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-2 md:gap-2  grid-cols-1 ">
          {products?.map((product, index) => {
            return <Product key={index} product={product} />;
          })}
          :
          <div className="text-4xl text-center font-bold my-10 col-span-4">
            Not Product Found{" "}
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryProducts;
