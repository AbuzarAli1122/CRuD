import Review from "../models/review-models.js";


export const postReview = async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body;

        const newReview = new Review({
            userId,
            productId,
            rating,
            comment
        });

        await newReview.save();
        return res.status(201).json({ message: "Review created successfully", review: newReview });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getReviewsByProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await Review.find({ productId }).populate("userId", "userName"); 
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        return res.status(200).json(review);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        return res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
