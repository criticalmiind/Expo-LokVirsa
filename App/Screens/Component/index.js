import React from "react";
import { Row } from "react-native-easy-grid";
import { ActivityIndicator } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export const Loader = ({ isLoader }) =>{
    if(isLoader){
        return(
            <Row style={{backgroundColor:'black', opacity:0.6, position:'absolute', height:heightPercentageToDP('100%'), width:widthPercentageToDP('100%'), alignItems:'center', justifyContent:'center', zIndex:100 }}>
                <ActivityIndicator size='large' />
            </Row>
        )
    }else{
        return (<></>)
    }
}