import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

function FolderCard({folderName, subFiles, print}) {
  const [showContent, setShowContent] = useState(false);
  return (
    <TouchableOpacity style={{marginHorizontal: 10, marginTop: 17}}>
    <Card onPress={()=>setShowContent(!showContent)}>
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.filename}>{folderName}</Text>
          <Avatar.Image source={require('../../assets/HomesteadBandLogo.png')}/>
          
        </View>
        
      </Card.Content>
    </Card>
          {
              showContent ? (Object.keys(subFiles).map(file=>(
                <Card style={{marginVertical: 5}}>
                <Card.Content>
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
                </Card.Content>
              </Card>
              ))) : null
          }
  </TouchableOpacity>
  )
};

export default FolderCard;

const styles = StyleSheet.create({
    filename: {
        fontSize: 12,
        fontWeight: "bold",
        paddingHorizontal: 30,
    }
})