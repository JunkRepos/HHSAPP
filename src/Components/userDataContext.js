import { createContext, useContext, useEffect, useState} from "react";
import { collection, getDocs} from "firebase/firestore";
import {db } from '../Firebase/firebase-config'
import * as RootNavigation from './NavRef';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Popup } from "./Popup";
const userContext = createContext({});

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [items, setItems] = useState(null);
    const [musicFiles, setMusicFiles] = useState(null);
    const [gettingData, setGettingData] = useState(false);
    const eventCollectionRef = collection(db, "events");
    const musicCollectionRef = collection(db, "Music");
    const checkLoggedIn = async () => {
      setGettingData(true);
      var parse = await AsyncStorage.getItem('user');
      var user = JSON.parse(parse);
      setUser(user);
      setGettingData(false);
    }
    useEffect(()=>{
      if (user==null && gettingData == false){
        checkLoggedIn();
      } else if (gettingData == false) {
        changeLogIn().then(()=>{checkLoggedIn()});
      }
    }, [user])
    const changeLogIn = async () => {
      setGettingData(true);
      const userInfo = JSON.stringify(user)
      await AsyncStorage.setItem('user', userInfo);
      setGettingData(false);
    }
    const getMusic = async () => {
      try {
        console.log("DSDS");
        const music = await getDocs(musicCollectionRef);
        const listOfMusic = music.docs.map((doc) =>({...doc.data(), id: doc.id}));
        const newMusic = {};
        // console.log(listOfMusic);
        listOfMusic.forEach(item => {
          if (!newMusic[item.id]){
            newMusic[item.id] = [];
          }
          console.log(item);
          newMusic[item.id].push({
            Songs: item.Songs,
            id: item.id,
          
          })
        setMusicFiles(newMusic);
        })}catch(error){
          console.log(error);
          setMusicFiles(null);
        }
      

    }
    const getItems = async () =>{
      try {
        const data = await getDocs(eventCollectionRef);
        const listOfItems = data.docs.map((doc) =>({...doc.data(), id: doc.id}));
        const newItems = {};
        listOfItems.forEach(item => {
          if (item.guests == "Marching Band" || item.guests == user.section || item.guests == user.instrument || item.guests == user.position) {
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
useEffect(()=>{
  getItems();
  getMusic();
  RootNavigation.navigate('Home', {name: 'Home'});
}, [])
    return (
        <userContext.Provider value={{user, setUser, items, setItems, changeLogIn, musicFiles, setMusicFiles, gettingData}}>
            {children}
        </userContext.Provider>
    )
}
export const userAuth = () => {
    return useContext(userContext);
}
