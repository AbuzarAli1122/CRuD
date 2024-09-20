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

  //----------------   get All order ----------------------------------

  export const getorderItemData= async (req,res)=>{
    try{
        const getOrderitem = await OrderItem.find();
        return res.status(200).json({ success : true, getOrderitem});

    }
    catch(err){
       return res.status(500).json({message:err.message});

    }
}
 //----------------   get  order by user id ----------------------------------

 export const getOrderItemByOrderId = async (req, res) => {
    try {
      const orderitem = req.params.id; 
      const orderitems = await OrderItem.find({ orderitem: orderitem }).populate("product_Id", "order_id");
      
      if (!orderitems || orderitems.length === 0) {
        return res.status(404).json({ message: "Orderitems not found for this product" });
      }
  
      return res.status(200).json(orderitems);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };



export const updateOrderItem = async (req, res) => {
    try {
        const orderitemId = req.params.id;
        const updatedorder = await OrderItem.findByIdAndUpdate(orderitemId, req.body, { new: true });
        if (!updatedorder) {
            return res.status(404).json({ message: "item not found" });
        }
        return res.status(200).json({ message: "item updated successfully", order: updatedorder });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteOrderitem = async (req, res) => {
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
