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

class PrivacyPolicy extends React.Component {
    _isMounted = false;
    Loader = true;
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            data:{ url:'', name:'' },
            privacyPolicy: {
                head:"Privacy Notes:",
                p1:`The LOKVIRSA TV Web Site (the "Site") is an online information service provided by www.lokvirsa.tv (" LOKVIRSA TV"), subject to your compliance with the terms and conditions set forth below.`,
                p2:`PLEASE READ THIS DOCUMENT CAREFULLY BEFORE ACCESSING OR USING THE SITE. BY ACCESSING OR USING THE SITE, YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS SET FORTH BELOW. IF YOU DO NOT WISH TO BE BOUND BY THESE TERMS AND CONDITIONS, YOU MAY NOT ACCESS OR USE THE SITE. LOKVIRSA TV MAY MODIFY THIS AGREEMENT AT ANY TIME, AND SUCH MODIFICATIONS SHALL BE EFFECTIVE IMMEDIATELY UPON POSTING OF THE MODIFIED AGREEMENT ON THE SITE. YOU AGREE TO REVIEW THE AGREEMENT PERIODICALLY TO BE AWARE OF SUCH MODIFICATIONS AND YOUR CONTINUED ACCESS OR USE OF THE SITE SHALL BE DEEMED YOUR CONCLUSIVE ACCEPTANCE OF THE MODIFIED AGREEMENT.`,
                cat1:`1. Copyright, Licenses and Idea Submissions.`,
                p4:`The entire contents of the Site are protected by international copyright and trademark laws. The owner of the copyrights and trademarks are LOKVIRSA TV, its affiliates or other third party licensors. YOU MAY NOT MODIFY, COPY, REPRODUCE, REPUBLISH, UPLOAD, POST, TRANSMIT, OR DISTRIBUTE, IN ANY MANNER, THE MATERIAL ON THE SITE, INCLUDING TEXT, GRAPHICS, CODE AND/OR SOFTWARE. You may print and download portions of material from the different areas of the Site solely for your own non-commercial use provided that you agree not to change or delete any copyright or proprietary notices from the materials. You agree to grant to LOKVIRSA TV a non-exclusive, royalty-free, worldwide, perpetual license, with the right to sub-license, to reproduce, distribute, transmit, create derivative works of, publicly display and publicly perform any materials and other information (including, without limitation, ideas contained therein for new or improved products and services) you submit to any public areas of the Site (such as bulletin boards, forums and newsgroups) or by e-mail to LOKVIRSA TV by all means and in any media now known or hereafter developed. You also grant to LOKVIRSA TV the right to use your name in connection with the submitted materials and other information as well as in connection with all advertising, marketing and promotional material related thereto. You agree that you shall have no recourse against LOKVIRSA TV for any alleged or actual infringement or misappropriation of any proprietary right in your communications to LOKVIRSA TV.`,
                trademark:`TRADEMARKS:`,
                p5:`Publications, products, content or services referenced herein or on the Site are the exclusive trademarks or service marks of LOKVIRSA TV. Other product and company names mentioned in the Site may be the trademarks of their respective owners.`,
                cat2:`2. Use of the Site:`,
                p6:`You understand that, except for information, products or services clearly identified as being supplied by LOKVIRSA TV, LOKVIRSA TV does not operate, control or endorse any information, products or services on the Internet in any way. Except for LOKVIRSA TV- identified information, products or services, all information, products and services offered through the Site or on the Internet generally are offered by third parties that are not affiliated with LOKVIRSA TV. You also understand that LOKVIRSA TV cannot and does not guarantee or warrant that files available for downloading through the Site will be free of infection or viruses, worms, Trojan horses or other code that manifest contaminating or destructive properties. You are responsible for implementing sufficient procedures and checkpoints to satisfy your particular requirements for accuracy of data input and output, and for maintaining a means external to the Site for the reconstruction of any lost data.`,
                p7:`YOU ASSUME TOTAL RESPONSIBILITY AND RISK FOR YOUR USE OF THE SITE AND THE INTERNET. LOKVIRSA TV PROVIDES THE SITE AND RELATED INFORMATION "AS IS" AND DOES NOT MAKE ANY EXPRESS OR IMPLIED WARRANTIES, REPRESENTATIONS OR ENDORSEMENTS WHATSOEVER (INCLUDING WITHOUT LIMITATION WARRANTIES OF TITLE OR NONINFRINGEMENT, OR THE IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE) WITH REGARD TO THE SERVICE, ANY MERCHANDISE INFORMATION OR SERVICE PROVIDED THROUGH THE SERVICE OR ON THE INTERNET GENERALLY, AND LOKVIRSA TV SHALL NOT BE LIABLE FOR ANY COST OR DAMAGE ARISING EITHER DIRECTLY OR INDIRECTLY FROM ANY SUCH TRANSACTION. IT IS SOLELY YOUR RESPONSIBILITY TO EVALUATE THE ACCURACY, COMPLETENESS AND USEFULNESS OF ALL OPINIONS, ADVICE, SERVICES, MERCHANDISE AND OTHER INFORMATION PROVIDED THROUGH THE SERVICE OR ON THE INTERNET GENERALLY. LOKVIRSA TV DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE OR THAT DEFECTS IN THE SERVICE WILL BE CORRECTED.`,
                p8:`YOU UNDERSTAND FURTHER THAT THE PURE NATURE OF THE INTERNET CONTAINS UNEDITED MATERIALS SOME OF WHICH ARE SEXUALLY EXPLICIT OR MAY BE OFFENSIVE TO YOU. YOUR ACCESS TO SUCH MATERIALS IS AT YOUR RISK. LOKVIRSA TV HAS NO CONTROL OVER AND ACCEPTS NO RESPONSIBILITY WHATSOEVER FOR SUCH MATERIALS.`,
                limitation:`LIMITATION OF LIABILITY:`,
                p9:`IN NO EVENT WILL LOKVIRSA TV BE LIABLE FOR (I) ANY INCIDENTAL, CONSEQUENTIAL, OR INDIRECT DAMAGES (INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, BUSINESS INTERRUPTION, LOSS OF PROGRAMS OR INFORMATION, AND THE LIKE) ARISING OUT OF THE USE OF OR INABILITY TO USE THE SERVICE, OR ANY INFORMATION, OR TRANSACTIONS PROVIDED ON THE SERVICE, OR DOWNLOADED FROM THE SERVICE, OR ANY DELAY OF SUCH INFORMATION OR SERVICE. EVEN IF LOKVIRSA TV OR ITS AUTHORIZED REPRESENTATIVES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, OR (II) ANY CLAIM ATTRIBUTABLE TO ERRORS, OMISSIONS, OR OTHER INACCURACIES IN THE SERVICE AND/OR MATERIALS OR INFORMATION DOWNLOADED THROUGH THE SERVICE. BECAUSE SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IN SUCH STATES, LOKVIRSA TV LIABILITY IS LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.`,
                p10:`LOKVIRSA TV makes no representations whatsoever about any other web site which you may access through this one or which may link to this Site. When you access a TV web site, please understand that it is independent from LOKVIRSA TV, and that LOKVIRSA TV has no control over the content on that web site. In addition, a link to a LOKVIRSA TV web site does not mean that LOKVIRSA TV endorses or accepts any responsibility for the content, or the use, of such web site.`,
                cat3:`3. Indemnification.`,
                p11:`You agree to indemnify, defend and hold harmless LOKVIRSA TV, its officers, directors, employees, agents, licensors, suppliers and any third party information providers to the Service from and against all losses, expenses, damages and costs, including reasonable attorneys' fees, resulting from any violation of this Agreement (including negligent or wrongful conduct) by you or any other person accessing the Service.`,
                cat4:`4. Third Party Rights.`,
                p12:`The provisions of paragraphs 2 (Use of the Service), and 3 (Indemnification) are for the benefit of LOKVIRSA TV and its officers, directors, employees, agents, licensors, suppliers, and any third party information providers to the Service. Each of these individuals or entities shall have the right to assert and enforce those provisions directly against you on its own behalf.`,
                cat5:`5. Term; Termination.`,
                p13:`This Agreement may be terminated by either party without notice at any time for any reason. The provisions of paragraphs 1 (Copyright, Licenses and Idea Submissions), 2 (Use of the Service), 3 (Indemnification), 4 (Third Party Rights) and 6 (Miscellaneous) shall survive any termination of this Agreement.`,
                cat6:`6. Miscellaneous.`,
                p14:`This Agreement shall all be governed and construed in accordance with the laws of United Kingdom applicable to agreements made and to be performed in United Kingdom. You agree that any legal action or proceeding between LOKVIRSA TV and you for any purpose concerning this Agreement or the parties' obligations hereunder shall be brought exclusively in a federal or state court of competent jurisdiction sitting in United Kingdom. Any cause of action or claim you may have with respect to the Service must be commenced within one (1) year after the claim or cause of action arises or such claim or cause of action is barred. LOKVIRSA TV's failure to insist upon or enforce strict performance of any provision of this Agreement shall not be construed as a waiver of any provision or right. Neither the course of conduct between the parties nor trade practice shall act to modify any provision of this Agreement. LOKVIRSA TV may assign its rights and duties under this Agreement to any party at any time without notice to you.`,
                notes:`Any rights not expressly granted herein are reserved.`,
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
                        <Text style={styles.headContainer02Text}>Privacy Policy</Text>
                    </Row>


                    <Row style={styles.contentContainer}>
                        <SafeAreaView style={styles.contentContainer01}>
                            <ScrollView contentContainerStyle={styles.contentScrollView}>
                                <Col style={{ padding:10 }}>
                                    <Text style={{ fontSize:16, fontWeight:"bold", color:"#7030a0", marginBottom:10 }}>Privacy Notes:</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p1}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p2}</Text>

                                    <Text style={styles.cat}>{privacyPolicy.cat1}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p4}</Text>

                                    <Text style={[styles.cat, {fontSize:16, color:"#7030a0",}]}>{privacyPolicy.trademark}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p5}</Text>
                                    
                                    <Text style={styles.cat}>{privacyPolicy.cat2}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p6}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p7}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p8}</Text>

                                    <Text style={[styles.cat, {fontSize:16,}]}>{privacyPolicy.limitation}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p9}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p10}</Text>

                                    <Text style={styles.cat}>{privacyPolicy.cat3}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p11}</Text>

                                    <Text style={styles.cat}>{privacyPolicy.cat4}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p12}</Text>

                                    <Text style={styles.cat}>{privacyPolicy.cat5}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p13}</Text>

                                    <Text style={styles.cat}>{privacyPolicy.cat6}</Text>
                                    <Text style={styles.paragraph}>{privacyPolicy.p14}</Text>

                                    <Text style={[styles.paragraph, {  }]}>{privacyPolicy.notes}</Text>


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

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
