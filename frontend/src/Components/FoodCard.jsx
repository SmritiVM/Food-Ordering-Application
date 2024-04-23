import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./styles/FoodCard.css";
import QuantityButton from "./Quantity.jsx";

function FoodCard(food) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    setQuantity(cart[food.id] || 0);
  }, [food.id]);

  const updateFood = () => {
    localStorage.setItem("foodID", food.id);
    navigate("/admin/updatefood");
  };

  const deleteFood = async () => {
    try {
      await axios.delete(`http://localhost:4000/plateform/delete-food/${food.id}`);
      alert("Food Item Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  const handleQuantityChange = async (newQuantity) => {
    try {
      const response = await axios.get(`http://localhost:4000/plateform/food-details/${food.id}`);
      const { stockAvailable } = response.data.data;
      
      if (newQuantity <= stockAvailable) {
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        cart[food.id] = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        setQuantity(newQuantity);
      } else {
        alert("Cannot add more than available stock");
      }
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };
  console.log(localStorage.getItem("cart"));

  return (
    <div className="foodcard">
      <div className="left">
        <img src={require(`../FoodImages/${food.image}`)} alt={food.foodName} />
      </div>
      <div className="right">
        <h1 className="foodname">{food.foodName}</h1>
        <h2 className="servings">{"Serves " + food.servings}</h2>
        <div className="price-quantity">
          <p className="price">{"Rs ." + food.price}</p>
          {user === "admin" ? (
            <div>
              <p>{"Stock: " + food.stockAvailable}</p>
              <br />
              <p>{"Preparation Time: " + food.prepTime}</p>
              <br />
              <button onClick={updateFood}>Update</button>
              <button onClick={deleteFood}>Delete</button>
            </div>
          ) : (
            <QuantityButton
              initialQuantity={quantity}
              stockAvailable={food.stockAvailable}
              onQuantityChange={handleQuantityChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function CreateFoodCard(food) {
  return (
    <FoodCard
      id={food._id}
      foodName={food.foodName}
      image={food.image}
      servings={food.serves}
      price={food.price}
      stockAvailable={food.stockAvailable}
      prepTime = {food.prepTime}
    />
  );
}
export { FoodCard, CreateFoodCard };
