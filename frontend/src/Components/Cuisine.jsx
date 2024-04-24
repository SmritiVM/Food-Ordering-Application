import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchContext } from "./SearchContext.jsx";
import { CreateFoodCard } from "./FoodCard.jsx";
import ContactSection from "./Contact/Contact.jsx";
import "./styles/Cuisine.css";

function Cuisine() {
  const [chinese, setChinese] = useState([]);
  const [indian, setIndian] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [foodList, setFoodList] = useState([]);
  // const [searchResults, setSearchResults] = useState([]);
  const { searchResults } = useSearchContext();

  useEffect(() => {
    getFood();
  }, []);

  useEffect(() => {
    filterFoodByCategory();
  }, [foodList, searchResults]);

  const getFood = async () => {
    try {
      const result = await axios.get("http://localhost:4000/plateform/food-list");
      setFoodList(result.data.data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const filterFoodByCategory = () => {
    // Filter food based on search results, if available
    let filteredFoodList = searchResults.length > 0 ? searchResults : foodList;

    // Filter food into different arrays based on category
    const chineseFoods = filteredFoodList.filter(food => food.category === "chinese");
    const indianFoods = filteredFoodList.filter(food => food.category === "indian");
    const snacksFoods = filteredFoodList.filter(food => food.category === "snacks");
    
    // Set state for each category
    setChinese(chineseFoods);
    setIndian(indianFoods);
    setSnacks(snacksFoods);
  };

  console.log("From Cuisine SearchResults fetched: ", searchResults);
  console.log("From Cuisine Cart: ", localStorage.getItem("cart"));

  return (
    <div>
      <section className="all-cuisines">
        {chinese.length > 0 ?
        (<div className="cuisine-container">
          <h1 className="cuisine-name">Chinese</h1>
          <div className="cuisine">
            {chinese.map(food => (
              <CreateFoodCard key={food._id} {...food} />
            ))}
          </div>
        </div>)
        : ""
        }

        {indian.length > 0 ?
        (<div className="cuisine-container">
          <h1 className="cuisine-name">Indian</h1>
          <div className="cuisine">
            {indian.map(food => (
              <CreateFoodCard key={food._id} {...food} />
            ))}
          </div>
        </div>)
        : ""
        }

        {snacks.length > 0 ?
         (<div className="cuisine-container">
          <h1 className="cuisine-name">Snacks</h1>
          <div className="cuisine">
            {snacks.map(food => (
              <CreateFoodCard key={food._id} {...food} />
            ))}
          </div>
        </div>)
        : ""
        }
      </section>
      <ContactSection />
    </div>
  );
}

export default Cuisine;
