import express from "express";
import {
    postReview,
    getReviewsByProduct,
    getReviewById,
    updateReview,
    deleteReview
} from "../controllers/Review.js";

const reviewRoute = express.Router();


reviewRoute.post("/reviews", postReview);

reviewRoute.get("/reviews/product/:productId", getReviewsByProduct);

reviewRoute.get("/reviews/:id", getReviewById);

reviewRoute.put("/reviews/:id", updateReview);

reviewRoute.delete("/reviews/:id", deleteReview);

export default reviewRoute;
