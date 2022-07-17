
import React, {useState, useEffect} from 'react';
import {IconButton} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { 
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput, 
  Image
  
} from 'react-native';
function CalenderCardInfo({show, setShow, item}) {
    const [showModal, setShowModal] = useState(false);
    const onPress = () => {setShow(false)}
  return (
    <Modal
    animationType = {"slide"}
    transparent={true}
    visible={show}
    size={5}>

<View style={{flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 52, 0, 0.5)'}}>
<View style={{alignItems: 'center', backgroundColor: '#F1F1F1', marginHorizontal: "5%",  borderRadius: 10, flexShrink: 1}}>
<View style={{width: "100%", backgroundColor: '#E5E4E2', borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
<IconButton icon={'close'} color={'grey'} onPress={()=>{setShow(!show)}}/>
</View>
<Text style={{fontSize: 25, width: "80%", paddingRight: "10%",paddingTop: "5%",}}>{item.name}</Text>
<View style={{flexDirection: 'row', alignItems: 'center', width: "100%"}}>
<IconButton icon={'clock-outline'} color={'#36454F'} style={{marginLeft: "4.5%", marginRight: "2%"}} size={25}/>
<View>
<View style={{flexDirection: 'row', alignItems: 'center'}}>
<TouchableOpacity style={{backgroundColor: 'transparent', borderRadius: 5, marginRight: "1%", marginLeft: "2%", paddingVertical: "2%"}} >
<Text  style={{fontSize: 15, color: '#303030'}}>{item.date}</Text>
</TouchableOpacity>

<TouchableOpacity style={{backgroundColor: 'transparent', borderRadius: 5, paddingHorizontal: '2%', paddingVertical: "2%"}}>
<Text style={{fontSize: 15, color: '#303030'}}>{item.time}</Text>
</TouchableOpacity>
</View>
<Text style={{paddingHorizontal: "2%", color: "#36454F", fontSize: 14}}>Time zone • Los Angeles</Text>
</View>
</View>
<View style={{flexDirection: 'row', alignItems: 'center', width: "100%", marginVertical: "1%"}}>
<Ionicons name={'ios-people-outline'} color={'#36454F'} size={25} style={{paddingVertical: "2%", paddingHorizontal: '6%'}} />
<TextInput placeholder={item.guests} style={{fontSize: 17, width: "75%", paddingVertical: "2.5%"}} placeholderTextColor={'#36454F'}/>
</View>
{(item.zoom == "")
? <View style={{flexDirection: 'row', alignItems: 'center', width: "100%"}}>
<Image style={{width: 30, height: 30, marginLeft: "6%", marginRight: "4%"}}source={require('../../../assets/zoom.png')}/>

<TouchableOpacity onPress={Linking.openURL(item.zoom)} style={{backgroundColor: "#00BFFF", paddingHorizontal: "3%", paddingVertical: "3%", borderRadius: 5, marginHorizontal: "1%", marginVertical: "1%"}}>
<Text style={{color: "white", fontWeight: "500", fontSize: 14}}>Zoom Meet video conferencing</Text>
</TouchableOpacity>
</View>: <View></View>}

<View style={{flexDirection: 'row', alignItems: 'center', width: "100%", marginTop: "2%", borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#D3D3D3'}}>
<Ionicons name={'location-outline'} color={'#36454F'} size={25} style={{paddingVertical: "3%", paddingHorizontal: '6%'}} />
<TextInput placeholder={item.location} style={{fontSize: 17, width: "80%", paddingVertical: "2%"}} placeholderTextColor={'#36454F'}/>
</View>


<View style={{flexDirection: 'row', alignItems: 'center', width: "100%", marginVertical: "2%"}}>
<Ionicons name={'list-outline'} color={'#36454F'} size={25} style={{alignSelf: 'flex-start', paddingTop: "10%", bottom: "10%", paddingLeft: '6%', paddingRight: "6%"}} />
<Text style={{fontSize: 17, width: "80%"}}>{item.info}</Text>
{/* <TextInput placeholder={item.info} style={{fontSize: 17, width: "80%", paddingVertical: "20%"}} placeholderTextColor={'#36454F'}/> */}
</View>
</View>
</View>

</Modal>
  )
}
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
export default CalenderCardInfo;
