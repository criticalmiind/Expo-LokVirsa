import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  ImageBackground
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from './../../Redux/Actions/userActions';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { authentication } from './../../Helpers/index';
import { Loader } from '../Component';

const bg = './../../Assets/Images/bg_768x1024.png'
const auth_button = './../../Assets/Icons/auth_button.png';
const logo = './../../Assets/Images/logo.png'

class Signin extends React.Component {
    authentication = authentication.bind(this);
    Loader = true;
    constructor(props){
        super(props);
        this.state = {
            payload:{ name:'', password:'' }
        }
    }

    UNSAFE_componentWillMount(){
        this.props.setLoader(false)
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
            <Grid style={styles.mainContainer}>
            <Loader isLoader={isLoader} />

                <ImageBackground source={require(bg)} style={[styles.mainContainer, { height:'100%' }]}>
                        
                    <Row style={styles.rowOne}><Text style={styles.rowOneText}>Login</Text></Row>

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
                                secureTextEntry={true}
                                placeholder="Password"
                                textContentType="password"
                                autoCompleteType="password"
                                dataDetectorTypes="all"
                                keyboardType="name-phone-pad"
                                onChangeText={(char)=>{
                                    this.setPayload({ password: char })
                                }}/>
                            <Row style={styles.buttonOneRow}>
                                <TouchableOpacity
                                    style={styles.buttonOne}
                                    onPress={()=>{
                                        this.props.setLoader(true)
                                        this.authentication({ ...payload, action:'signIn' })
                                    }}>
                                    <Image source={require(auth_button)} style={{ width:widthPercentageToDP('100%'), height:heightPercentageToDP('10%') }}/>
                                </TouchableOpacity>
                            </Row>
                            <Row style={styles.forgotPwd}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.props.navigation.replace("Signup")
                                    }}>
                                    <Text style={styles.forgotPwdText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </Row>
                            <Row style={styles.rowThreeBtn}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.props.navigation.replace("Signup")
                                    }}>
                                    <Text style={styles.rowThreeText}>Register</Text>
                                </TouchableOpacity>
                            </Row>
                            
                        </Col>
                    </Row>

                    <Row style={styles.rowThree}><Image source={require(logo)} style={styles.footerLogo}/></Row>
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
    headContainer:{
        backgroundColor: "#FFF6CA",
        height:heightPercentageToDP('8%'),
    },
    bg:{
        ...Platform.select({
            android:{ marginTop:32 }
        }),
        height: heightPercentageToDP('100%'),
        width:widthPercentageToDP('100%'),
        resizeMode: 'cover',
        position:'absolute',
        zIndex:0
    },
    rowOne:{
        height: heightPercentageToDP('20%'),
        alignItems:'flex-end',
        justifyContent:'center',
    },
    rowOneText:{
        fontSize: 40,
        fontWeight:'400'
    },
    rowTwo:{
        height: heightPercentageToDP('60%'),
        alignItems:'center',
    },
    rowTwo01:{
        height: heightPercentageToDP('60%'),
        alignItems:'center',
        marginTop:heightPercentageToDP('20%')
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
        marginBottom:widthPercentageToDP('8%'),
    },
    buttonOneRow:{
        marginTop:widthPercentageToDP('9%'),
    },
    buttonOne:{
        width:widthPercentageToDP('95%'),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    },
    rowThree:{
        height:heightPercentageToDP('20%'),
        alignItems:'center',
        justifyContent:'center',
    },
    forgotPwd:{
        marginTop:heightPercentageToDP('5%'),
        height:heightPercentageToDP('2%')
    },
    forgotPwdText:{
        fontSize:16,
        color:'#757575'
    },
    rowThreeBtn:{
        marginTop:heightPercentageToDP('1%'),
    },
    rowThreeText:{
        fontSize:16,
    },
    footerLogo:{
        height: heightPercentageToDP('8%'),
        width: widthPercentageToDP('28%'),
        alignSelf:'center'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
