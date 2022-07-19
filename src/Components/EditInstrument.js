import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react'
import { Modal } from 'react-native'
import { View, Text, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
export const EditInstrument = ({instrument, visible, setVisible, setUser, user}) => {
    const [newInstrument, setNewInstrument] = useState("");
    const instruments = [
        { value: 'Saxaphone', label: 'Saxaphone' },
        { value: 'Flute', label: 'Flute' },
        { value: 'Clarinet', label: 'Clarinet' },
        { value: 'Bass Clarinet', label: 'Bass Clarinet' },
        { value: 'Trumpet', label: 'Trumpet' },
        { value: 'French Horn', label: 'French Horn' },
        { value: 'Baritone', label: 'Baritone' },
        { value: 'Tuba', label: 'Tuba' },
        { value: 'Trombone', label: 'Trombone' },
        { value: 'Percussion', label: 'Percussion' },
      ];
    const updateInstrument = async () => { 
        setUser({
            section: user.section,
            instrument: newInstrument.value,
            position: user.position,
        })
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
                    <Text style={{paddingRight: "20%", fontWeight: "500", fontFamily: "Avenir Next", fontSize: 18, paddingVertical: "2.5%",width: "100%", textAlign: 'center'}}>Edit Instrument</Text>
                    { (newInstrument != instrument && newInstrument!="") ?
                    <TouchableOpacity  onPress={()=>{updateInstrument(), setVisible(false)}} style={{flexDirection: 'row', position: 'absolute', right: "5%"}}>
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
                    data={instruments}
                    labelField={'label'}
                    valueField={'value'}
                    placeholder={(newInstrument=="") ? 'Instrument' : newInstrument.value}
                    searchPlaceholder={'Search...'}
                    value={newInstrument}
                    onChange={item => {
                        setNewInstrument(item)
                    }}/>
                    </View>
                    </View>
                    </View>
                </View>
                </View>
            </Modal>
            
  )
}
