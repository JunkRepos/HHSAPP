import React, {useState} from 'react'
import { View, TouchableOpacity, Text, Platform, Alert} from 'react-native'
import { userAuth } from '../Components/userDataContext';
import { Ionicons } from '@expo/vector-icons';
import { EditSection } from '../Components/EditSection';
import { EditInstrument } from '../Components/EditInstrument';
import { EditPosition } from '../Components/EditPosition';
export default function Account (){
    
    const {user, setUser, items, setItems, changeLogIn, musicFiles, setMusicFiles, gettingData} = userAuth();
    const [changeUsernameVisible, setChangeUsernameVisible] = useState(false);
    const [changeInstrumentVisible, setChangeInstrumentVisible] = useState(false);
    const [changePositionVisible, setChangePositionVisible] = useState(false);
    return (
        <View>
            <EditSection setUser={setUser} user={user} section={user.section} visible={changeUsernameVisible} setVisible={setChangeUsernameVisible}/>
            <EditInstrument setUser={setUser} user={user} section={user.instrument} visible={changeInstrumentVisible} setVisible={setChangeInstrumentVisible}/>
            <EditPosition setUser={setUser} user={user} section={user.position} visible={changePositionVisible} setVisible={setChangePositionVisible}/>
            <Text style={{
                fontSize: 20,
                justifyContent: 'center',
                paddingTop: "5%",
                fontFamily: "Avenir Next",
                fontWeight: "500",
                paddingHorizontal: "7%",
                color: "#525252"}}>Account Information</Text>
            <View style={{width: "100%", backgroundColor: "white", marginBottom: 0.2, borderTopWidth: 0.2, borderTopColor: 'grey', marginTop: "1%"}}>
            <View style={{flexDirection: 'row', marginLeft: "7%", borderBottomWidth: 0.2, borderBottomColor: 'grey', paddingVertical: "2%"}}>
            <Text style={{
                fontSize: 18,
                justifyContent: 'center',
                fontFamily: "Avenir Next",
                fontWeight: "500",}}>Section</Text>
            <Text style={{fontFamily: "Avenir Next",fontSize: 18, position: 'absolute', alignSelf: 'center', right: "10%"}}>{user.section}</Text>
            <TouchableOpacity onPress={()=>{!gettingData ? setChangeUsernameVisible(true) : Alert.alert("please wait before changing your section")}} style={{position: 'absolute', alignSelf: 'center', right: "3%"}}>
            <Ionicons size={20} style={{fontFamily: "Avenir Next"}} name='md-chevron-forward'/>
            </TouchableOpacity>
            </View>
            </View>
            <View style={{width: "100%", backgroundColor: "white", marginBottom: 0.2}}>
            <View style={{flexDirection: 'row', marginLeft: "7%", borderBottomWidth: 0.2, borderBottomColor: 'grey', paddingVertical: "2%"}}>
            <Text style={{
                fontSize: 18,
                justifyContent: 'center',
                fontFamily: "Avenir Next",
                fontWeight: "500",}}>Instrument</Text>
            <Text style={{fontFamily: "Avenir Next",fontSize: 18, position: 'absolute', alignSelf: 'center', right: "10%"}}>{user.instrument}</Text>
            <TouchableOpacity onPress={()=>{!gettingData ? setChangeInstrumentVisible(true) : Alert.alert("please wait before changing your instrument")}} style={{position: 'absolute', alignSelf: 'center', right: "3%"}}>
            <Ionicons size={20} style={{fontFamily: "Avenir Next"}} name='md-chevron-forward'/>
            </TouchableOpacity>
            </View>
            </View>
            <View style={{width: "100%", backgroundColor: "white", marginBottom: 0.2, borderBottomWidth: 0.2, borderBottomColor: 'grey'}}>
            <View style={{flexDirection: 'row', marginLeft: "7%", paddingVertical: "2%"}}>
            <Text style={{
                fontSize: 18,
                justifyContent: 'center',
                fontFamily: "Avenir Next",
                fontWeight: "500",}}>Position</Text>
            <Text style={{fontFamily: "Avenir Next",fontSize: 18, position: 'absolute', alignSelf: 'center', right: "10%"}}>{user.position}</Text>
            <TouchableOpacity onPress={()=>{!gettingData ? setChangePositionVisible(true) : Alert.alert("please wait before changing your position")}} style={{position: 'absolute', alignSelf: 'center', right: "3%"}}>
            <Ionicons size={20} style={{fontFamily: "Avenir Next"}} name='md-chevron-forward'/>
            </TouchableOpacity>
            </View>
            </View>
            
        </View>
    );
}