import React from "react";
import "./List.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
const List = ({ url }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error Occured");
    }
  };
  return (
    <div className="list">
      <h2>All Food Items</h2>
      <div>
        <table className="list-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => {
              return (
                <tr key={index} className="list-table-format">
                  <td className="image">
                    <img src={`${url}/images/${item.image}`} />
                  </td>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td>
                    <p>{item.category}</p>
                  </td>
                  <td>
                    <i className="fa-solid fa-indian-rupee-sign">
                      {item.price}
                    </i>
                  </td>
                  <td>
                    <p onClick={() => removeFood(item._id)} className="cursor">
                      X
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
