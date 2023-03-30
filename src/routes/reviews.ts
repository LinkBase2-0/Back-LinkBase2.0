import { Router } from "express";

import { Provider, Review, User } from "../models";

const router = Router();

router.post("/", async (req, res, next) => {
  const { review } = req.body;
  const { email } = req.body.user;
  const { name } = req.body.provider;
  try {
    const newReview = await Review.create(review);
    const user = await User.findOne({ where: { email } });
    const provider = await Provider.findOne({ where: { name } });

    await user?.addReview(newReview);
    await provider?.addReview(newReview);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.get("/userReviews/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const userReviews = await User.findOne({
      where: { email },
      include: { model: Review, as: "reviews" },
    });
    res.status(200).send(userReviews);
  } catch (error) {
    console.log(error);
  }
});

router.get("/providerReviews/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const providerReviews = await Provider.findOne({
      where: { name },
      include: { model: Review, as: "reviews" },
    });
    res.status(200).send(providerReviews);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:reviewId", async (req, res, next) => {
  const id = req.params.reviewId;
  try {
    const reviewToDelete = await Review.findByPk(id);
    const reviewDeleted = await Review.destroy({
      where: { text: reviewToDelete?.text },
    });
    res.status(200).send(reviewToDelete);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:reviewId", async (req, res, next) => {
  const id = req.params.reviewId;
  try {
    const review = await Review.findByPk(id);
    res.status(200).send(review);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
  }
});

export default router;
