import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import Footer from '../Component/footer';
const logo = './../../Assets/Images/logo.png'
const bg = './../../Assets/Images/bg_768x1024.png'
const banner = './../../Assets/Images/banner.png'
const nav_menu_icon = './../../Assets/Icons/nav_menu_icon.png';
const search_icon = './../../Assets/Icons/search_icon.png';

class Disclaimer extends React.Component {
    _isMounted = false;
    Loader = true;
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            data:{ url:'', name:'' },
            privacyPolicy: {
                head:"Disclaimer:",
                p1:`Welcome to LOKVIRSA.  The terms and conditions of your use of this Site are explained below. These terms and conditions may be modernized or distorted without any notice to you.`,
                p2:`When you use this site you accept that you have understood the Terms of Use and that you agree to be bound by the same, which may be customized from time to time. LOKVIRSA takes no dependability for the content of external Internet sites. Other websites that we connect to are owned and operated by third parties and LOKVIRSA has no power over them. The reality that we comprise links to other websites does not mean that LOKVIRSA approves of, or supports, any other third party website or the content of that website. We admit no legal responsibility for any statements, information, products, or services that are published on, or are available through, any websites owned or operated by third parties. Links to other websites are put in for expediency only and do not make up the approval of resources on the linked websites.`,
                p4:`Nothing in the Terms limits or eliminates any assurance, warranties, illustration, or conditions roundabout or compulsory by law, as well as the Consumer Law (or any liability beneath them) which by law may not be partial or excluded. LOKVIRSA accepts no liability for the exactness, wholeness, expediency or otherwise, of the contents of any neither websites nor does it sanction any views expressed on any websites. Users are advised to confirm/check any information with the relevant Government department(s) and/or another source (s) and to get any suitable expert advice before acting on any other websites.`,
                
                head02:`Acceptance of the Terms:`,
                p5:`You agree to the Terms by leftover on the Website. You may also acknowledge the Terms by clicking to accept or have the same opinion to the Terms where this option is made obtainable to you by the Company in the user boundary.`,
                
                head03:`Copyright and Intellectual Property:`,
                p6:`The Website is subject to copyright. The material on the Website is secluded by copyright under the laws of the UK and through global treaties. Unless or else point out, all rights (counting copyright) in the content and collection of the Website (including but not restricted to text, graphics, logos, button icons, video images, audio clips, Website, code, scripts, design elements, and interactive features) or the content are owned or illegal for these purposes and are kept by the corporation or its contributors.`,
                
                cat1:`Privacy:`,
                p7:`The Company takes your privacy gravely and any information grant through your exploit of the Website and/or content is subject to the Company's Privacy Policy, which is accessible on the Website.`,

                head04:`Limitation of Liability:`,
                p8:`The Company's total legal responsibility arising out of or in association with the content or these Terms, however arising, as well as under contract, tort (plus negligence), in evenhandedness, under a decree or otherwise, will not go beyond the resupply of the content to you.`,
                p9:`You specifically comprehend and agree that Ecology and Heritage Partners, its affiliates, employees, agents, contributors, and licensors shall not be responsible to you for any direct, indirect, accompanying, special momentous or exemplary damages which may be incurred by you, however, caused and under any hypothesis of liability. This shall comprise but is not some degree of, any defeat of profit (whether incurred unswervingly or not directly), and thrashing of goodwill or business status, and any other elusive loss.`,

                head05:`Confidential:`,
                p10:`All communications relating to discussions made by the Parties arising out of and in association with this argument resolution section are secret and to the amount possible, have to be treated as "without discrimination" negotiations for applicable laws of verification.`,
            }
        }
    }

    async UNSAFE_componentWillMount(){
        this._isMounted = true;
        if(this._isMounted){
            let data = this.props.navigation.getParam('data')
            if(data){
                this.setState({ ...this.state, data: data });
            }
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    
    render(){
        const { privacyPolicy } = this.state;
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

                        <Col style={[styles.logoCol, { alignItems:'flex-end' }]}>
                            <TouchableOpacity
                                style={{ marginRight:25}}>
                                <Image source={require(search_icon)} style={{height:16, width:16}}/>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row style={styles.headContainer02}>
                        <Image source={require(banner)} style={styles.headContainer02Img}/>
                        <Text style={styles.headContainer02Text}>Disclaimer</Text>
                    </Row>


                    <Row style={styles.contentContainer}>
                        <SafeAreaView style={styles.contentContainer01}>
                            <ScrollView contentContainerStyle={styles.contentScrollView}>
                                <Col style={{ padding:10 }}>
                                    
                                    <Text style={{ fontSize:16, fontWeight:"bold", color:"#2a0b87", marginBottom:10 }}>Disclaimer:</Text>
                                    <Text style={[styles.paragraph, { fontWeight:"600" }]}>{privacyPolicy.p1}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p2}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p4}</Text>

                                    <Text style={[styles.cat, {fontSize:16, color:"#7030a0",}]}>{privacyPolicy.head02}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p5}</Text>
                                    
                                    <Text style={[styles.cat, {fontSize:16, color:"#872240",}]}>{privacyPolicy.head03}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p6}</Text>

                                    <Text style={[styles.cat, { color:"#2a0b87" }]}>{privacyPolicy.cat1}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p7}</Text>

                                    <Text style={[styles.cat, {fontSize:16, color:"#870b0b",}]}>{privacyPolicy.head04}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p8}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p9}</Text>
                                    
                                    <Text style={[styles.cat, {fontSize:16, color:"#2a0b87",}]}>{privacyPolicy.head05}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p10}</Text>

                                </Col>
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
    paragraph:{ fontSize:14, color:"#333333", marginBottom:10 },
    cat:{ fontSize:14, color:"#333333", fontWeight:'600', marginBottom:10 },


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
    
    // Shows
    showRow:{
        height:heightPercentageToDP('15%'),
        width:widthPercentageToDP('100%'),
        alignSelf:'center',
        justifyContent:'center'
    },
    showRow01:{
        overflow:'hidden',
        borderRadius:20,
        borderColor:'gray',
        borderWidth:2,
        margin:5,
        width:widthPercentageToDP('47%'),
    },
    cardBg:{
        height:'100%',
        width:'100%'
    },
    videoThumb:{
        position:'absolute',
        height:"68%",
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        resizeMode:'cover'
    },
    showContentView:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    showTitle:{
        position:'absolute',
        ...Platform.select({
            ios:{ bottom:15 },
            android:{ bottom:10 }
        }),
        fontSize:12,
        fontWeight:'600',
        color:"gray"
    },
    showCategory:{
        position:'absolute',
        ...Platform.select({
            ios:{ bottom:3 },
            android:{ bottom:0 }
        }),
        fontSize:10,
        fontWeight:'600',
        color:"gray",
    },
    showLoader:{
        alignItems:'center',
        justifyContent:'center',
        height:heightPercentageToDP('55%')
    },
    // Shows

    // Footer
    footerContainer:{
        position:'absolute',
        bottom:0,
        backgroundColor:'#FFF',
        justifyContent:'space-around',
        width:widthPercentageToDP('100%'),
        ...Platform.select({
            ios:{
                height:heightPercentageToDP('8%'),
            },
            android:{
                height:heightPercentageToDP('10%'),
            }
        }),
        paddingRight:10,
        paddingLeft:10,
    },
    buttomBtns:{
        padding:15
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Disclaimer);
