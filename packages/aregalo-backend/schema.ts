import { StrictSchema } from "morphism";
import { GiftPresent, User, WishPresent } from "./models";

export const userSchema: StrictSchema<User> = {
  name: "name",
  alias: "alias",
  image: "icon",
};

export const wishPresentSchema: StrictSchema<WishPresent> = {
  id: "id",
  title: "title",
  description: "description",
  favourite: "favourite",
  link: "link",
  price: "price",
};

export const giftPresentSchema: StrictSchema<GiftPresent> = {
  id: "id",
  title: "title",
  description: "description",
  favourite: "favourite",
  assignedTo: "assigned_to",
  link: "link",
  price: "price",
};
