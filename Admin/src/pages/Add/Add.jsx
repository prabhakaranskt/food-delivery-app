import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { Form } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    rating: "",
    price: "",
    category: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("rating", Number(data.rating));
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          rating: "",
          price: "",
          category: "",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-upload-image flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload-image"
            />
          </label>
          <input
            onChange={(event) => setImage(event.target.files[0])}
            type="file"
            id="image"
            required
            hidden
          />
        </div>
        <div className="add-name flex-col">
          <p>Item Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Enter Item Name"
            name="name"
          />
        </div>
        <div className="add-rating flex-col">
          <p>Item Rating</p>
          <input
            onChange={onChangeHandler}
            value={data.rating}
            type="number"
            placeholder="Enter Your Rating"
            name="rating"
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Item Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="--"> Select Option</option>
              <option value="Briyani">Briyani</option>
              <option value="Noodles">Noodles</option>
              <option value="SouthIndian">South Indian</option>
              <option value="NorthIndian">North Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Cake">Cake</option>
              <option value="Coffee">Coffee</option>
              <option value="MilkShake">MilkShake</option>
              <option value="Burger">Burger</option>
              <option value="Parotta">Parotta</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Item Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              placeholder="Enter Amount"
              name="price"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
