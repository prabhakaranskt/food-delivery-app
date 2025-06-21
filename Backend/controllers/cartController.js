import userModel from "../models/userModel.js";
import foodModel from "..//models/foodModel.js";

//add items to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData;
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    res.json({ success: false, message: "cart Error" });
  }
};

//remove from cart

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData || {};
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    res.json({ success: false, message: "Error in Remove from Cart" });
  }
};

//fetch user cart data

const fetchCart = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({ success: false, message: "Missing user ID" });
    }

    const userData = await userModel.findById(userId).select("cartData");
    if (!userData)
      return res.json({ success: false, message: "User not found" });
    const cartData = userData.cartData || {};
    const foodItems = await foodModel.find();

    const enrichedFood = foodItems.map((food) => {
      const quantity = cartData[food._id.toString()];
      return {
        ...food.toObject(),
        quantity,
      };
    });

    const itemIds = Object.keys(cartData);
    if (itemIds.length === 0) {
      return res.json({ success: true, cartData: [] });
    }

    const items = await foodModel.find({ _id: { $in: itemIds } });
    const cartItems = items.map((item) => ({
      ...item.toObject(),
      quantity: cartData[item._id.toString()] || 0,
    }));
    res.json({ success: true, cartData: cartItems });
  } catch (error) {
    res.json({ success: false, message: "error Occured in fetching data" });
  }
};

const clearCart = async (req, res) => {
  try {
    const { userId } = req.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.cartData = {};
    await user.save();

    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error clearing cart" });
  }
};

export { addToCart, removeFromCart, fetchCart, clearCart };
