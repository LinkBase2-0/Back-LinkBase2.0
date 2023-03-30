import { Provider, Review, User } from "../models";

export const createReview = async (
  review: any,
  email: string,
  name: string
) => {
  try {
    const newReview = await Review.create(review);
    const user = await User.findOne({ where: { email } });
    const provider = await Provider.findOne({ where: { name } });

    await user?.addReview(newReview);
    await provider?.addReview(newReview);

    return newReview;
  } catch (error) {
    console.log(error);
  }
};

export const getUserReviews = async (email: string) => {
  try {
    const userReviews = await User.findOne({
      where: { email },
      include: { model: Review, as: "reviews" },
    });
    return userReviews;
  } catch (error) {
    console.log(error);
  }
};

export const getProviderReviews = async (name: string) => {
  try {
    const providerReviews = await Provider.findOne({
      where: { name },
      include: { model: Review, as: "reviews" },
    });
    return providerReviews;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (id: any) => {
  try {
    const reviewToDelete = await Review.findByPk(id);
    const reviewDeleted = await Review.destroy({
      where: { text: reviewToDelete?.text },
    });
    return reviewToDelete;
  } catch (error) {
    console.log(error);
  }
};

export const getReview = async (id: any) => {
  try {
    const review = await Review.findByPk(id);
    return review;
  } catch (error) {
    console.log(error);
  }
};

export const getReviews = async () => {
  try {
    const reviews = await Review.findAll();
    return reviews;
  } catch (error) {
    console.log(error);
  }
};
