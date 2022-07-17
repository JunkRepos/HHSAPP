// import {useState} from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";
import { View } from 'react-native';
// import { print } from '../Home/Music';
import { Print } from '../Home/Music';
const { StorageAccessFramework } = FileSystem;


const ensureDirAsync = async (dir, intermediates = true) => {
  const props = await FileSystem.getInfoAsync(dir)
  if (props.exist && props.isDirectory) {
      return props;
  }
  let _ = await FileSystem.makeDirectoryAsync(dir, { intermediates })
  return await ensureDirAsync(dir, intermediates)
}

const downloadCallback = downloadProgress => {
  const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
  setDownloadProgress(progress); 
};
const saveIosFile = async (fileUri) => {
  const imageFileExts = ['jpg', 'png', 'gif', 'heic', 'webp', 'bmp'];

if (imageFileExts.every(x => !fileUri.endsWith(x))) {
  const UTI = 'public.item';
  const shareResult = await Sharing.shareAsync(fileUri, {UTI});
}
  
}
export const downloadFile = async (fileName, fileUrl) => {
  
  // const [downloadProgress, setDownloadProgress] = useState();
  const downloadPath = FileSystem.documentDirectory + (Platform.OS == 'android' ? '' : '');
  console.log(FileSystem.documentDirectory, "DIR");
  console.log(downloadPath, "PATH")
  if (Platform.OS == 'android') {
    const dir = ensureDirAsync(downloadPath);
  }

  // let fileName = fileUrl.split('Reports/')[1];
  //alert(fileName)
  const downloadResumable = FileSystem.createDownloadResumable(
    fileUrl,
    downloadPath + fileName,
    {},
    // downloadCallback
  );

  try {
    const { uri } = await downloadResumable.downloadAsync();
    if (Platform.OS == 'android')
      saveAndroidFile(uri, fileName)
    else
      saveIosFile(uri);
      
  } catch (e) {
    console.error('download error:', e);
  }
  return (
    <View></View>
  );
}
const saveAndroidFile = async (fileUri, fileName = 'File') => {
  try {
    const fileString = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
    
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    try {
      await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, fileString, { encoding: FileSystem.EncodingType.Base64 });
          alert('Report Downloaded Successfully')
        })
        .catch((e) => {
        });
    } catch (e) {
      throw new Error(e);
    }

  } catch (err) {
  }
}