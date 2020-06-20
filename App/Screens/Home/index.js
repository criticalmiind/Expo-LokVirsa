import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Platform,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import { splitArrayIntoChunksOfLen } from '../../Helpers';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import { getData } from './../../Helpers/index';
import { showMessage } from 'react-native-flash-message';
import { Loader } from '../Component';

const fb = './../../Assets/Icons/fb.png';
const youtube = './../../Assets/Icons/youtube.png';
const twitter = './../../Assets/Icons/twitter.png';
const instagram = './../../Assets/Icons/instagram.png';
const live_icon = './../../Assets/Icons/live_icon.png';
const share_icon = './../../Assets/Icons/share_icon.png';
const like_icon = './../../Assets/Icons/like_icon.png';
const show_icon = './../../Assets/Icons/show_icon.png';
const category_bg = './../../Assets/Icons/category_bg.png';
const sub_banner = './../../Assets/Icons/sub_banner.png';
const arrow_left = './../../Assets/Icons/arrow_left.png';
const arrow_right = './../../Assets/Icons/arrow_right.png';

const logo = './../../Assets/Images/logo.png'
const content_bg = './../../Assets/Images/bg_400x400.png'
const head_banner = './../../Assets/Images/head_banner_640x88.png'

class Home extends React.Component {
    scrollIndex = 0;
    Loader = true;
    _isMounted = false;
    getData = getData.bind(this);
    constructor(props){
        super(props);
        this.state = {
            liveData: [{ url:'', name:'' }],
            categories:[],
            eventslist:[],
            showsLoader:true,
            catLoader:false,
            isLoader: false
        }
    }

    async UNSAFE_componentWillMount(){
        this._isMounted = true;
        this.getCategories()
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    getCategories(){
        this.setStateData({ showsLoader:true, categoryLoader:true })
        this.getData({}, 'categories', (data)=>{
            const { streaming, categories } = data.data;
            let cat = [], events = [];
            console.log("Category : ", data, streaming, categories)

            if(!data.error || (streaming && categories)){
                categories.map(item=>{
                    if(item.image === "" || item.image === undefined){
                        cat.push(item);
                    }else{
                        events.push(item);
                    }
                })
            }
            this.setStateData({ ...this.state, categories: cat, eventslist: events, liveData:streaming })
            this.setStateData({ showsLoader:false, categoryLoader:false })
        })
    }

    getCategoryDetail(slug){
        this.setState({ ...this.state, isLoader: true });
        this.getData({category: slug}, 'streaming', (data)=>{
            if(data.data){
                console.log("Stream : ", data)
                this.setState({ ...this.state, isLoader: false })
                if(data.data.length > 0){
                    this.props.navigation.replace("Events", {  data: data.data })
                }else{
                    showMessage({ message:data.message, type:'warning' })
                }
            }
        })
    }

    setStateData(obj){
        if(this._isMounted){
            this.setState({
                ...this.state,
                ...obj
            })
        }
    }

    scrollToLeft = (value) => {
        if(this.scrollIndex > 0){
            this.scrollIndex = parseInt(this.scrollIndex) - (value);
            this.flatListRef.scrollToIndex({ animated: true, index: this.scrollIndex })
        }
    }

    scrollToRight = (value) => {
        if(this.scrollIndex < this.state.categories.length-1){
            this.scrollIndex = parseInt(this.scrollIndex) + (value);
            this.flatListRef.scrollToIndex({ animated: true, index: this.scrollIndex })
        }
    }

    render(){
        const { liveData, categories, categoryLoader, isLoader } = this.state;
        const _renderCategories = () => {
            if(categories.length !== 0){
                return (<>
                    <TouchableOpacity onPress={()=>{ this.scrollToLeft(1) }}>
                        <Image source={require(arrow_left)} style={{ height:20, width:13, marginRight:5, marginLeft:5 }}/>
                    </TouchableOpacity>
                    <FlatList
                        horizontal
                        ref={(ref) => { this.flatListRef = ref; }}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={categories}
                        renderItem={({item}) =>{
                            if(item.image === "" || item.image === undefined){
                                return(
                                    <View style={styles.carouselView}>
                                        <TouchableOpacity
                                            style={styles.carouselView}
                                            onPress={() => {
                                                this.getCategoryDetail(item.slug)
                                            }}>
                                                <Text>{item.name.toUpperCase()}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        }}/>
                    
                    <TouchableOpacity onPress={()=>{ this.scrollToRight(1) }}>
                        <Image source={require(arrow_right)} style={{ height:20, width:13, marginRight:5, marginLeft:5 }}/>
                    </TouchableOpacity>
                </>)
            }else{
                return(
                    <Row style={{ width:widthPercentageToDP('89%'), alignItems:'center', justifyContent:'center' }}>
                        { categoryLoader ? <ActivityIndicator size='large' /> : <Text>Categories not found!</Text> }
                    </Row>
                )
            }
        }

        const _renderShowsList = () => {
            const { showsLoader, eventslist } = this.state;
            if(eventslist.length !== 0){
                let newCategoriesList = splitArrayIntoChunksOfLen(eventslist, 4)
                return (
                    newCategoriesList.map((row, index)=>{
                        return(<Row style={styles.contentRow} key={index}>
                            {
                                row.map((item, i)=>{
                                    if(item.image !== '' && item.image !== undefined){
                                        return(
                                            <TouchableOpacity
                                                style={styles.contentCol}
                                                key={i}
                                                onPress={()=>{
                                                    this.getCategoryDetail(item.slug)
                                                }}>
                                                <Image source={require(category_bg)} style={styles.categoryBg}/>
                                                <Image source={{ uri:`${item.image}` }} style={styles.contentBtnImg}/>
                                                <View style={styles.showBtnTextView}>
                                                    <Text style={styles.contentBtnText}>{item.name.toUpperCase()}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                })
                            }
                        </Row>)
                    })
                )
            }else{
                return(
                    <Row style={{ width:widthPercentageToDP('100%'), height:heightPercentageToDP('30%'), alignItems:'center', justifyContent:'center' }}>
                        { showsLoader ? (<ActivityIndicator size='large' />):(<Text>Events not found!</Text>)}
                    </Row>
                )
            }
        }

        const _renderWebView = () =>{
            if(this.props.navigation.isFocused()){
                if(liveData[0].url !== '' && liveData[0].url !== undefined){
                    return(
                        <WebView
                            style={{backgroundColor: 'black'}}
                            ref={(ref) => { this.videoPlayer = ref;}}
                            contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                            startInLoadingState={this.Loader}
                            allowsInlineMediaPlayback={false}
                            scrollEnabled={false}
                            onLoadEnd={(e)=>{ this.Loader = false }}
                            // useWebKit={true}
                            originWhitelist={['*']}
                            source={{
                                html:
                                `<iframe src="${liveData[0].url}"
                                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="false"
                                    />`
                            }}/>
                    )
                }else{
                    return (
                        <Row style={{ width:widthPercentageToDP('89%'), alignItems:'center', justifyContent:'center' }}>
                            <ActivityIndicator size='large' />
                        </Row>
                    )
                }
            }
        }

        return (<>
            <Loader isLoader={isLoader} />
            <Grid style={styles.mainContainer}>
                <Col>
                    <Row style={styles.headContainer}>
                        <Image source={require(head_banner)} style={styles.headBanner}/>
                        <Col style={styles.logoCol}>
                            <TouchableOpacity onPress={()=>{ this.props.navigation.toggleDrawer() }}>
                                <Image source={require(logo)} style={styles.logo}/>
                            </TouchableOpacity>
                        </Col>
                        <Col style={styles.logoCol}>
                        </Col>
                        <Col style={styles.socialMediaCol}>
                            <Row style={{ alignItems:'center'}}>
                                <Text style={styles.findUsText}>FIND US</Text>
                                <TouchableOpacity>
                                    <Image source={require(fb)} style={{ height:16, width:16 }}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={require(instagram)} style={{ height:16, width:16 }}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={require(twitter)} style={{ height:16, width:16 }}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={require(youtube)} style={{ height:16, width:16 }}/>
                                </TouchableOpacity>
                            </Row>
                        </Col>
                    </Row>

                    <Row style={styles.liveStreamContainer}>
                        <Image source={require(live_icon)} style={styles.liveIcon}/>
                        <Image source={require(share_icon)} style={styles.shareIcon}/>
                        <Image source={require(like_icon)} style={styles.likeIcon}/>
                        { _renderWebView() }
                    </Row>

                    <Row style={styles.secondHeadContainer}>
                        <Image source={require(sub_banner)} style={styles.secondHeadBanner}/>
                        { _renderCategories() }
                    </Row>

                    <Row style={styles.contentContainer}>
                        <Image source={require(content_bg)} style={styles.secondHeadBg}/>
                        <SafeAreaView style={styles.contentContainer01}>
                            <ScrollView style={{ marginTop:heightPercentageToDP('2%'), marginBottom:heightPercentageToDP('6%') }}>
                                { _renderShowsList() }
                            </ScrollView>
                        </SafeAreaView>
                    </Row>

                    <Row style={styles.footerContainer}>
                            <TouchableOpacity>
                                <Text>Home</Text>
                            </TouchableOpacity>
                            <Text>|</Text>
                            <TouchableOpacity>
                                <Text>Privacy Policy</Text>
                            </TouchableOpacity>
                            <Text>|</Text>
                            <TouchableOpacity>
                                <Text>Disclaimer</Text>
                            </TouchableOpacity>
                            <Text>|</Text>
                            <TouchableOpacity>
                                <Text>Contect us</Text>
                            </TouchableOpacity>
                    </Row>
                </Col>
            </Grid>
        </>);
    }
};

const styles = StyleSheet.create({
    // Head Start
    headContainer:{
        backgroundColor: "#FFF6CA",
        height:heightPercentageToDP('8%'),
    },
    headBanner:{
        position:'absolute'
    },
    logoCol:{
        alignItems:'center',
        justifyContent:'center',
    },
    logo:{
        width: 85,
        height: 50,
    },
    logoUrdu:{
        width: 130,
        height: 40,
    },
    socialMediaCol:{
        alignItems:'center',
        justifyContent:'center',
    },
    findUsText:{
        fontSize: 8,
        color:'gray',
        paddingRight:5,
        paddingTop:2
    },
    socialMediaRow:{
        alignItems:'flex-start',
        borderTopWidth:1,
        borderColor:'gray',
        paddingTop:3,
        marginTop:3
    },
    // Head end
    // Live Start
    liveStreamContainer:{
        height:heightPercentageToDP('35%'),
        alignItems:'center',
        justifyContent:'center'
    },
    liveIcon:{
        position:'absolute',
        height:26,
        width:35,
        ...Platform.select({
            ios:{ top:10, },
            android:{ top:40, }
        }),
        left:10,
        zIndex:1
    },
    shareIcon:{
        position:'absolute',
        height:16,
        width:16,
        bottom:20,
        right:50,
        zIndex:1
    },
    likeIcon:{
        position:'absolute',
        height:16,
        width:16,
        bottom:20,
        right:20,
        zIndex:1
    },
    // backgroundVideo: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    // },
    // Live end

    // Second Head Start
    secondHeadContainer:{
        backgroundColor:'#FFF6CA',
        height:heightPercentageToDP('8%'),
        alignItems:'center'
    },
    secondHeadBg:{
        height:"100%",
        width:"100%",
        position:'absolute'
    },
    secondHeadBanner:{
        height:'100%',
        width:widthPercentageToDP('100%'),
        opacity:0.5,
        position:'absolute',
        justifyContent:'center'
    },
    mainContainer:{
        ...Platform.select({
            ios:{
                marginTop:35,
                marginBottom:35
            },
            android:{
                marginTop:35,
                // marginBottom:35
            },
        }),
    },
    // Second Head End

    carouselView:{
        padding:2,
        height:heightPercentageToDP('3.5%'),
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        margin:4,
        alignSelf:'center',
        backgroundColor:'#FFB30F'
    },

    // Content Start
    contentContainer:{
        justifyContent:'center',
        alignItems:'center',
        // height:heightPercentageToDP('42%'),
        // height:'45%'
    },
    contentContainer01:{
        justifyContent:'center',
        alignItems:'center',
    },
    contentRow:{
        height:heightPercentageToDP('11.2%'),
        width:widthPercentageToDP('96%'),
        alignSelf:'center',
        justifyContent:'center'
    },
    contentCol:{
        height:heightPercentageToDP('10%'),
        width:heightPercentageToDP('11.2%'),
        justifyContent:'flex-end',
        alignItems:'center',
    },
    categoryBg:{
        height:heightPercentageToDP('10%'),
        width:heightPercentageToDP('10%'),
        position:'absolute',
        zIndex:0
    },
    contentBtnText:{
        fontSize:10,
        overflow:'hidden'
    },
    contentBtnImg:{
        ...Platform.select({
            ios:{
                width: 48,
                height: 48,
            },
            android:{
                width: 38,
                height: 38,
            }
        }),
        borderRadius: 6,
        position:'absolute',
        top:heightPercentageToDP('1.1%')
    },
    showBtnTextView:{
        overflow:'hidden',
        height:16,
        width:'70%',
        bottom:heightPercentageToDP('0.8%'),
        alignItems:'center',
    },
    // Content End

    // Footer
    footerContainer:{
        backgroundColor:'#FFB30F',
        justifyContent:'space-around',
        alignItems:'center',
        width:widthPercentageToDP('100%'),
        height:heightPercentageToDP('5.5%'),
        position:'absolute',
        bottom:0,
        paddingRight:30,
        paddingLeft:30,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
