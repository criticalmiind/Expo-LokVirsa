import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import { Loader } from '../Component';
import { showMessage } from 'react-native-flash-message';

class Logout extends React.Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            dataArray:[]
        }
    }

    UNSAFE_componentWillMount(){
        this._isMounted = true;
        if(this._isMounted){
            this.props.setLoginStatus(false)
            this.props.setUserData({})
            showMessage({ message:"Logout successfully!", type:'warning' });
        }
    }
    render(){
        return (<Loader isLoader={true} />);
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);