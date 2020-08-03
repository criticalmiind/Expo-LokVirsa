import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Platform,
  ActivityIndicator,
  TouchableOpacity, TextInput
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { authentication } from '../../Helpers/index';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import Footer from './../Component/footer';
import { Loader } from '../Component';
import SearchBox from '../Component/searchBox';

import LogoIcon from "./../../Assets/svg/Logo.svg";
// const logo = './../../Assets/Images/logo.png'
const bg = './../../Assets/Images/bg_768x1024.png'
const banner = './../../Assets/Images/banner.png'
const nav_menu_icon = './../../Assets/Icons/nav_menu_icon.png';
// const search_icon = './../../Assets/Icons/search_icon.png';
import SearchIcon from './../../Assets/svg/search.svg';
const auth_button = './../../Assets/Icons/auth_button.png';

class Profile extends React.Component {
    _isMounted = false;
    updateProfile = authentication.bind(this);
    constructor(props){
        super(props);
        this.state = {
            payload:{
                id:'',
                name:'',
                password:'',
                password_confirmation:'',
            }
        }
    }

    UNSAFE_componentWillMount(){
        this._isMounted = true;
        if(this._isMounted){
            this.props.setLoader(false)
            this.setState({
                ...this.state,
                payload:{
                    ...this.state.peyload,
                    name: this.props.userData.name
                }
            })
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    setStateObj(obj){
        if(this._isMounted){
            this.setState({ ...this.state, ...obj })
        }
    }

    render(){
        const { payload } = this.state;
        const { isLoader } = this.props;

        return (<>
            <Loader isLoader={isLoader}/>
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
                            {/* <Image source={require(logo)} style={styles.logo}/> */}
                            <Row><LogoIcon /></Row>
                        </Col>
                        <SearchBox />
                    </Row>
                    <Row style={styles.headContainer02}>
                        <Image source={require(banner)} style={styles.headContainer02Img}/>
                        <Text style={styles.headContainer02Text}>Update Profile</Text>
                    </Row>

                    <Row style={styles.contentContainer}>
                        <SafeAreaView style={styles.contentContainer01}>
                            <ScrollView contentContainerStyle={styles.contentScrollView}>

                            <Row style={styles.rowTwo}>
                                <Col style={styles.rowTwo01}>
                                    <TextInput
                                        style={styles.textInput}
                                        value={payload.name}
                                        maxLength={28}
                                        placeholder="Username"
                                        textContentType="username"
                                        autoCompleteType="username"
                                        dataDetectorTypes="all"
                                        keyboardType="name-phone-pad"
                                        onChangeText={(char)=>{
                                            this.setStateObj({ payload:{ ...payload, name: char } })
                                        }}/>
                                    <TextInput
                                        style={styles.textInput}
                                        value={payload.password}
                                        maxLength={48}
                                        secureTextEntry={true}
                                        placeholder="Password"
                                        textContentType="password"
                                        autoCompleteType="password"
                                        dataDetectorTypes="all"
                                        keyboardType="name-phone-pad"
                                        onChangeText={(char)=>{
                                            this.setStateObj({ payload:{ ...payload, password: char } })
                                        }}/>
                                    <TextInput
                                        style={styles.textInput}
                                        value={payload.password_confirmation}
                                        maxLength={48}
                                        secureTextEntry={true}
                                        placeholder="Re-Type Password"
                                        textContentType="password"
                                        autoCompleteType="password"
                                        dataDetectorTypes="all"
                                        keyboardType="name-phone-pad"
                                        onChangeText={(char)=>{
                                            this.setStateObj({ payload:{ ...payload, password_confirmation: char } })
                                        }}/>
                                    <Row style={styles.buttonOneRow}>
                                        <TouchableOpacity
                                            style={styles.buttonOne}
                                            onPress={()=>{
                                                this.props.setLoader(true)
                                                this.updateProfile({ ...payload, action:'updateProfile' })
                                            }}>
                                            <Image source={require(auth_button)} style={{ width:widthPercentageToDP('100%'), height:heightPercentageToDP('10%') }}/>
                                        </TouchableOpacity>
                                    </Row>
                                </Col>
                            </Row>

                            </ScrollView>
                        </SafeAreaView>
                    </Row>

                    <Footer navigation={this.props.navigation} />

                </Col>
            </Grid>
        </>);
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

    rowTwo:{
        height: heightPercentageToDP('50%'),
        alignItems:'center',
    },
    rowTwo01:{
        height: heightPercentageToDP('45%'),
        alignItems:'center',
    },
    textInput:{
        height: heightPercentageToDP('7%'),
        width:widthPercentageToDP('95%'),
        paddingLeft:20,
        paddingRight:20,
        fontSize:24,
        borderRadius:25,
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        marginBottom:widthPercentageToDP('7%'),
    },
    buttonOneRow:{
        marginTop:widthPercentageToDP('0%'),
    },
    buttonOne:{
        width:widthPercentageToDP('95%'),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);