import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { HomeNavigator } from "./stackNavigator";
import { Row, Col } from "react-native-easy-grid";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const drawer_banner = './../Assets/Icons/drawer_banner.png';
const drawer_fb = './../Assets/Icons/drawer_fb.png';
const drawer_instagram = './../Assets/Icons/drawer_instagram.png';
const drawer_twitter = './../Assets/Icons/drawer_twitter.png';
const drawer_youtube = './../Assets/Icons/drawer_youtube.png';

const home = './../Assets/Icons/home.png';
const profile = './../Assets/Icons/profile.png';
const community = './../Assets/Icons/community.png';
const blog = './../Assets/Icons/blog.png';
const magzine = './../Assets/Icons/magzine.png';
const store = './../Assets/Icons/store.png';
const logout = './../Assets/Icons/logout_icon.png';

const logo = './../Assets/Images/logo.png'

const CustomDrawerComponent = (Props, state=states) => (
  <SafeAreaView style={style.mainContainer}>
      <Image source={require(drawer_banner)} style={style.bannerTop} />
    <Row style={style.logoContainer}>
      <Image source={require(logo)} style={style.logo}/>
    </Row>

    <Row style={{ height:heightPercentageToDP('60%') }}>
      <ScrollView style={{ }}>
        {/* <DrawerItems {...Props} /> */}

        <View style={style.navContainer}>
          <TouchableOpacity style={style.navButton}
            onPress={() => {
              Props.navigation.toggleDrawer()
              setTimeout(()=>{
                Props.navigation.navigate("Home")
              })
          }}>
              <Image source={require(home)} style={{ height:18, width:18 }} />
              <Text style={style.navText}>Home</Text>
          </TouchableOpacity>
        </View>

        <View style={style.navContainer}>
          <TouchableOpacity style={style.navButton}
            onPress={() => {
              Props.navigation.toggleDrawer()
              Props.navigation.navigate("Home")
              setTimeout(()=>{
                Props.navigation.navigate("Profile")
              })
          }}>
              <Image source={require(profile)} style={{ height:18, width:18 }} />
              <Text style={style.navText}>Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={style.navContainer}>
          <TouchableOpacity style={style.navButton}
            onPress={() => {
              Props.navigation.toggleDrawer()
              Props.navigation.navigate("Home")
              setTimeout(()=>{
                Props.navigation.navigate("Events")
              })
          }}>
              <Image source={require(community)} style={{ height:18, width:18, }} />
              <Text style={style.navText}>Events</Text>
          </TouchableOpacity>
        </View>

        <View style={style.navContainer}>
          <TouchableOpacity style={style.navButton}
            onPress={() => {
              Props.navigation.toggleDrawer()
              Props.navigation.navigate("Home")
              setTimeout(()=>{
                Props.navigation.navigate("Blogs")
              })
          }}>
              <Image source={require(blog)} style={{ height:18, width:18 }} />
              <Text style={style.navText}>Blogs</Text>
          </TouchableOpacity>
        </View>

        <View style={style.navContainer}>
          <TouchableOpacity style={style.navButton}
            disabled={true}
            onPress={() => {
              Props.navigation.toggleDrawer()
              setTimeout(()=>{
                // Props.navigation.navigate("Blogs")
              })
          }}>
              <Image source={require(magzine)} style={{ height:18, width:22 }} />
              <Text style={style.navText}>Magazine</Text>
          </TouchableOpacity>
        </View>

        <View style={style.navContainer}>
          <TouchableOpacity style={style.navButton}
            disabled={true}
            onPress={() => {
              Props.navigation.toggleDrawer()
              setTimeout(()=>{
              //   Props.navigation.navigate("SelectServices")
              })
          }}>
              <Image source={require(store)} style={{ height:18, width:18 }} />
              <Text style={style.navText}>Store</Text>
          </TouchableOpacity>
        </View>

        <View style={style.navContainer}>
          <TouchableOpacity style={style.navButton}
            onPress={() => {
              Props.navigation.toggleDrawer()
              setTimeout(()=>{
                Props.navigation.navigate("Logout")
              })
          }}>
              <Image source={require(logout)} style={{ height:18, width:18 }} />
              <Text style={style.navText}>Logout</Text>
          </TouchableOpacity>
        </View>

        
      </ScrollView>
    </Row>

    <View style={style.navFooter}>
        <TouchableOpacity
            style={style.footerButtons}
            onPress={()=>{

            }}>
            <Image source={require(drawer_fb)} style={{height:28, width:20}} />
        </TouchableOpacity>

        <TouchableOpacity
            style={style.footerButtons}
            onPress={()=>{

            }}>
            <Image source={require(drawer_twitter)} style={{height:28, width:28}} />
        </TouchableOpacity>

        <TouchableOpacity
            style={style.footerButtons}
            onPress={()=>{

            }}>
            <Image source={require(drawer_instagram)} style={{height:28, width:28}} />
        </TouchableOpacity>

        <TouchableOpacity
            style={style.footerButtons}
            onPress={()=>{

            }}>
            <Image source={require(drawer_youtube)} style={{height:28, width:30}} />
        </TouchableOpacity>
      </View>
      
      <View style={style.release}>
        <Text style={{ fontSize:10, color:'gray' }}>Release: 09:00 AM</Text>
        <Text style={{ fontSize:10, color:'gray' }}>Thursday, 3 July 2020</Text>
      </View>

    <Image source={require(drawer_banner)} style={style.bannerBottom} />
  </SafeAreaView>
);

const DrawerNavigator = createDrawerNavigator({ Home: HomeNavigator },
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: "75%",
    contentOptions: {
      activeTintColor: "black",
      activeBackgroundColor: "#F5F5F5",
      itemStyle: { paddingLeft: 15 }
    }
  }
);

const Drawer = createAppContainer(DrawerNavigator);
export default Drawer;

const style = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: "#FFF6CA",
        borderRightWidth: 3,
        borderRightColor:'#581845',
    },
    bannerTop:{
        width: '100%',
        height: 45,
        top:0,
        position:'absolute'
    },
    bannerBottom:{
        width: '100%',
        height: 45,
        bottom:0,
        position:'absolute'
    },
    logoContainer:{
        backgroundColor: "#FFF6CA",
        height:heightPercentageToDP('18%'),
        alignItems:'flex-end',
        justifyContent:'center',
        paddingBottom:heightPercentageToDP('1%')
    },
    logo:{
        width: 160,
        height: 100
    },
    navContainer:{
        flexDirection: "row",
        height:heightPercentageToDP('8%') 
    },
    navButton:{
        alignItems:'center',
        flexDirection:'row',
        width:'100%',
        height:'95%',
        paddingLeft:widthPercentageToDP('8%')
    },
    navText:{
        marginLeft: widthPercentageToDP('5%'),
        fontWeight: "400",
        fontSize:20,
        color: "#581845"
    },
    navFooter:{
      position:'absolute',
      bottom:heightPercentageToDP('10%'),
      alignSelf:'center',
      height: heightPercentageToDP('7%'),
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    release:{
      position:'absolute',
      bottom:heightPercentageToDP('5%'),
      alignSelf:'center',
      height: heightPercentageToDP('7%'),
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
    },
    footerButtons:{
        margin: 10
    }
})