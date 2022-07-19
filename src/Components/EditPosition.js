import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react'
import { Modal } from 'react-native'
import { View, Text, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
export const EditPosition = ({position, id, visible, setVisible, setUser, user}) => {
    const [newPosition, setNewPosition] = useState("");
    const positions = [
        { value: 'Leadership', label: 'Leadership' },
        { value: 'Adult', label: 'Adult' },
        { value: 'None', label: 'None' },
      ];
    const updatePosition = async () => { 
        setUser({
            section: user.section,
            instrument: user.instrument,
            position: newPosition.value,
        })
        // const docRef = doc(db, "users", id);
        // await updateDoc(docRef, {
        //     Position: newPosition
        // }).then(()=>{Alert.alert("username will update when app is restarted")})
    }
    
  return (
    <Modal
            animationType = {"slide"}
            transparent={true}
            visible={visible}
            size={5}>
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 52, 0, 0.5)'}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{backgroundColor: '#F2F3F5', height: "10%", width: "90%", borderRadius: 10}}>
                    <View style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                    <TouchableOpacity onPress={()=>{setVisible(false), console.log("CHANGE")}} style={{flexDirection: 'row', left: "12%"}}>
                        <Ionicons  size={18} name='md-chevron-back-outline'/>
                        <Text style={{fontWeight: "500", fontFamily: "Avenir Next", fontSize: 15}}>Account</Text>
                    </TouchableOpacity>
                    <Text style={{paddingRight: "20%", fontWeight: "500", fontFamily: "Avenir Next", fontSize: 18, paddingVertical: "2.5%",width: "100%", textAlign: 'center'}}>Edit Position</Text>
                    { (newPosition != position && newPosition!="") ?
                    <TouchableOpacity  onPress={()=>{updatePosition(), setVisible(false)}} style={{flexDirection: 'row', position: 'absolute', right: "5%"}}>
                        <Text style={{fontWeight: "500", fontFamily: "Avenir Next", fontSize: 15}}>Save</Text>
                    </TouchableOpacity> :
                    <View></View>
                    }

                    </View>
                    <View style={{width: '100%', alignItems: 'center'}}>
                    <View style={{width: "20%", minWidth: 175}}>
                    <Dropdown
                    style={{paddingHorizontal: "5%"}}
                    placeholderStyle={{fontSize: 20, fontWeight: "500"}}
                    containerStyle={{width: 200}}
                    search
                    data={positions}
                    labelField={'label'}
                    valueField={'value'}
                    placeholder={(newPosition=="") ? 'Position' : newPosition.value}
                    searchPlaceholder={'Search...'}
                    value={newPosition}
                    onChange={item => {
                        setNewPosition(item)
                    }}/>
                    </View>
                    </View>
                    </View>
                </View>
                </View>
            </Modal>
            
  )
}
