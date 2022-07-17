
import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, Platform, Keyboard} from 'react-native';
import KeyBoardAvoidingView from '../Components/KeyBoardAvoidingView'
import TextBox from '../Components/TextBox';
import CustomButton from '../Components/CustomButton';
import {useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import {signInWithUserName, signInWithEmail } from '../Components/loginMethods';
import { userAuth} from '../Components/userDataContext';
import { BackHandler } from 'react-native-web';
export default function Login({navigation}) {
  const {userData, setUserData, logOut, user} = userAuth();
  const {height, width} = useWindowDimensions()
  const toRegister = () => navigation.navigate('Register', { name: 'Register' });
  const toHome = () => navigation.navigate('Home', { name: 'Home' });
  const [emailOrUsername, setEmailOrUserName] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
      <View style={styles.container}>
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
      {/* <View style={{flex: 1, justifyContent: 'center'}}> */}
      
      <KeyBoardAvoidingView>

      <View style={{
        justifyContent: 'center', 
        alignContent: 'center', 
        maxWidth: "85%", 
        // marginTop: "10%",
        //  marginBottom: Platform.OS === 'ios' ? "15%" : 0,
        }}>
        <Text style={[styles.text, {marginTop: "40%", marginBottom: "10%"}]}>Login</Text>
      <View style={styles.halfcircle}>
        <View style={{flexDirection: 'row'}}>
        <View>
        {emailOrUsername ? 
        <TouchableOpacity onPress={()=>{setEmailOrUserName(!emailOrUsername)}}>
        <Ionicons name={'mail-outline'} size={20} color={'black'} style={{top: 13, marginLeft: 17}}/>
        <Ionicons name={'person-outline'} size={20} color={'#C0C0C0'} style={{top: 17, marginLeft: 17}}/>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=>{setEmailOrUserName(!emailOrUsername)}}>
        <Ionicons name={'person-outline'} size={20} color={'black'} style={{top: 13, marginLeft: 17}}/>
        <Ionicons name={'mail-outline'} size={20} color={'#C0C0C0'} style={{top: 17, marginLeft: 17}}/>
        </TouchableOpacity>}
        </View>

        {emailOrUsername ? 
        <TextBox placeholder={"Email"} onChange={event=>{setEmail(event)}} secure={false} pad={17} width={width*0.6} style={{paddingLeft: 0}} value={email}/>
        :
        <TextBox placeholder={"Username"} onChange={event=>{setUsername(event)}} secure={false} pad={17} width={width*0.6} style={{paddingLeft: 0}} value={username}/>
        }
        </View>
        <View style={{
          borderBottomColor: '#C0C0C0',
          borderBottomWidth: 1, 
          maxWidth: "99%"}}/>
        <TextBox placeholder={"Password"} onChange={event=>{setPassword(event)}} secure={true} icon="lock-closed-outline" pad={17} maxWidth={width*0.6} showSecure={true} value={password}/>
        <View style={{
          position: 'absolute',
          top: '50%', 
          marginTop: -width*0.075, 
          right: "-10%"}}>
        <TouchableOpacity
        onPress={ () => {emailOrUsername ? signInWithEmail(email, setEmail, password, setPassword, toHome, userData) : signInWithUserName(username, setUsername, password, setPassword, userData, toHome)}}>
        <Image style={{
          width: width*0.15, 
          height: width*0.15}} 
          source={require('../../assets/right-arrow.png')}/>
        </TouchableOpacity>
        </View>
      </View>
      <Text style={{
        paddingHorizontal: "10%",
        paddingVertical: "5%",
        // fontFamily: Platform.OS == 'ios' ? 'Arial Rounded MT Bold' : 'Roboto', 
        color: '#C0C0C0', 
        fontSize: 20, 
        alignSelf: 'flex-end'
        }}>Forgot?</Text>
      </View>

      
      </KeyBoardAvoidingView>
      <View style={styles.smallhalfcircle}>
      <CustomButton onPress={toRegister} text={'Register'} textColor={'#28c76f'} fontSize={25} font={'Arial Rounded MT Bold'} pad={15}/>
      </View>

      
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
    // top: "35%",
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
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'white',
    borderLeftWidth: 0,
    shadowRadius: 3,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 5,
      height: 0
    },

  }
});
