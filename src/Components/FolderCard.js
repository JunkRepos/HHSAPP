import React, {useState} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image, useWindowDimensions} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
// import Pdf from 'react-native-pdf';
function FolderCard({folderName, subFiles, print}) {
  const [showContent, setShowContent] = useState(false);
  const {height, width} = useWindowDimensions();
  const [openFile, setOpenFile] = useState(null);
  return (
    <View style={{marginHorizontal: (openFile == null) ?  10 : 0, marginTop: (openFile == null) ? 17: 0, backgroundColor: (openFile != null) ? 'white' : 'transparent'}}>
    <ScrollView>
    {openFile != null ?
    <View>
    <TouchableOpacity onPress={()=>{setOpenFile(null), console.log("CHANGE")}} style={{flexDirection: 'row', left: 0}}>
        <Ionicons  size={18} name='md-chevron-back-outline'/>
        <Text style={{fontWeight: "500", fontFamily: "Avenir Next", fontSize: 15}}>Back</Text>
    </TouchableOpacity>
    <Image source={{uri: openFile}}  style={{width: width*0.9, height: height*0.9}} />
    </View>
    :
    <View>
    <TouchableOpacity>
    <Card onPress={()=>setShowContent(!showContent)}>
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text >{folderName}</Text>
          <Avatar.Image source={require('../../assets/HomesteadBandLogo.png')}/>
          
        </View>
        
      </Card.Content>
    </Card>
    </TouchableOpacity>
          {
              showContent ? (Object.keys(subFiles).map(file=>(
                <Card style={{marginVertical: 5}}>
                <Card.Content>
                  <TouchableOpacity onPress={()=>{setOpenFile(subFiles[file])}}>
                    
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 30,
                    }}>
                    <Text>{file}</Text>
                    <TouchableOpacity onPress={()=>{print(subFiles[file])}}>
                    <Ionicons name={'print-outline'} size={20} color={'#C0C0C0'}/>
                    </TouchableOpacity>
                  </View>
                  </TouchableOpacity>
                </Card.Content>
              </Card>
              ))) : null
          }
          </View>
}
  </ScrollView>
  </View>
  )
};

export default FolderCard;

// const styles = StyleSheet.create({
//     filename: {
//         fontSize: 12,
//         fontWeight: "bold",
//         paddingHorizontal: 30,
//     }
// })