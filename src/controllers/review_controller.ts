import { Request, Response, NextFunction } from "express";

import {
  createReview,
  getUserReviews,
  getProviderReviews,
  deleteReview,
  getReview,
  getReviews,
} from "../services/review_service";
import { sendEmail } from "../config/emailConfig";

export const review_seed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { review } = req.body;
  const { id } = req.body.user;
  const { name } = req.body.provider;
  try {
    const newReview = await createReview(review, id, name);
    return res.status(201).send(newReview);
  } catch (error) {
    next(error);
  }
};

export const review_create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { review } = req.body;
  const { id } = req.body.user;
  const { name } = req.body.provider;
  try {
    const newReview = await createReview(review, id, name);

    await sendEmail("superAdmin", newReview, "A new review has been published");
    await sendEmail("adminReviews", newReview, "A new review has been published");
    
    return res.status(201).send(newReview);
  } catch (error) {
    next(error);
  }
};

export const review_get_of_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.userId
  try {
    const userReviews = await getUserReviews(parseInt(id));
    return res.status(200).send(userReviews);
  } catch (error) {
    next(error);
  }
};

export const review_get_of_provider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.providerId
  try {
    const providerReviews = await getProviderReviews(parseInt(id));
    return res.status(200).send(providerReviews);
  } catch (error) {
    next(error);
  }
};

export const review_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.reviewId;
  try {
    const reviewDeleted = await getReview(id);
    await deleteReview(id);
    return res.status(200).send(reviewDeleted);
  } catch (error) {
    next(error);
  }
};

export const review_get_one = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.reviewId;
  try {
    const review = await getReview(id);
    return res.status(200).send(review);
  } catch (error) {
    next(error);
  }
};

export const review_get_all = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await getReviews();
    return res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};
