import { showMessage } from "react-native-flash-message";
import Axios from "axios";
Axios.defaults.baseURL = 'http://lokvirsa.tv/api/index.php';
// Axios.defaults.baseURL = 'http://developershub.co/lokvirsa/api/index.php';

export function splitArrayIntoChunksOfLen(array, lenght) {
    var chunks = [], i = 0, n = array.length;
    while (i < n) {
      chunks.push(array.slice(i, i += lenght));
    }
    return chunks;
}

// Login and SignUp
export function authentication(payload={}){
  this.props.setLoader(true)
  if(payload.password !== payload.password_confirmation && (payload.action === 'signUp' || payload.action === 'updateProfile') ){
    showMessage({ message: "passwords doesn't matched!", type: 'danger' })
    return;
  }

  let formData = new FormData();
  for(let key in payload) {
    formData.append(key, payload[key]);
    if(payload[key] === '' || payload[key] === undefined){
      showMessage({ message: `${key} field is required!` })
      return;
    }
  }

  Axios.post('', formData)
    .then((res)=>{
      this.props.setLoader(false)
      if(!!res.data.status){
        showMessage({ message: res.data.message, type: 'warning' })
        if(payload.action === 'updateProfile'){
          // this.props.setUserData(res.data.data[0]);
        }
        if(payload.action === 'signIn' && res.data.data.length > 0){
          this.props.setLoginStatus(true);
          this.props.setUserData(res.data.data[0]);
        }
        if(payload.action === 'signUp'){
          this.props.navigation.replace("Signin");
        }
      }else{
        showMessage({ message: res.data.message })
      }
    })
    .catch((err)=>{
      // console.log("Error : ", err)
      this.props.setLoader(false)
      showMessage({ message: err.response.message, type: 'danger' })
    })
}


export function getData(payload={}, action, callback){
  this.props.setLoader(true)
  let uri = '';
  switch (action) {
    case 'streaming':
      uri = `?action=${action}&id=${this.props.userData.id}&category=${payload.category}`;
      break;
    case 'categories':
      uri = `?action=${action}&id=${this.props.userData.id}`;
      break;
    case 'blogs':
      uri = `?action=${action}&id=${this.props.userData.id}`;
      break;
    case 'events':
      uri = `?action=${action}&id=${this.props.userData.id}`;
      break;
    default:
      break;
  }

  Axios.get(uri)
    .then((res)=>{
      // console.log("Success : ", res)
      if (res.data.status === 1) {
        callback(res.data)
        this.props.setLoader(false)        
      }else{
        callback({ error:true, data: { streaming:[], categories:[] } })
        showMessage({ message:res.data.message, type:'danger' })
      }
    })
    .catch(err=>{
      // console.log("Error : ", uri, err)
      showMessage({ message:'Something went wrong!\nplease restart application!', type:'danger' })
      callback({ error:true, data: { streaming:[], categories:[] } })
      this.props.setLoader(false)
    })
}