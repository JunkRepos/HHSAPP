import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image, useWindowDimensions} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from 'react-native-animated-progress';


function FolderCard({folderName, subFiles, print}) {
  const [showContent, setShowContent] = useState(false);
  const {height, width} = useWindowDimensions();
  const [openFile, setOpenFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadPrint, setLoadPrint] = useState(false);
  return (
    <View style={{marginHorizontal: (openFile == null) ?  10 : 0, marginTop: (openFile == null) ? 17: 0, backgroundColor: (openFile != null) ? 'white' : 'transparent'}}>
    <ScrollView>
    {openFile != null ?
    
    
    <View>
    {loading ?
    <View style={{position: 'absolute', alignSelf: 'center', justifyContent: 'center', width: "90%", height: "100%"}}>
    <Text style={{
      fontSize: 16,
      fontFamily: "Avenir Next",
      fontWeight: '500',
    }}>Loading ...</Text>
    <ProgressBar indeterminate="true" backgroundColor="green" height={15}/> 
    </View>: 
    <TouchableOpacity onPress={()=>{setOpenFile(null)}} style={{flexDirection: 'row', left: 0}}>
        <Ionicons  size={18} name='md-chevron-back-outline'/>
        <Text style={{fontWeight: "500", fontFamily: "Avenir Next", fontSize: 15}}>Back</Text>
    </TouchableOpacity>}
    
    <Image onLoad={()=>{setLoading(false)}} onLoadStart={()=>{setLoading(true)}} source={{uri: openFile}}  style={{width: width*0.9, height: height*0.9}} />
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
              showContent ? (subFiles[0].Songs.map(({jpg, name, pdf})=>(
                <Card style={{marginVertical: 5}}>
                <Card.Content>
                  <TouchableOpacity onPress={()=>{setOpenFile(jpg)}}>
                    
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 30,
                    }}>
                    <Text>{name}</Text>
                    <TouchableOpacity onPress={()=>{print(pdf, setLoadPrint)}}>
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