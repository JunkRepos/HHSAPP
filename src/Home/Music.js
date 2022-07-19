import * as React from 'react';
import * as Print from 'expo-print';
import { SafeAreaView, TouchableOpacity, Text} from 'react-native';
import FolderCard from '../Components/FolderCard';
import { userAuth } from '../Components/userDataContext';

export default function Music() {
  const {user, setUser, items, setItems, changeLogIn, musicFiles, setMusicFiles} = userAuth();
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const instruments =  Object.getOwnPropertyNames(musicFiles);
  console.log(instruments);
  console.log(musicFiles, "MUSIC")
  console.log(musicFiles.Saxophone[0].Songs, "SONG]");
  const printFile = async (uri) => {
    console.log('File has been saved to:', uri);
    await Print.printAsync({uri, printerUrl: selectedPrinter?.url});
  }
  return (
    <SafeAreaView style={{flex: 1, alignContent: 'center'}}>
      {instruments.map((instrument) => (
        
          <FolderCard folderName={instrument} subFiles={musicFiles[instrument]} print={printFile}/>
      ))}
    </SafeAreaView>
  );
}
