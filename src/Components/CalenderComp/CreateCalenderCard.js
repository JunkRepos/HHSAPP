import React, {useState, useEffect} from 'react';
import {IconButton} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../Firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import DropdownComponent from '../Dropdown';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput, 
  Image
  
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import KeyBoardAvoidingView from '../KeyBoardAvoidingView';

function toDate(datetime, monthNames, dayNames){
  const date = datetime.getDate().toString();
  const month = monthNames[datetime.getMonth()];
  const day = dayNames[datetime.getDay()];
  return day+", "+month+" "+date;
}
function toTime(datetime){
  const hour = ((datetime.getHours()%12 == 0) ? datetime.getHours()%12+12 : datetime.getHours()%12).toString();
  const minute = datetime.getMinutes().toString().padStart(2, "0");
  return (datetime.getHours()<12) ? hour+":"+minute+"am" : hour+":"+minute+"pm";
}
function dateToTimeZone(){
  const date = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
  const date_time = date.split(", ");

  const amorpm  = date.includes("PM") ? true : false;

  const ymd = date_time[0].split("/");
  const hms = date_time[1].slice(0,-3).split(":");
  const hour = amorpm ? (parseInt(hms[0])+12)%24 : parseInt(hms[0]);
  const minute = parseInt(hms[1]); 

  const year = parseInt(ymd[2]);
  const month = parseInt(ymd[0])-1;
  const day = parseInt(ymd[1]);
  return new Date(year, month, day, hour, minute);
}
function roundToHour(datetime){
  datetime.setMinutes(0,0,0);
  return datetime;
}
function unformatDate(datetime){
  const date = datetime.getFullYear().toString()+"-"+(datetime.getMonth()+1).toString().padStart(2,"0")+"-"+datetime.getDate().toString().padStart(2,"0")
  return date

}
function addHour(datetime, hours){
  const date = new Date(datetime)
  date.setHours(datetime.getHours()+hours);
  return date;
}
function isDateValid(startTime, endTime){
  const time = endTime.getTime()-startTime.getTime();
  return time>0
}
function CreateCalenderCard({load}){
  // initial state
  const [dateForModal, setDateForModal] = useState(roundToHour(dateToTimeZone()));
  const eventCollectionRef = collection(db, "events");

  const [showModal, setShowModal] = useState(false);

  const [startDate, setStartDate] = useState(dateForModal);
  const [startTime, setStartTime] = useState(dateForModal);
  const [endTime, setEndTime] = useState(addHour(dateForModal, 1));
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [info, setInfo] = useState("");
  const [name, setName] = useState("");
  const [zoom, setZoom] = useState("");
  const [openZoom, setOpenZoom] = useState(true);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const insets = useSafeAreaInsets();
  const [titleColor, setTitleColor] = useState('#D3D3D3');
  const [addLocationOnFocus, setAddLocationOnFocus] = useState(false);
  const [addDescriptionOnFocus, setAddDescriptionOnFocus] = useState(false)
  const [saveButtonColor, setSaveButtonColor] = useState('#87CEEB')
  const [keyBoardOpen, setKeyBoardOpen] = useState(false);
  const data = [
    { label: 'WoodWind', value: 'WoodWind' },
    { label: 'Brass', value: 'Brass' },
    { label: 'Percussion', value: 'Percussion' },
    { label: 'Color Guard', value: 'Color Guard' },
    { label: 'Marching Band', value: 'Marching Band' },
    { label: 'Leadership', value: 'Leadership' },
    { label: 'Adult', value: 'Adult' },
  ];
  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };
  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };
  const submit = () =>{
    if (isDateValid(startTime, endTime)){
      saveItem(); 
      close();
    }

  };
  const handleConfirmStartDate = (date) => {
    setStartDate(date);
    hideStartDatePicker();
  };
  const handleConfirmStartTime = (date) => {
    setStartTime(date);
    hideStartTimePicker();
  };
  const handleConfirmEndTime = (date) => {
    setEndTime(date);
    hideEndTimePicker();
  };

  const saveItem = async () => {
    const reformatedDate = unformatDate(startDate);
    await addDoc(eventCollectionRef, {
      index: reformatedDate,
      name: name,
      location: location, 
      guests: guests,
      time: toTime(startTime)+"-"+toTime(endTime), 
      date: toDate(startDate, monthNames, dayNames),
      zoom: zoom,
      info: info}).catch((error)=>{console.log(error)});
      
    setStartDate(dateForModal);
    setStartTime(dateForModal);
    setEndTime(dateForModal);
    setLocation("");
    setGuests("");
    setInfo("");
    setName("");
    setZoom("");
  // }
  
  
  };

  const close = () => {
    setShowModal(!showModal)
    setSaveButtonColor('#87CEEB');
  };
  useEffect(() => {
  setDateForModal(dateToTimeZone())
}, [isStartDatePickerVisible, isStartTimePickerVisible, isEndTimePickerVisible]);
useEffect(() => {
  if (name!="" && isDateValid(startTime, endTime)){
    setSaveButtonColor("#00BFFF")
  }else {
    setSaveButtonColor('#87CEEB')
  }
}, [name, startDate, startTime, endTime]);
useEffect(()=>{
  if (showModal == false) {
    setSaveButtonColor('#87CEEB')
  }
}, [showModal]);
    return (
      
      <View style = {styles.container}>
        
        <Modal
            animationType = {"slide"}
            transparent={true}
            visible={showModal}
            size={5}>
    
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 52, 0, 0.5)'}}>
    <KeyBoardAvoidingView>
    <View style={{paddingBottom: "10%", alignItems: 'center', backgroundColor: '#F1F1F1', marginHorizontal: "5%", borderRadius: 10, position: keyBoardOpen ? 'absolute' : 'relative', top: insets.top}}>
    <View style={{width: "100%", height: "5%", backgroundColor: '#E5E4E2', borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
      <IconButton icon={'close'} color={'grey'} onPress={()=>{setShowModal(!showModal)}}/>
    </View>
    <TextInput onChangeText={text=>{setName(text)}} placeholder={'Add title'} style={{fontSize: 25, width: "80%", paddingRight: "10%",paddingTop: "5%", borderBottomWidth: 2, borderBottomColor: titleColor, marginBottom: "5%"}} placeholderTextColor={'grey'} onFocus={()=>{setTitleColor("#00BFFF")}} onBlur={()=>{setTitleColor("#D3D3D3")}} />
    <View style={{flexDirection: 'row', alignItems: 'center', width: "100%"}}>
    <IconButton icon={'clock-outline'} color={'#36454F'} style={{marginLeft: "4.5%", marginRight: "2%"}} size={25}/>
    <View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <TouchableOpacity style={{backgroundColor: 'transparent', borderRadius: 5, marginRight: "1%", marginLeft: "2%", paddingVertical: "2%"}} onPress={()=>{setStartDatePickerVisibility(!isStartDatePickerVisible)}}>
    <Text  style={{fontSize: 15, color: '#303030'}}>{toDate(startDate, monthNames, dayNames)}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor: 'transparent', borderRadius: 5, paddingHorizontal: '2%', paddingVertical: "2%"}} onPress={()=>{setStartTimePickerVisibility(!isStartTimePickerVisible)}}>
    <Text style={{fontSize: 15, color: '#303030'}}>{toTime(startTime)}</Text>
    </TouchableOpacity>
    <Text style={{fontSize: 15, color: '#303030'}}> - </Text>
    <TouchableOpacity style={{backgroundColor: 'transparent', borderRadius: 5, paddingHorizontal: '2%', paddingVertical: "2%"}} onPress={()=>{setEndTimePickerVisibility(!isEndTimePickerVisible)}}>
    <Text style={{fontSize: 15, color: '#303030'}}>{toTime(endTime)}</Text>
    </TouchableOpacity>
    </View>
    <Text style={{paddingHorizontal: "2%", color: "#36454F", fontSize: 14}}>Time zone • Los Angeles</Text>
    </View>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', width: "100%"}}>
    <Image style={{width: 30, height: 30, marginLeft: "6%", marginRight: "4%"}}source={require('../../../assets/zoom.png')}/>
    {openZoom ?
    <TouchableOpacity onPress={()=>setOpenZoom(!openZoom)}style={{backgroundColor: "#00BFFF", paddingHorizontal: "3%", paddingVertical: "3%", borderRadius: 5, marginHorizontal: "1%", marginVertical: "1%"}}>
      <Text style={{color: "white", fontWeight: "500", fontSize: 14}}>Add Zoom Meet video conferencing</Text>
    </TouchableOpacity> :
    <TextInput onChangeText={text=>{setZoom(text)}} placeholderTextColor={'#36454F'} style={{fontSize: 17, width: "80%", paddingVertical: "2%"}} placeholder='Add Link' onBlur={()=>{setOpenZoom(true)}}/> }
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', width: "100%", marginTop: "2%", borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#D3D3D3', marginBottom: "1%"}}>
    <Ionicons name={'ios-people-outline'} color={'#36454F'} size={25} style={{paddingVertical: "3%", paddingHorizontal: '6%'}} />
    <DropdownComponent data={data} value={guests} setValue={setGuests}/>
    </View>
    {addLocationOnFocus ? <View style={{flexDirection: 'row', alignItems: 'center', width: "100%", marginTop: "2%", borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#D3D3D3'}}>
      <Ionicons name={'location-outline'} color={'#36454F'} size={25} style={{paddingVertical: "3%", paddingLeft: '6%', paddingRight: '4%'}} />
    <TextInput onChangeText={text=>{setLocation(text)}} placeholder={'Add location'} style={{fontSize: 17, width: "80%", paddingHorizontal: "2%",paddingVertical: "2.5%", backgroundColor: (20,20,20,20), borderRadius: 5, borderBottomColor: "#00BFFF", borderBottomWidth: 2}} placeholderTextColor={'#36454F'} onFocus={()=>{setAddLocationOnFocus(true)}} onBlur={()=>{setAddLocationOnFocus(false)}}/>
    </View>
      :
    <View style={{flexDirection: 'row', alignItems: 'center', width: "100%", marginTop: "2%", borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#D3D3D3'}}>
      <Ionicons name={'location-outline'} color={'#36454F'} size={25} style={{paddingVertical: "3%", paddingHorizontal: '6%'}} />
    <TextInput onChangeText={text=>{setLocation(text)}} placeholder={'Add location'} style={{fontSize: 17, width: "80%", paddingVertical: "2%"}} placeholderTextColor={'#36454F'} onFocus={()=>{setAddLocationOnFocus(true)}} onBlur={()=>{setAddLocationOnFocus(false)}}/>
    </View>}

    {addDescriptionOnFocus ? 
    <View style={{flexDirection: 'row', width: "100%", marginVertical: "2%"}}>
      <Ionicons name={'list-outline'} color={'#36454F'} size={25} style={{paddingVertical: "2%", paddingLeft: '6%', paddingRight: "4%"}} />
      
    <View style={{width: "90%", maxHeight: 100}}>
    <TextInput multiline={true} numberOfLines={10} text={info} onChangeText={text=>{setInfo(text)}} placeholder={'Add description'} style={{fontSize: 17, width: "80%", paddingHorizontal: "2%", paddingVertical: "2%", backgroundColor: (20,20,20,20), borderRadius: 5, borderBottomColor: "#00BFFF", borderBottomWidth: 2}} placeholderTextColor={'#36454F'} onFocus={()=>{setAddDescriptionOnFocus(true)}} onBlur={()=>{(info == "") ? setAddDescriptionOnFocus(false) : setAddDescriptionOnFocus(true)}}/>
    </View>
    </View>
      :
    <View style={{flexDirection: 'row', alignItems: 'center', width: "100%", marginVertical: "2%"}}>
      <Ionicons name={'list-outline'} color={'#36454F'} size={25} style={{paddingVertical: "2%", paddingLeft: '6%', paddingRight: "6%"}} />
    <TextInput onChangeText={text=>{setInfo(text)}} placeholder={'Add description or attachments'} style={{fontSize: 17, width: "80%", paddingVertical: "2%"}} placeholderTextColor={'#36454F'} onFocus={()=>{setAddDescriptionOnFocus(true)}} onBlur={()=>{(info == "") ? setAddDescriptionOnFocus(false) : setAddDescriptionOnFocus(true)}}/>
    </View>}
    <TouchableOpacity onPress={()=>{submit()}} style={{backgroundColor: saveButtonColor, paddingHorizontal: "5%", paddingVertical: "3%", borderRadius: 10}}>
      <Text style={{color: "white", fontWeight: "500", fontSize: 20}}>Save</Text>
    </TouchableOpacity>
    
    <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmStartDate}
        onCancel={hideStartDatePicker}
        display="inline"
        date={dateForModal}
      />
     <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmStartTime}
        onCancel={hideStartTimePicker}
        display="spinner"
        date={startTime}
      />
     <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmEndTime}
        onCancel={hideEndTimePicker}
        display="spinner"
        date={endTime}
      />
    </View>
    </KeyBoardAvoidingView>
    </View>
    
        </Modal>
        
    {showModal ? <View></View> :
        <IconButton icon={'plus-circle-outline'} size={30} onPress={()=>setShowModal(true)}/>
    }
    
        </View>
      
        
      );
};
const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 24,
    alignSelf: 'center',
  },
  box: {
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 5
  },
  button: {flexDirection: 'row',
  alignItems: 'center',
  borderColor: '#e8e8e8',
  borderRadius: 5,
  width: "80%",
  borderWidth: 1,
  margin: 5,
  paddingHorizontal: 5,
  justifyContent: 'center'},
});
export default CreateCalenderCard;




{/* <View style={{justifyContent: "center", flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, marginHorizontal: "5%"}}>
<TouchableOpacity onPress={()=>setShowModal(false)}>
<Text style={{right: "250%", color: 'red', fontSize: 16, margin: 10, position: 'absolute'}}>Cancel</Text>
</TouchableOpacity>
<Text style={{fontSize: 16, fontFamily: 'DamascusLight', fontWeight: "bold", margin: 10, alignSelf: 'center', marginHorizontal: "15%"}}>New Event</Text>
<TouchableOpacity style={{left: 0}} onPress={addButton}>
<Text style={{left: 0, color: addButtonColor, fontSize: 16, margin: 10, position: 'absolute'}}>Add</Text>
</TouchableOpacity>
</View>

<View style={[styles.box]}>
<View style={{flexDirection: 'row', maxWidth: "90%"}}>
  <Text style={{fontFamily: 'DamascusLight', fontSize: 16, margin: 15}}>Title</Text>
  <TextInput style={{borderColor: '#eae8e4', borderWidth: 1, width: "75%", height: "60%", marginTop:8.5, borderRadius: 5, padding: 3}} onChangeText={text=>setName(text)}></TextInput>
</View>
<View style={{flexDirection: 'row', maxWidth: "90%"}}>
  <Text style={{fontFamily: 'DamascusLight', fontSize: 16, margin: 15}}>Location</Text>
  <TextInput style={{borderColor: '#eae8e4', borderWidth: 1, width: "63.5%", height: "60%", marginTop:8.5, borderRadius: 5, padding: 3}} onChangeText={text=>{setLocation(text)}}></TextInput>
</View>
</View>

<View style={[styles.box,{paddingHorizontal: "9%", marginVertical: "12%", width: "90%"}]}>
<View style={{flexDirection: "row"}}>
  <Text style={ {marginVertical: "4%", backgroundColor: "white", fontSize: 16, margin: 2, marginRight: "10%", fontFamily: 'DamascusLight'}}>Starts{" "}</Text>
  <TouchableOpacity onPress={showStartDatePicker} style={{backgroundColor: '#eae8e4', borderRadius: 5, padding: 5, marginHorizontal: 4, position: 'absolute', right: "35%", top: "20%"}}>
    <Text >{toDate(startDate)}</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={showStartTimePicker} style={{backgroundColor: '#eae8e4', borderRadius: 5, padding: 5, marginHorizontal: 4, position: 'absolute', right: 0, top: "20%"}}>
    <Text>{toTime(startTime)}</Text>
  </TouchableOpacity>
</View>

<View style={{flexDirection: "row"}}>
  <Text style={ {marginVertical: "4%", backgroundColor: "white", fontSize: 16, margin: 2, marginRight: "10%", fontFamily: 'DamascusLight'}}>Ends{" "}</Text>
  <TouchableOpacity onPress={showEndDatePicker} style={{backgroundColor: '#eae8e4', borderRadius: 5, padding: 5, marginHorizontal: 4, position: 'absolute', right: "35%", top: "20%"}}>
    <Text >{toDate(endDate)}</Text>
 </TouchableOpacity>
  <TouchableOpacity onPress={showEndTimePicker} style={{backgroundColor: '#eae8e4', borderRadius: 5, padding: 5, marginHorizontal: 4, position: 'absolute', right: 0, top: "20%"}}>
    <Text>{toTime(endTime)}</Text>
  </TouchableOpacity>
</View>
</View>
<View style={[styles.box,{maxHeight: "50%", width: "90%", alignItems: 'center'}]}>
<Text style={{fontFamily: 'DamascusLight', fontSize: 16, marginVertical: 15, alignSelf: 'center'}}>Notes</Text>
  <TextInput style={{borderColor: '#eae8e4', borderWidth: 1,borderRadius: 5, height: "80%", width: "95%", padding: 5}} placeholder={"description"} onChangeText={text=>{setInfo(text)}} multiline={true} numberOfLines={10}/>
</View> */}