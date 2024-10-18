import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Category from "../Category/Category";
import { useNavigate } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  async function getAllCategories() {
    setIsloading(true);
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
    console.log(data.data);
    setIsloading(false);
  }

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <>
          <div className="grid md:grid-cols-5 md:gap-3 grid-cols-2 gap-y-2 mt-5 ">
            {categories?.map((category, index) => {
              return (
                <div
                  className="border hover:shadow-md hover:shadow-green-500 transition-all duration-300 rounded  cursor-pointer"
                  onClick={() => navigate(`/category/${category._id}`)}
                >
                  <Category key={index} category={category} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Categories;
