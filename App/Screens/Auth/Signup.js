import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  Platform,
  ImageBackground
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from './../../Redux/Actions/userActions';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { authentication } from './../../Helpers/index';
import { Loader } from '../Component';

const bg = './../../Assets/Images/bg_768x1024.png';
const auth_button = './../../Assets/Icons/auth_button.png';
// const logo = './../../Assets/Images/logo.png';
import LogoIcon from './../../Assets/svg/Logo.svg';

class Signup extends React.Component {
    authentication = authentication.bind(this);
    Loader = true;
    constructor(props){
        super(props);
        this.state = {
            payload:{
                name:'',
                password:'',
                password_confirmation:'',
            }
        }
    }

    setPayload(obj){
        this.setState({
            ...this.state,
            payload:{
                ...this.state.payload,
                ...obj
            }
        })
    }

    render(){
        const { payload } = this.state;
        const { isLoader } = this.props;
        return (<>
            <Loader isLoader={isLoader} />
            <Grid style={[styles.mainContainer, { backgroundColor:'pink' }]}>
                <ImageBackground source={require(bg)} style={[styles.mainContainer, { height:'100%' }]}>
                        <Row style={styles.rowOne}><Text style={styles.rowOneText}>Register</Text></Row>
                        
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
                                        this.setPayload({ name: char })
                                    }}/>
                                <TextInput
                                    style={styles.textInput}
                                    value={payload.password}
                                    maxLength={48}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    textContentType="password"
                                    autoCompleteType="password"
                                    dataDetectorTypes="all"
                                    keyboardType="name-phone-pad"
                                    onChangeText={(char)=>{
                                        this.setPayload({ password: char })
                                    }}/>
                                <TextInput
                                    style={styles.textInput}
                                    value={payload.password_confirmation}
                                    maxLength={48}
                                    placeholder="Confirm Password"
                                    secureTextEntry={true}
                                    textContentType="password"
                                    autoCompleteType="password"
                                    dataDetectorTypes="all"
                                    keyboardType="name-phone-pad"
                                    onChangeText={(char)=>{
                                        this.setPayload({ password_confirmation: char })
                                    }}/>
                                <Row style={styles.buttonOneRow}>
                                    <TouchableOpacity
                                        style={styles.buttonOne}
                                        onPress={()=>{
                                            this.authentication({ ...payload, action:'signUp' })
                                        }}>
                                        <Image source={require(auth_button)} style={{ width:widthPercentageToDP('100%'), height:heightPercentageToDP('10%') }}/>
                                    </TouchableOpacity>
                                </Row>
                                <Row style={styles.rowThreeBtn}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.props.navigation.replace("Signin")
                                        }}>
                                        <Text style={styles.rowThreeText}>Existing Account ?</Text>
                                    </TouchableOpacity>
                                </Row>
                            </Col>
                        </Row>
                        
                        <Row style={styles.rowThree}>
                            {/* <Image source={require(logo)} style={styles.footerLogo}/> */}
                            <Row style={styles.footerLogo}>
                                <LogoIcon />
                            </Row>
                        </Row>
                </ImageBackground>
            </Grid>
        </>);
    }
};

const styles = StyleSheet.create({
    // Head Start
    mainContainer:{
        height:heightPercentageToDP('100%'),
        width:widthPercentageToDP('100%')
    },
    bg:{
        ...Platform.select({
            android:{ marginTop:32 }
        }),
        height: heightPercentageToDP('100%'),
        width:widthPercentageToDP('100%'),
        resizeMode: 'cover',
        position:'absolute',
    },
    rowOne:{
        height: heightPercentageToDP('20%'),
        alignItems:'flex-end',
        justifyContent:'center'
    },
    rowOneText:{
        fontSize: 40,
        fontWeight:'400'
    },
    rowTwo:{
        height: heightPercentageToDP('60%'),
        alignItems:'center',
        ...Platform.select({
            ios:{ marginBottom:heightPercentageToDP('3%') },
            android:{ marginBottom:heightPercentageToDP('5%') }
        })
    },
    rowTwo01:{
        height: heightPercentageToDP('60%'),
        alignItems:'center',
        marginTop:heightPercentageToDP('20%'),
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
        marginBottom:widthPercentageToDP('8%')
    },
    buttonOneRow:{
        marginTop:widthPercentageToDP('8%'),
    },
    buttonOne:{
        width:widthPercentageToDP('95%'),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    },
    rowThree:{
        height:heightPercentageToDP('20%'),
        width:widthPercentageToDP('100%'),
        justifyContent:'center',
    },
    rowThreeBtn:{
        // marginTop:heightPercentageToDP('4%'),
    },
    rowThreeText:{
        fontSize:16,
        color:'#757575'
    },
    footerLogo:{
        height: "80%",
        width: "100%",
        justifyContent:'center',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);