import React from 'react'
import { TouchableOpacity, Text} from 'react-native'
const CustomButton = ({onPress, text, textColor, color, font, fontSize, width, height, pad}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: color, 
      width: width, 
      height: height, 
      padding: pad}}>
        <Text style={{
          color: textColor, 
          fontFamily: font, 
          fontSize: fontSize}}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton;
