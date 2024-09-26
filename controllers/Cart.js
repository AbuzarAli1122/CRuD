import Cart from "../models/Cart-model.js";
import product from "../models/product-model.js";

export const addToCart = async (req, res) => {
  try {
      const { userId, items } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
          return res.status(400).json({ message: "Items are required in the cart." });
      }

      const processedItems = items.map(item => {
          if (!item.price || isNaN(item.price)) {
              throw new Error("Item price is required and must be a valid number.");
          }
          if (!item.quantity || isNaN(item.quantity)) {
              throw new Error("Item quantity is required and must be a valid number.");
          }
          return {
              ...item,
              total: Number(item.price) * Number(item.quantity)
          };
      });

      const totalPrice = processedItems.reduce((sum, item) => sum + item.total, 0);

      const newCart = new Cart({
          userId,
          items: processedItems,
          totalPrice
      });

      await newCart.save();
      res.status(200).json({ success: true, message: "Items added to cart", cart: newCart });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

//------------------------ Get the Cart -------------------

export const getCart = async (req, res) => {
  try {
      const { userId } = req.params;

      const cart = await Cart.findOne({ userId }).populate("items.productId");
      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json({ success: true, cart });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


//------------------------------------------------------------------------------

//-----------------update the Cart --------------------------------


export const updateCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { items } = req.body;
  
        console.log("User ID:", userId);
        console.log("Items to update:", items);
  
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
  
        console.log("Existing cart:", cart);
  
        items.forEach(updatedItem => {
            console.log("Updated Item:", updatedItem); 
            const itemIndex = cart.items.findIndex(item => item.productId == updatedItem.productId);
            if (itemIndex >= 0) {
                if (updatedItem.quantity === 0) {
                    cart.items.splice(itemIndex, 1);
                } else {
                    cart.items[itemIndex].quantity = updatedItem.quantity;
                    cart.items[itemIndex].total = Number(updatedItem.price) * Number(updatedItem.quantity);
                }
            }
        });
  
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.total, 0);
  
        await cart.save();
        res.status(200).json({ success: true, message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };



// -----------------delete the Cart ---------------------------

export const deleteCart = async (req, res) => {
  try {
      const { userId } = req.params;

      const cart = await Cart.findOneAndDelete({ userId });
      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json({ success: true, message: "Cart deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// ------------------------- remove all item from user cart -----------

export const clearCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    const cart = await Cart.findById(cartId);

    if (!cart){
       return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    return res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
};
// ---------------------------------------------------------------------------

