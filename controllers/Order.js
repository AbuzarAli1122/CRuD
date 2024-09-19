import Order from "../models/order-models.js";


export const PostorderBy = async (req, res) => {
    try {
        const { user_id,  order_date, status,total_amount,discount_id } = req.body;

      const newOrder = new Order({
        user_id, 
        order_date, 
        status,
        total_amount,
        discount_id
      });
       await newOrder.save();
      return res.status(201).json({ message: "order created successfully", order: newOrder });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  //----------------   get All order ----------------------------------

  export const getorderData= async (req,res)=>{
    try{
        const getOrder = await Order.find();
        return res.status(200).json({ success : true, getOrder});

    }
    catch(err){
       return res.status(500).json({message:err.message});

    }
}
 //----------------   get  order by user id ----------------------------------

 export const getOrderByuserId = async (req, res) => {
    try {
      const userId = req.params.id; 
      const orders = await Order.find({ user_id: userId }).populate("user_id", "order_id");
      
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "Orders not found for this user" });
      }
  
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };



export const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedorder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
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
        const deletedorder = await Order.findByIdAndDelete(orderId);
        if (!deletedorder) {
            return res.status(404).json({ message: "order not found" });
        }
        return res.status(200).json({ message: "order deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
