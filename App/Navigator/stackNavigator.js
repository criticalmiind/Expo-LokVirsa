import { createStackNavigator } from "react-navigation-stack";

import Home from "./../Screens/Home/index";
import Blogs from "./../Screens/Home/blogs";
import ViewBlog from "./../Screens/Home/viewBlog";
import Profile from "./../Screens/Home/profile";
import Events from "./../Screens/Home/events";
import Player from "./../Screens/Home/player";
import Logout from "./../Screens/Home/logout";
import PrivacyPolicy from "./../Screens/Home/privacyPolicy";
import Disclaimer from "./../Screens/Home/disclaimer";

import Signin from './../Screens/Auth/Signin';
import Signup from './../Screens/Auth/Signup';
import { createAppContainer } from "react-navigation";

//Add navigators with screens in this file (Trip)
const HomeNav = createStackNavigator({
  Home: { screen: Home, navigationOptions:{ headerShown: false } },
  Blogs: { screen: Blogs, navigationOptions:{ headerShown: false } },
  ViewBlog: { screen: ViewBlog, navigationOptions:{ headerShown: false } },
  Profile: { screen: Profile, navigationOptions:{ headerShown: false } },
  Events: { screen: Events, navigationOptions:{ headerShown: false } },
  Player: { screen: Player, navigationOptions:{ headerShown: false } },
  Logout: { screen: Logout, navigationOptions:{ headerShown: false } },
  PrivacyPolicy: { screen: PrivacyPolicy, navigationOptions:{ headerShown: false } },
  Disclaimer: { screen: Disclaimer, navigationOptions:{ headerShown: false } },
});

const Auth = createStackNavigator({
  Signin: { screen: Signin, navigationOptions: { headerShown: false } },
  Signup: { screen: Signup, navigationOptions: { headerShown: false } },
});

const AuthNavigator = createAppContainer(Auth);
export const HomeNavigator = createAppContainer(HomeNav);

export default AuthNavigator;