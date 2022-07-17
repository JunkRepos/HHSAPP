
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth} from '../Firebase/firebase-config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { Alert } from 'react-native';
const setLoginTrue = async (toHome, username, password, email, userData) => {
    await AsyncStorage.removeItem("user");
    if (username == null) {
        for (let i = 0; i < userData.length; i++){
            if (userData[i].email == email && userData[i].password == password){
                username = userData[i].username;
                break
                }
            }
    }
    let info = {  
        username: username,  
        email: email,  
        password: password,  
        loggedin: true,
      }  
    await AsyncStorage.setItem('user',JSON.stringify(info));
    toHome();
}   
export const signInWithUserName = async (username, setUsername, password, setPassword, userData, toHome) => {
    var usernameFound = false;
    if (userData == null){
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        if (!user.loggedin){
            if (user.username == username && user.password == password){
                signInWithEmailAndPassword(auth, user.email, user.password)
                .then(()=>{
                    setLoginTrue(toHome, user.username, user.password, user.email);
                })
                .catch((result)={});
                usernameFound = true;
            }
        }
    } else{
        try {
            for (let i = 0; i < userData.length; i++){
                if (userData[i].username == username && userData[i].password == password){
                    signInWithEmailAndPassword(auth, userData[i].email, userData[i].password)
                    .then(()=>{
                        setLoginTrue(toHome, username, userData[i].password, userData[i].email);
                    })
                    .catch((result)={});
                    usernameFound = true;
                    break
                    }
                }
        } catch (error){
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            if (!user.loggedin){
                if (user.username == username && user.password == password){
                    signInWithEmailAndPassword(auth, user.email, user.password)
                    .then(()=>{
                        setLoginTrue(toHome, user.username, user.password, user.email);
                    })
                    .catch((result)={});
                    usernameFound = true;
                }
            }
        }
    }
    setUsername("");
    setPassword("");
    if (!usernameFound){
        Alert.alert("invalid password or username")
    }
}
export const signInWithEmail = (email, setEmail, password, setPassword, toHome, userData) => {
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
        setLoginTrue(toHome, null, password, email, userData);
    })
    .catch((result)=>{Alert.alert("invalid password or email"+result)});
    setEmail("");
    setPassword("");
}