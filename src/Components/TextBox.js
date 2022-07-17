import React, {useState} from 'react'
import { TextInput, StyleSheet, View, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
const TextBox = ({placeholder, onChange, secure, value, icon, pad, color, width, showSecure, style}) => {
  const [isSecure, setIsSecure] = useState(secure);
  const changeSecurity = () => {
    setIsSecure(!isSecure);
  }
  return (
    <View style={styles.searchSection}>
    <Ionicons name={icon} size={20} color={'#C0C0C0'} style={{paddingLeft: 10}}/>
    <TextInput
            style={[
              styles.input, {
              padding: pad, 
              width: width}, 
              style]}
            placeholder={placeholder}
            onChangeText={onChange}
            secureTextEntry={isSecure}
            value={value}
            placeholderTextColor={color ? color : '#a6a6a6' }
    />
    {!showSecure ? 
    <View/> : 
    <TouchableOpacity onPress={changeSecurity} style={{position: 'absolute', paddingLeft: 10, right: "15%"}}>
      <Ionicons name={isSecure ? "eye-off" : "eye"} size={20} color={'#C0C0C0'}/>
    </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
    fontSize: 20,
    fontFamily: 'Arial Rounded MT Bold',
    color: '#a6a6a6',

    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 10,
        
    },
  });
export default TextBox;