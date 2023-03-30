import { Request, Response } from "express";

import {
  createReview,
  getUserReviews,
  getProviderReviews,
  deleteReview,
  getReview,
  getReviews,
} from "../services/review_service";

export const review_create = async (req: Request, res: Response) => {
  const { review } = req.body;
  const { email } = req.body.user;
  const { name } = req.body.provider;
  const newReview = await createReview(review, email, name);
  return res.status(201).send(newReview);
};

export const review_get_of_user = async (req: Request, res: Response) => {
  const { email } = req.params;
  const userReviews = await getUserReviews(email);
  return res.status(200).send(userReviews);
};

export const review_get_of_provider = async (req: Request, res: Response) => {
  const { name } = req.params;
  const providerReviews = await getProviderReviews(name);
  return res.status(200).send(providerReviews);
};

export const review_delete = async (req: Request, res: Response) => {
  const id = req.params.reviewId;
  const reviewToDelete = await deleteReview(id);
  return res.status(200).send(reviewToDelete);
};

export const review_get_one = async (req: Request, res: Response) => {
  const id = req.params.reviewId;
  const review = await getReview(id);
  return res.status(200).send(review);
};

export const review_get_all = async (req: Request, res: Response) => {
  const reviews = await getReviews();
  return res.status(200).send(reviews);
};
