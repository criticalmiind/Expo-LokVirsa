import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Platform,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getData } from './../../Helpers/index';

import { splitArrayIntoChunksOfLen } from '../../Helpers';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import Footer from './../Component/footer';
import SearchBox from '../Component/searchBox';
import { Loader } from '../Component';
const logo = './../../Assets/Images/logo.png'
const bg = './../../Assets/Images/bg_768x1024.png'
const banner = './../../Assets/Images/banner.png'

const title_thumb_icon = './../../Assets/Icons/title_thumb_icon.png';
const play_icon = './../../Assets/Icons/play_icon.png';
const nav_menu_icon = './../../Assets/Icons/nav_menu_icon.png';

class Events extends React.Component {
    _isMounted = false;
    Loader = true;
    getData = getData.bind(this);
    constructor(props){
        super(props);
        this.state = {
            isShow:false,
            tempArray: this.props.navigation.getParam('data') ? this.props.navigation.getParam('data') : [],
            dataArray:[]
        }
    }

    UNSAFE_componentWillMount(){
        this._isMounted = true;
        if(this._isMounted){
            let shows = this.props.navigation.getParam('data');
            if(shows){
                this.setState({ ...this.state, dataArray: shows })
            }else{
                this.getBlogs()
            }
        }
    }

    getBlogs(){
        this.getData({}, 'events', (data)=>{
            if(this._isMounted){
                this.setState({ ...this.state, dataArray:data.data, tempArray:data.data })
            }
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }
    
    isOdd(num){
        return num % 2 == 0
    }

    filterData(data){
        this.setStateObj({ dataArray:data })
    }

    setStateObj(obj){
        if(this._isMounted){ this.setState({ ...this.state, ...obj }) }
    }

    render(){
        const { isLoader } = this.props;
        const { isShow } = this.state;

        const renderEvents = () => {
            if(this.state.dataArray.length > 0){
            let newList = splitArrayIntoChunksOfLen(this.state.dataArray, 2)
                return(
                    newList.map((row, index)=>{
                        return (
                            <Row style={styles.showRow} key={index}>
                                {
                                    row.map((item, i)=>{
                                        return renderDefualtData(item, i);
                                    })
                                }
                            </Row>
                        )
                    })
                )
            }else{
                return(
                    <Row style={styles.showLoader}>
                        <ActivityIndicator size="large" />
                    </Row>
                )
            }
        }

        const renderDefualtData = (item, i) => {
            if(item.image !== undefined && item.video !== undefined){
                return(
                    <Col key={i} style={styles.showRow01}>
                        <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.navigate('Player', { 
                                    data:{
                                        url: item.url === undefined ? item.video:item.url,
                                        name: item.name === undefined ? item.title:item.name,
                                    }
                                })
                            }}>
                            <Image source={require(title_thumb_icon)} style={styles.cardBg}/>
                            <ImageBackground source={{uri:`${item.image}`}} style={[styles.videoThumb]}>
                                <Image source={require(play_icon)}/>
                            </ImageBackground>
                            <Row style={styles.showContentView}>
                                <Text style={styles.showTitle}>{item.title}</Text>
                                {/* <Text style={styles.showCategory}>{item.content}</Text> */}
                            </Row>
                        </TouchableOpacity>
                    </Col>
                )
            }else{
                return(
                    <Col key={i} style={[styles.showRow01, ]}>
                        <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.replace('Player', {
                                    data:{
                                        url: item.url === undefined ? item.video:item.url,
                                        name: item.name === undefined ? item.title:item.name,
                                    }
                                })
                            }}>
                            <Image source={require(title_thumb_icon)} style={styles.cardBg}/>
                            <ImageBackground source={{uri:`${item.image}`}} style={[styles.videoThumb]}>
                                    <Image source={require(play_icon)}/>
                            </ImageBackground>
                            <Row style={styles.showContentView}>
                                <Text style={styles.showTitle}>{item.name}</Text>
                            </Row>
                        </TouchableOpacity>
                    </Col>
                )
            }
        }

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
                            <Image source={require(logo)} style={styles.logo}/>
                        </Col>

                        <SearchBox
                            tempArray={this.state.tempArray}
                            filterFun={this.filterData.bind(this)}
                            showSearchBox={(bolean)=>{ this.setStateObj({ isShow: bolean }) }}
                            isShow={this.state.isShow}/>
                    </Row>
                    <Row style={styles.headContainer02}>
                        <Image source={require(banner)} style={styles.headContainer02Img}/>
                        <Text style={styles.headContainer02Text}>Events</Text>
                    </Row>


                    <Row style={styles.contentContainer}>
                        <SafeAreaView style={styles.contentContainer01}>
                            <ScrollView contentContainerStyle={styles.contentScrollView}>
                                { renderEvents() }
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
                // marginBottom:35
            },
            android:{
                marginTop:32,
                // marginBottom:35
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
        // justifyContent:'center'
    },
    showRow01:{
        overflow:'hidden',
        borderRadius:6,
        borderColor:'gray',
        borderWidth:2,
        margin:widthPercentageToDP('1%'),
        width:widthPercentageToDP('48%'),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
