import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
export const Popup = ({visible, setVisible, onPress, selectedSection, setSelectedSection, selectedInstrument, setSelectedInstrument, selectedPosition, setSelectedPosition}) => {
  const [submitColor, setSubmitColor] = useState('rgba(255,255,255,0.5)');
  useEffect(()=>{
      if (selectedInstrument!="" && selectedPosition!="" && selectedSection!=""){
          setSubmitColor('white');
      } else {
          setSubmitColor('rgba(255,255,255,0.5)');
      }
  }, [selectedInstrument, selectedPosition, selectedSection])
    const section = [
        { value: 'WoodWind', label: 'WoodWind' },
        { value: 'Brass', label: 'Brass' },
        { value: 'Percussion', label: 'Percussion' },
        { value: 'Color Guard', label: 'Color Guard' },
      ];
    const instrument = [
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
      const position = [
        { value: 'Leadership', label: 'Leadership' },
        { value: 'Adult', label: 'Adult' },
        { value: 'None', label: 'None' },
      ];
    return (
<View>
  <Dialog
    visible={visible}
    dialogAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
  >
    <DialogContent style={{paddingTop: "5%", alignItems: 'center'}}>
    <View style={{flexDirection: 'row'}}>
    <View style={{paddingVertical: "2%"}}>
    <Dropdown
    style={{paddingHorizontal: "10%"}}
    placeholderStyle={{fontSize: 15, width: "50%", fontWeight: "500"}}
    containerStyle={{width: "50%"}}
    search
    data={section}
    labelField={'label'}
    valueField={'value'}
    placeholder={(selectedSection=="") ? 'Section' : selectedSection.value}
    searchPlaceholder={'Search...'}
    value={selectedSection}
    onChange={item => {
        setSelectedSection(item)
    }}/>
    </View>
    <View style={{paddingVertical: "2%"}}>
     <Dropdown
    style={{paddingHorizontal: "20%"}}
    placeholderStyle={{fontSize: 15, width: "50%", fontWeight: "500"}}
    containerStyle={{width: "50%"}}
    search
    data={instrument}
    labelField={'label'}
    valueField={'value'}
    placeholder={'Instrument'}
    searchPlaceholder={'Search...'}
    value={(selectedInstrument=="") ? 'Instrument' : selectedInstrument.value}
    onChange={item => {
        setSelectedInstrument(item)
    }}/>
    </View>
    <View style={{paddingTop: "2%"}}>
     <Dropdown
    style={{paddingHorizontal: "10%"}}
    placeholderStyle={{fontSize: 15, width: "50%", fontWeight: "500"}}
    containerStyle={{width: "50%"}}
    search
    data={position}
    labelField={'label'}
    valueField={'value'}
    placeholder={(selectedPosition=="") ? 'Position' : selectedPosition.value}
    searchPlaceholder={'Search...'}
    value={selectedPosition}
    onChange={item => {
        setSelectedPosition(item)
    }}/>
    </View>
    </View>
    {/* <TouchableOpacity>
      <Text>
        CANCEL
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{(selectedInstrument!="" && selectedPosition!="" && selectedSection!="") ? (onPress(), setVisible(false), setSelectedPosition(""), setSelectedInstrument(""), setSelectedSection("")): Alert.alert("please select all boxes")}} style={{borderRadius: 10, backgroundColor: "green", paddingHorizontal: "5%", paddingVertical: "2%"}}>
        <Text style={{fontSize: 20, color: 'white'}}>SUBMIT</Text>
    </TouchableOpacity> */}
    <View style={{flexDirection: 'row'}}>
    <TouchableOpacity onPress={()=>{setVisible(false)}} style={{marginRight: "5%", paddingHorizontal: "10%", paddingVertical: "3.5%", borderWidth: 0.5, borderColor: 'grey', borderRadius: 5}}>
            <Text style={{fontWeight: "600", fontFamily: "Avenir Next", fontSize: 16}}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>{(selectedInstrument!="" && selectedPosition!="" && selectedSection!="") ? (onPress(), setVisible(false)): Alert.alert("please select all boxes")}} style={{backgroundColor: '#0096FF', marginLeft: "5%", paddingHorizontal: "11%", paddingVertical: "3.5%", borderRadius: 5, shadowRadius: 1, shadowColor: 'grey', shadowOpacity: 1, shadowOffset: [1,1]}}>
            <Text style={{fontWeight: "600", fontFamily: "Avenir Next", fontSize: 16, color: submitColor}}>SUBMIT</Text>
        </TouchableOpacity>
        </View>
    </DialogContent>
  </Dialog>
</View>)}