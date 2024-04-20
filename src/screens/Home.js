import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousel from "../components/Carousel";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadFoodData = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/fooddata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setFoodItems(data[0]);
      setFoodCategories(data[1]);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadFoodData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </form>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700?pastry"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700?barbeque"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCategories.map((category) => (
          <div key={category._id} className="row mb-3">
            <div className="fs-3 m-3">{category.CategoryName}</div>
            <hr />
            <FoodItemsByCategory
              categoryName={category.CategoryName}
              search={search}
              foodItems={foodItems}
            />
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

function FoodItemsByCategory({ categoryName, search, foodItems }) {
  return foodItems
    .filter(
      (item) =>
        item.CategoryName === categoryName &&
        item.name &&
        item.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((filterItems) => (
      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
        <Card foodItem={filterItems} options={filterItems.options[0]} />
      </div>
    ));
}
