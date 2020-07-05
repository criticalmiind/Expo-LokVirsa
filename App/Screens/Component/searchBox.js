import React from 'react';
import {
  StyleSheet,
  Image,
  Platform,
  TextInput
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
const search_icon = './../../Assets/Icons/search_icon.png';

const SearchBox = ({ filterFun=()=>{}, isShow=false, tempArray=[], showSearchBox=()=>{} }) => {

    const searchString = (char) => {
        var matches = []
        if (char !== "") {
                matches = tempArray.filter(function(value){
                    if(value) {
                        if (value.title) {
                            return (value.title.toLowerCase().substring(0, char.length) === char);
                        }
                        if (value.name) {
                            return (value.name.toLowerCase().substring(0, char.length) === char);
                        }
                    }
                });
        }else{
            matches = tempArray
        }
        filterFun(matches)
    }

        if (isShow) {
            return (<>
                <Col style={[styles.logoCol, { alignItems:'flex-end' }]}>
                    <TouchableOpacity
                        style={{ marginRight:25}}
                        onPress={()=>{ showSearchBox(false) }}>
                        <Image source={require(search_icon)} style={{height:16, width:16}}/>
                    </TouchableOpacity>
                </Col>
                <TextInput
                    autoFocus
                    style={styles.searchTextInput}
                    maxLength={28}
                    placeholder="Search"
                    textContentType="name"
                    autoCompleteType="name"
                    dataDetectorTypes="all"
                    keyboardType="default"
                    onChangeText={(char)=>{
                        searchString(char.toLowerCase())
                    }}/>
            </>);
        }else{
            return (
                <Col style={[styles.logoCol, { alignItems:'flex-end' }]}>
                    <TouchableOpacity
                        style={{ marginRight:25}}
                        onPress={()=>{ showSearchBox(true) }}>
                        <Image source={require(search_icon)} style={{height:16, width:16}}/>
                    </TouchableOpacity>
                </Col>
            
            )
        }
};

const styles = StyleSheet.create({
    logoCol:{
        alignItems:'center',
        justifyContent:'center',
    },
    searchTextInput:{
        position:'absolute',
        height: heightPercentageToDP('6%'),
        width:widthPercentageToDP('80%'),
        paddingLeft:heightPercentageToDP('2%'),
        paddingRight:heightPercentageToDP('2%'),
        fontSize:24,
        borderRadius:25,
        borderColor: 'gray',
        borderWidth: 2,
        backgroundColor:'#FFF',
        marginTop:heightPercentageToDP('1.5%'),
        marginLeft:heightPercentageToDP('1.5%'),
    },
});

export default SearchBox;
// export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);