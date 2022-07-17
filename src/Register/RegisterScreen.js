
import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, Alert, Keyboard} from 'react-native';
import {useState, useEffect} from 'react'
import KeyBoardAvoidingView from '../Components/KeyBoardAvoidingView'
import TextBox from '../Components/TextBox';
import CustomButton from '../Components/CustomButton';
import { auth, db} from '../Firebase/firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, addDoc} from 'firebase/firestore'
import { userAuth} from '../Components/userDataContext';
import { Popup } from '../Components/Popup';
export default function Register({navigation}) {
  const userCollectionRef = collection(db, "users");
  const {height, width} = useWindowDimensions()
  const toLogin = () => navigation.navigate('Login', { name: 'Login' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const {userData, setUserData, logOut, user} = userAuth();
  const [userNameValid, setUserNameValid] = useState(true);
  const [passwordIsLong, setPasswordIsLong] = useState(true);
  const [sectionPopup, setSectionPopup] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const checkValidUserName = (func) => {
    for (let i = 0; i < userData.length; i++){
      if (userData[i].username == username){
        Alert.alert("username is taken");
        setUserNameValid(false);
      }
    }
    if (userNameValid){ func() };
  }
  const storeUserData = async () => {
    await addDoc(userCollectionRef, {
      username: username, 
      email: email, 
      password: password,
      section: selectedSection.value,
      instrument: selectedInstrument.value,
      position: selectedPosition.value,}).catch((error)=>{console.log(error)});
  }
  const checkPassword = async (word) => {
    if (word.length < 6 && word.length !== 0){
      setPasswordIsLong(false);
    } else {
      setPasswordIsLong(true);
    }
  }
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(()=>{toLogin(), storeUserData(), setEmail(""), setPassword(""), setUsername("")})
    .catch((result)=>{Alert.alert(result.message)});
  }
  const registerUser = async () => {
    checkValidUserName(createUser);
  }
  return (
    
      <View style={styles.container}>
      <Popup 
        visible={sectionPopup} 
        setVisible={setSectionPopup}
        onPress={registerUser} 
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        selectedInstrument={selectedInstrument}
        setSelectedInstrument={setSelectedInstrument}
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}/>
      <Image style={{
          width: width*0.8, 
          height: width*0.8, 
          position: 'absolute', 
          left: 0, 
          top: 0}} 
          source={require('../../assets/greenwave.png')} />
      <Image style={{
          position: 'absolute', 
          right: 0, 
          bottom: 0, 
          width: width*0.8, 
          height: width*0.8, 
          transform: [{ rotate: '180deg' }]}} 
          source={require('../../assets/greenwave.png')} />
    {/* { !keyboardStatus ? */}
    <KeyBoardAvoidingView>
    <View>
    <View style={styles.smallhalfcircle}>
      <CustomButton onPress={toLogin} text={'  Login '} textColor={'#28c76f'} fontSize={25} font={'Arial Rounded MT Bold'} pad={15}/>
      </View>
      <Text style={styles.text}>Register</Text>
      
      <View style={{
          justifyContent: 'center', 
          alignContent: 'center', 
          maxWidth: "85%", 
          marginTop: "10%",
          marginBottom: Platform.OS === 'ios' ? "15%" : "10%"}}>
      <View style={styles.halfcircle}>
        <TextBox placeholder={"Username"} onChange={event=>{setUsername(event)}} secure={false} icon="person-outline" pad={17} width={width*0.6} value={username}/>
        <View style={{
          borderBottomColor: '#C0C0C0', 
          borderBottomWidth: 1, 
          maxWidth: "99%"}}/>
        <TextBox placeholder={"Password"} onChange={event=>{setPassword(event), checkPassword(event)}} secure={true} icon="lock-closed-outline" width={width*0.6} pad={17} showSecure={true} value={password}/>
        {passwordIsLong ? <View></View> : <Text style={{position: 'absolute', top: "60%", left: '10%', color: 'red', fontSize: 12}}>must be 6 or more characters</Text>}
        <View style={{
          borderBottomColor: '#C0C0C0', 
          borderBottomWidth: 1, 
          maxWidth: "99%"}}/>
        <TextBox placeholder={"Email"} onChange={event=>{setEmail(event)}} secure={false} icon="mail-outline" pad={17} width={width*0.6} value={email}/>
        <View style={{
            position: 'absolute', 
            top: '50%', 
            marginTop: -width*0.075, 
            right: "-10%"}}>
        <TouchableOpacity onPress={()=>{setSectionPopup(true)}}>
        <Image style={{
          width: width*0.15, 
          height: width*0.15}} source={require('../../assets/check.png')}/>
        </TouchableOpacity>
        </View>
      </View>
      </View>
      </View>
      </KeyBoardAvoidingView>
      
       </View>
       
    );  
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F5',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: "10%",
    marginBottom: "5%",
    fontSize: 35,
    fontFamily: "Avenir Next",
    color: '#080834'
  },
  halfcircle: {
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: 'white',
    borderLeftWidth: 0,
    shadowRadius: 3,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 5,
      height: 0
    },

  },
  smallhalfcircle: {
    maxWidth: "36%",
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: 'white',
    borderRightWidth: 0,
    shadowRadius: 3,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 5,
      height: 0
    },

  }
});