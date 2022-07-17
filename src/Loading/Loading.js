import React from 'react'
import { View, Image, useWindowDimensions, Text} from 'react-native'
export const Loading = () => {
  const {height, width} = useWindowDimensions()
  return (
    <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignContent: 'center'}}>
    <Image
    style={{
        width: width*0.8, 
        height: width*0.8}}
        source={require('../../assets/HomesteadBandLogo.png')}/>
    <Text style={{fontSize: 40, color: "green"}}>Homestead Marching Band</Text>
    </View>
  )
}
