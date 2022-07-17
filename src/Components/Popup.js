import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import {View, TouchableOpacity, Text} from 'react-native';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
export const Popup = ({visible, setVisible, onPress, selectedSection, setSelectedSection, selectedInstrument, setSelectedInstrument, selectedPosition, setSelectedPosition}) => {

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
    <TouchableOpacity onPress={()=>{onPress(), setVisible(false)}} style={{borderRadius: 10, backgroundColor: "green", paddingHorizontal: "5%", paddingVertical: "2%"}}>
        <Text style={{fontSize: 20, color: 'white'}}>Submit</Text>
    </TouchableOpacity>
    </DialogContent>
  </Dialog>
</View>)}