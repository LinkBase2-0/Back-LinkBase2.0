import  Sequelize  from "sequelize";
import Categorie from "./Categories";
import Provider from "./Providers";
import Review from "./Reviews";
import User from "./Users";

User.hasMany(Review);
Review.belongsTo(User);

Provider.hasMany(Review);
Review.belongsTo(Provider);

export { Categorie, Provider, Review, User };
