import React, { useState } from 'react'
import { Agenda } from 'react-native-calendars'
import { userAuth } from '../Components/userDataContext'
import CalenderCard from '../Components/CalenderComp/CalenderCard';
import CreateCalenderCard from '../Components/CalenderComp/CreateCalenderCard';
import { View, Platform, Text} from 'react-native';
import { Popup } from '../Components/Popup';
export default function Calender ({navigation}) {
  const {user, setUser, items, setItems} = userAuth();
  // console.log(user);
  const loadItems = (day) => {
    setTimeout(() => {
      const newItems = {};
      try{
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    } catch(error){
        console.log(error);
      }
    }, 1000);
  };
  const renderItem = (item) =>{
      return (
        <CalenderCard item={item} navigation={navigation} img={require("../../assets/HomesteadBandLogo.png")}/>
   )
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
    <Popup visible={(user == null ? true : false)} setUser={setUser}/>

    
    <Agenda
    items={items}
    loadItemsForMonth={loadItems}
    renderItem={renderItem}
    timeZone={'America/Los_Angeles'}
    displayLoadingIndicator={false}
    theme={{
      agendaDayTextColor: 'black',
      agendaDayNumColor: 'black',
      agendaTodayColor: '#C0C0C0',
      agendaKnobColor: 'green',
      calendarBackground: 'white',
      dotColor: 'green',
      dayTextColor: 'green',
      selectedDayBackgroundColor: 'green'
    }}
   
  />

    {Platform.OS === 'ios' ?
    <View style={{position: 'absolute', bottom: "-3%", right: "-5%"}}>
      <CreateCalenderCard load={loadItems}/>
    </View> : <View></View>}
    <View style={{position: 'absolute', height: 10, width: "100%", backgroundColor: 'white', top: -5}}></View>
    </View>
  )
}
