import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react'
import { Modal } from 'react-native'
import { View, Text, TouchableOpacity, TextInput, Alert} from 'react-native'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase-config';
export const EditUsername = ({email, id, visible, setVisible}) => {
    const [newEmail, setNewEmail] = useState("");
    const updateEmail = async () => { 
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, {
            email: newEmail
        }).then(()=>{Alert.alert("email will update when app is restarted")})
    }
    
  return (
    <Modal
            animationType = {"slide"}
            transparent={true}
            visible={visible}
            size={5}>
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 52, 0, 0.5)'}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{backgroundColor: '#F2F3F5', height: "50%", width: "90%", borderRadius: 10}}>
                    <View style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                    <TouchableOpacity onPress={()=>{setVisible(false), console.log("CHANGE")}} style={{flexDirection: 'row', left: "12%"}}>
                        <Ionicons  size={18} name='md-chevron-back-outline'/>
                        <Text style={{fontWeight: "500", fontFamily: "Avenir Next", fontSize: 15}}>Account</Text>
                    </TouchableOpacity>
                    <Text style={{paddingRight: "20%", fontWeight: "500", fontFamily: "Avenir Next", fontSize: 18, paddingVertical: "2.5%",width: "100%", textAlign: 'center'}}>Edit Username</Text>
                    { (newEmail != email && newEmail!="") ?
                    <TouchableOpacity  onPress={()=>{updateEmail(), setVisible(false)}} style={{flexDirection: 'row', position: 'absolute', right: "5%"}}>
                        <Text style={{fontWeight: "500", fontFamily: "Avenir Next", fontSize: 15}}>Save</Text>
                    </TouchableOpacity> :
                    <View></View>
                    }

                    </View>
                    <Text style={{fontWeight: "600", fontFamily: "Avenir Next", fontSize: 16, paddingLeft: "5%", paddingVertical: '2%'}}>Email</Text>
                    <TextInput onChangeText={(text)=>{setNewEmail(text)}} defaultValue={email} style={{marginHorizontal: "7%", backgroundColor: 'rgba(10,10,10,0.1)', paddingVertical: "4%", borderRadius: 5, paddingHorizontal: "2%"}}/>

                    </View>
                </View>
                </View>
            </Modal>
            
  )
}
