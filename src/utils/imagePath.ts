import { ImageRequireSource } from "react-native";

enum imagePath {
    loginBack = require("../../assets/images/loginBack.jpg") as ImageRequireSource,
    apple = require("../../assets/images/apple.png") as ImageRequireSource,
    google = require("../../assets/images/google.png") as ImageRequireSource,
    facebook = require("../../assets/images/facebook.png") as ImageRequireSource,

}

export default imagePath;