import React, { useEffect, useState } from "react";
import "./TopDishes.css";
import axios from "axios";

const TopDishes = ({ setCartItems, cartItems, category, token }) => {
  const url = "http://localhost:4000";
  const [dishImage, setDishImage] = useState([]);
  const userId = localStorage.getItem("userId");

  const [count, setCount] = useState({});
  const [dishes, setDishes] = useState([]);

  const [visibleCount, setVisibleCount] = useState(20);
  const [visibleDishes, setVisibleDishes] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios
      .get(`${url}/api/food/list`)
      .then((res) => {
        setDishImage(res.data.data);
        setDishes(res.data.data);
        setVisibleDishes(res.data.data.slice(0, visibleCount));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setVisibleDishes(dishes.slice(0, visibleCount));
  }, [visibleCount, dishes]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, dishes.length));
  };

  useEffect(() => {
    async function load() {
      await fetchFoodList();
      await loadCartData(localStorage.getItem("token"));
    }
    if (category) {
      setDishes(dishImage.filter((d) => d.category === category));
    } else {
      load();
    }
  }, [category]);

  async function handleAdd(item) {
    setCount((prev) => ({ ...prev, [item._id]: 1 }));
    setCartItems((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const exists = safePrev.find((i) => i._id === item._id);
      if (exists) return safePrev;
      return [...safePrev, { ...item, quantity: 1 }];
    });

    try {
      console.log("comes")
      await axios
        .post(
          `${url}/api/cart/add`,
          { itemId: item._id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => console.log(res, token))
        .catch((error) => console.log(error));
        console.log("Error",token)
    } catch (err) {
      console.log("Add Error", err);
    }
  }
  const increment = async (item) => {
    setCount((prev) => ({ ...prev, [item._id]: prev[item._id] + 1 }));
    setCartItems((prev) =>
      prev.map((i) =>
        i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );

    try {
      if (token) {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId: item._id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (err) {
      console.log("Inc Error", err);
    }
  };
  const decrement = async (item) => {
    if (count[item._id] === 1) {
      const newCount = { ...count };
      delete newCount[item._id];
      setCount(newCount);
      setCartItems((prev) => prev.filter((i) => i._id !== item._id));
    } else {
      setCount((prev) => ({ ...prev, [item._id]: prev[item._id] - 1 }));
      setCartItems((prev) =>
        prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    }

    try {
      if (token) {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId: item._id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (err) {
      console.log("Dec Error", err);
    }
  };

  const loadCartData = async (token) => {
    try {
      const res = await axios.post(
        `${url}/api/cart/fetch`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const cartArray = res.data.cartData || [];

      const countMap = {};
      cartArray.forEach((item) => {
        countMap[item._id] = item.quantity;
      });

      setCount(countMap);
      setCartItems(cartArray);
    } catch (err) {
      console.log("loadCartData error", err);
    }
  };

  useEffect(() => {
    const newCount = {};
    cartItems.forEach((item) => {
      newCount[item._id] = item.quantity;
    });
    setCount(newCount);
  }, [cartItems]);

  
  useEffect(() => {}, [count]);

  return (
    <div className="top-dish-wrapper">
      <div className="show-all">
        <h2>Top dishes Near you</h2>
      </div>
      <div className="top-dishes">
        {visibleDishes.map((item) => {
          return (
            <div className="top-dishes-box" key={item._id}>
              <img src={url + "/images/" + item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <div className="rate-time">
                {" "}
                <i className="fa-solid fa-star">{item.rating}</i>
                <p>{item.deliveryTime}</p>{" "}
              </div>
              <div className="price-add">
                <i className="fa-solid fa-indian-rupee-sign">{item.price}</i>
                <div className="add-btn">
                  {count[item._id] === undefined || count[item._id] === 0 ? (
                    <button
                      onClick={() => {
                        handleAdd(item);
                      }}
                      className="adding"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="counter">
                      <button
                        onClick={() => {
                          decrement(item);
                        }}
                      >
                        -
                      </button>
                      <span>{count[item._id]}</span>
                      <button
                        onClick={() => {
                          increment(item);
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {visibleCount < dishes.length && (
          <div className="load-more-wrapper">
            <button className="load-more-button" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopDishes;
