import OrderItem from "../models/orderItem-model.js"

export const PostorderItem = async (req, res) => {
    try {
        const { order_id, product_Id, quantity,price } = req.body;

      const newOrderItem = new OrderItem({
        order_id, 
        product_Id, 
        quantity,
        price
      });
       await newOrderItem.save();
      return res.status(201).json({ message: "orderitem created successfully", order: newOrderItem });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getOrderItemByuserId = async (req, res) => {
    try {
        const orderitemId = req.params.orderId;
        const orderitem = await OrderItem.find({ orderitemId }).populate("orderItem_id", "order_id"); 
        return res.status(200).json(orderitem);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getOrderitemById = async (req, res) => {
    try {
        const orderitemId = req.params.id;
        const orderitem = await OrderItem.findById(orderId);
        if (!orders) {
            return res.status(404).json({ message: "order not found" });
        }
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedorder = await OrderItem.findByIdAndUpdate(orderId, req.body, { new: true });
        if (!updatedorder) {
            return res.status(404).json({ message: "order not found" });
        }
        return res.status(200).json({ message: "order updated successfully", order: updatedorder });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedorder = await OrderItem.findByIdAndDelete(orderId);
        if (!deletedorder) {
            return res.status(404).json({ message: "order not found" });
        }
        return res.status(200).json({ message: "order deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
