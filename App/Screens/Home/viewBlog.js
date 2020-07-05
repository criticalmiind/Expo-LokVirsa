import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getData } from './../../Helpers/index';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import Footer from './../Component/footer';
import SearchBox from '../Component/searchBox';
const logo = './../../Assets/Images/logo.png'
const bg = './../../Assets/Images/bg_768x1024.png'
const banner = './../../Assets/Images/banner.png'
const nav_menu_icon = './../../Assets/Icons/nav_menu_icon.png';
const search_icon = './../../Assets/Icons/search_icon.png';

const bottom_home = './../../Assets/Icons/bottom_home.png';
const bottom_video = './../../Assets/Icons/bottom_video.png';
const bottom_menu = './../../Assets/Icons/bottom_menu.png';
const bottom_search = './../../Assets/Icons/bottom_search.png';
const bottom_message = './../../Assets/Icons/bottom_message.png';

class ViewBlogs extends React.Component {
    _isMounted = false;
    Loader = true;
    getData = getData.bind(this);
    constructor(props){
        super(props);
        this.state = {
            dataArray:[]
        }
    }

    UNSAFE_componentWillMount(){
        this._isMounted = true;
        if(this._isMounted){

        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render(){
        const blog = this.props.navigation.getParam("blog");

        return (
            <Grid style={styles.mainContainer}>
                <Image source={require(bg)} style={styles.bgImage}/>
                <Col>
                
                    <Row style={styles.headContainer}>
                        <Col style={[styles.logoCol, { alignItems:'flex-start' }]}>
                            <TouchableOpacity
                                style={{ marginLeft:25}}
                                onPress={()=>{ this.props.navigation.toggleDrawer() }}>
                                <Image source={require(nav_menu_icon)} style={{height:16, width:16}}/>
                            </TouchableOpacity>
                        </Col>

                        <Col style={styles.logoCol}>
                            <Image source={require(logo)} style={styles.logo}/>
                        </Col>

                        <SearchBox />
                    </Row>
                    <Row style={styles.headContainer02}>
                        <Image source={require(banner)} style={styles.headContainer02Img}/>
                        <Text style={styles.headContainer02Text}>Blogs Detail</Text>
                    </Row>

                    <Row style={styles.contentContainer}>
                        <SafeAreaView style={styles.contentContainer01}>
                            <ScrollView contentContainerStyle={styles.contentScrollView}>
                           
                                <Row style={styles.blogRow}>
                                    <Row style={styles.blogPlayerView}>
                                        <Image source={{uri:`${blog.image}`}} style={styles.blogImg}/>
                                    </Row>
                                    <Row style={styles.blogContentView}>
                                        <Text style={styles.blogTitle}>{blog.title}</Text>
                                        <Text style={styles.blogCategory}>{blog.content}</Text>
                                    </Row>
                                </Row>

                            </ScrollView>
                        </SafeAreaView>
                    </Row>
                    <Footer navigation={this.props.navigation} />
                </Col>
            </Grid>
        );
    }
};

const styles = StyleSheet.create({

    mainContainer:{
        ...Platform.select({
            ios:{
                marginTop:35,
            },
            android:{
                marginTop:32,
            },
        }),
    },
    bgImage:{
        position:'absolute',
        width:widthPercentageToDP('100%'),
        height:heightPercentageToDP('90%')
    },
    // Head Start
    headContainer:{
        height:heightPercentageToDP('9%'),
    },
    logoCol:{
        alignItems:'center',
        justifyContent:'center',
    },
    logo:{
        width: 85,
        height: 50,
    },
    // Head end
    headContainer02:{
        height:heightPercentageToDP('6%'),
        borderColor: 'gray',
        borderBottomWidth:3,
        borderTopWidth:3,
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'center'
    },
    headContainer02Img:{
        position:'absolute',
        height:"100%",
        width:"130%",
        opacity:0.5
    },
    headContainer02Text:{
        fontSize:18,
        fontWeight:'600',
        color:"#333"
    },
    // Content Start
    contentContainer:{
        justifyContent:'center',
        alignItems:'center',
        width:widthPercentageToDP('100%')
    },
    contentContainer01:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:heightPercentageToDP('10%')
    },
    contentRow:{
        height:heightPercentageToDP('11.2%'),
        width:widthPercentageToDP('96%'),
        alignSelf:'center'
    },
    contentCol:{
        height:heightPercentageToDP('10%'),
        width:heightPercentageToDP('11.2%'),
        justifyContent:'flex-end',
        alignItems:'center',
    },
    contentBtn:{
        height:heightPercentageToDP('10%'),
        width:heightPercentageToDP('10%'),
        borderRadius:8,
        borderWidth:0.3,
        borderColor: '#FFB30F',
        justifyContent: 'center',
        alignItems:'center',
    },
    contentBtnText:{
        fontSize:12,
        position:'absolute',
        bottom:heightPercentageToDP('0.8%')
    },
    contentBtnImg:{
        borderRadius: 6,
        width: 50,
        height: 50,
        position:'absolute',
        top:heightPercentageToDP('1.3%')
    },
    // Content End
    contentScrollView:{
        paddingTop:heightPercentageToDP('3%'),
        width:widthPercentageToDP('100%'),
        alignItems:'center'
    },
    // Blogs
    blogRow:{
        // height:heightPercentageToDP('30%'),
        width:widthPercentageToDP('85%'),
        flexDirection:'column',
        marginBottom:heightPercentageToDP('3%')
    },
    blogPlayerView:{
        width:"100%",
        // height:"70%",
        height:heightPercentageToDP('25%'),
        borderRadius:20,
        borderColor:'gray',
        borderWidth:2,
        overflow:'hidden'
    },
    blogImg:{
        width:"100%",
        height:"100%",
        resizeMode:'stretch'
    },
    blogContentView:{
        marginTop:heightPercentageToDP("2%"),
        flexDirection:'column'
    },
    blogTitle:{
        fontSize:18,
        fontWeight:'600',
        color:"gray"
    },
    blogCategory:{
        fontSize:16,
        fontWeight:'600',
        color:"gray",
        marginTop:heightPercentageToDP('1%')
    },
    blogsLoader:{
        alignItems:'center',
        justifyContent:'center',
        height:heightPercentageToDP('55%')
    },
    // Blogs
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewBlogs);