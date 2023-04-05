import { Provider, Review, User } from "../models";

export const createReview = async (
  review: any,
  email: string,
  name: string
) => {
  const newReview = await Review.create(review);
  if (newReview) {
    const user = await User.findOne({ where: { email } });
    const provider = await Provider.findOne({ where: { name } });

    await user?.addReview(newReview);
    await provider?.addReview(newReview);

    return newReview;
  } else throw new Error("Error loading form data");
};

export const getUserReviews = async (email: string) => {
  const userReviews = await User.findOne({
    where: { email },
    include: { model: Review, as: "reviews" },
  });
  if (userReviews) return userReviews;
  else throw new Error("there is no user with that email");
};

export const getProviderReviews = async (name: string) => {
  const providerReviews = await Provider.findOne({
    where: { name },
    include: { model: Review, as: "reviews" },
  });
  if (providerReviews) return providerReviews;
  else throw Error("there is no provider with that name");
};

export const deleteReview = async (id: any) => {
  return Review.destroy({
    where: { id },
  });
};

export const getReview = async (id: any) => {
  const review = await Review.findByPk(id);
  if (review) return review;
  else throw new Error("there is no review with that id");
};

export const getReviews = async () => {
  const reviews = await Review.findAll();
  if (reviews) return reviews;
  else throw new Error("Not found");
};
