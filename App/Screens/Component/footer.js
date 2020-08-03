import React from 'react';
import {
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';

import HomeIcon from './../../Assets/svg/home.svg';
import VideosIcon from './../../Assets/svg/videos.svg';
import MenuIcon from './../../Assets/svg/bottom_menu.svg';
import SearchIcon from './../../Assets/svg/bottom_search.svg';
import FeedbackIcon from './../../Assets/svg/feedback.svg';

const bottom_home = './../../Assets/Icons/bottom_home.png';
const bottom_video = './../../Assets/Icons/bottom_video.png';
const bottom_menu = './../../Assets/Icons/bottom_menu.png';
const bottom_search = './../../Assets/Icons/bottom_search.png';
const bottom_message = './../../Assets/Icons/bottom_message.png';

class Footer extends React.Component {
    constructor(props){
        super(props);
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
        const { navigation } = this.props
        return (
            <Row style={styles.footerContainer}>
                <TouchableOpacity
                    style={styles.buttomBtns}
                    onPress={()=>{
                        navigation.navigate('Home')
                    }}>
                        <HomeIcon />
                    {/* <Image source={require(bottom_home)} style={{height:23, width:23}}/> */}
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.buttomBtns}
                    onPress={()=>{

                    }}>
                        <VideosIcon />
                    {/* <Image source={require(bottom_video)} style={{height:23, width:23}}/> */}
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.buttomBtns}
                    onPress={()=>{

                    }}>
                        <MenuIcon />
                    {/* <Image source={require(bottom_menu)} style={{height:25, width:25}}/> */}
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.buttomBtns}
                    onPress={()=>{

                    }}>
                        <SearchIcon />
                    {/* <Image source={require(bottom_search)} style={{height:23, width:23}}/> */}
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.buttomBtns}
                    onPress={()=>{

                    }}>
                        <FeedbackIcon />
                    {/* <Image source={require(bottom_message)} style={{height:23, width:23}}/> */}
                </TouchableOpacity>
            </Row>
        );
    }
};

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);