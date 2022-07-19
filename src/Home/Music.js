import * as React from 'react';
import * as Print from 'expo-print';
import { SafeAreaView, TouchableOpacity, Text} from 'react-native';
import FolderCard from '../Components/FolderCard';

export default function Music() {
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const printFile = async (uri) => {
    console.log('File has been saved to:', uri);
    await Print.printAsync({uri, printerUrl: selectedPrinter?.url});
  }
  const uri = "https://firebasestorage.googleapis.com/v0/b/hhsapp-a7ce9.appspot.com/o/JPG%2F2022-05-04%2017-26.jpg?alt=media&token=cba3ac45-3d5a-4056-8a65-8f7dc2fa00c4"
  return (
    <SafeAreaView style={{flex: 1, alignContent: 'center'}}>
      {/* <Text style={{fontSize: 40, alignSelf: 'center', fontFamily: "Avenir Next"}}>Music</Text> */}
      <FolderCard folderName={"SAX"} subFiles={{"SONG1": uri, "SONG2": uri, "SONG3": uri}} print={printFile}/>
    </SafeAreaView>
  );
}
