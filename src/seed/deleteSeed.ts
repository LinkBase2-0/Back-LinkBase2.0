import { Categorie, Company, Provider, Review, User } from "../models";

Provider.findAll().then((arrayProviders) => {
  arrayProviders.forEach((provider) => {
    Provider.destroy({ where: { email: provider.email } });
  });
});
Categorie.findAll().then((arrayCategories) => {
  arrayCategories.forEach((categorie) => {
    Categorie.destroy({ where: { name: categorie.name } });
  });
});
User.findAll().then((arrayUsers) => {
  arrayUsers.forEach((user) => {
    User.destroy({ where: { email: user.email } });
  });
});
Review.findAll().then((arrayReviews) => {
  arrayReviews.forEach((review) => {
    Review.destroy({ where: { id: review.id } });
  });
});
Company.findAll().then((arrayCompanies) => {
  arrayCompanies.forEach((companie) => {
    Company.destroy({ where: { name: companie.name } });
  });
});
