import { createStackNavigator } from "react-navigation-stack";

import Home from "./../Screens/Home/index";
import Blogs from "./../Screens/Home/blogs";
import Events from "./../Screens/Home/events";
import Player from "./../Screens/Home/player";

import Signin from './../Screens/Auth/Signin';
import Signup from './../Screens/Auth/Signup';
import { createAppContainer } from "react-navigation";

//Add navigators with screens in this file (Trip)
const HomeNav = createStackNavigator({
  Home: { screen: Home, navigationOptions:{ headerShown: false } },
  Blogs: { screen: Blogs, navigationOptions:{ headerShown: false } },
  Events: { screen: Events, navigationOptions:{ headerShown: false } },
  Player: { screen: Player, navigationOptions:{ headerShown: false } },
});

const Auth = createStackNavigator({
  Signup: { screen: Signup, navigationOptions: { headerShown: false } },
  Signin: { screen: Signin, navigationOptions: { headerShown: false } },
});

const AuthNavigator = createAppContainer(Auth);
export const HomeNavigator = createAppContainer(HomeNav);

export default AuthNavigator;