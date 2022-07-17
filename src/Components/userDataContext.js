import { createContext, useContext, useEffect, useState} from "react";
import {
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword
  } from 'firebase/auth';
import { collection, getDocs} from "firebase/firestore";
import { auth, db } from '../Firebase/firebase-config'
import * as RootNavigation from './NavRef';
import AsyncStorage from "@react-native-async-storage/async-storage";
const userContext = createContext({});

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [items, setItems] = useState(null);
    const userCollectionRef = collection(db, "users");
    const eventCollectionRef = collection(db, "events");
    const logOut = async () => {
      let old_user = JSON.parse(await AsyncStorage.getItem('user'));
      let info = {  
        username: old_user.username,  
        email: old_user.email,  
        password: old_user.password,
        loggedin: false,
      }  
      await AsyncStorage.setItem('user',JSON.stringify(info));
      signOut(auth)
    }
    const checkLoggedIn = async () => {
      var parse = await AsyncStorage.getItem('user');
      var user = JSON.parse(parse);
      if (user == null || user.loggedin == false){
        RootNavigation.navigate('Login', {name: 'Login'})
    } else if (user.loggedin == true){ 
      signInWithEmailAndPassword(auth, user.email, user.password)
      RootNavigation.navigate('Home', {name: 'Home'});
    }
    }
    const getData = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        setUserData(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
      } catch (error){
        console.log(error, "DEEE");
        setUserData(null);
      }
    }
    const getItems = async () =>{
      try {
        const data = await getDocs(eventCollectionRef);
        const listOfItems = data.docs.map((doc) =>({...doc.data(), id: doc.id}));
        const newItems = {};
        listOfItems.forEach(item => {
          if (item.guests == "Marching Band" || item.guests == user.section || item.guests == user.instrument || item.guests == user.position) {
            console.log(user.section, user.instrument, user.position);
            console.log(item.guests);
            if (!newItems[item.index]){
              newItems[item.index] = [];
            }
            newItems[item.index].push({
              name: item.name,
              location: item.location, 
              guests: item.guests,
              time: item.time, 
              date: item.date,
              info: item.info});
          }
          
      });
      
      setItems(newItems);
      } catch (error){
        setItems(null);
      }

}
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser)
    if (currentUser == null){
      setUser([{
        username: "",
        password: "",
        email: "",
        section: "",
        position: "",
        instrument: "",
      }])
    } else{
      setUser(currentUser);
    }

    checkLoggedIn();
  });
  return () => {
    unsubscribe();
  };
}, []);
useEffect(() => {
  getData()
  getItems();
  }, []);
useEffect(()=>{
  try {
  userData.forEach((users)=>{
    console.log(users.email, user.email);
    if ((users.email).toLowerCase() == (user.email).toLowerCase()) {
      setUser(users);
    }
  })} catch(error){
  }
}, [userData, user]);
    return (
        <userContext.Provider value={{userData, setUserData, logOut, user, items, setItems}}>
            {children}
        </userContext.Provider>
    )
}

export const userAuth = () => {
    return useContext(userContext);
}

