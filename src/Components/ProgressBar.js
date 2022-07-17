import React from 'react'
import { View, Text} from 'react-native'
export default function ProgressBar({width, height, percent, title, padding, center}) {
  return (
    <View style={{width: width, alignItems: center ? 'center' : 'flex-start', marginHorizontal: padding}}>
    <Text style={{fontSize: width/15, paddingHorizontal: "5%", paddingVertical: "2%", fontFamily: Platform.OS === 'ios' ? 'Arial MD Bold' : '', fontWeight: '300'}}>{title}</Text>
    <View style={{width: width, height: height, borderColor: 'black', borderWidth: 2, flexDirection: 'row', borderRadius: width/10}}>
        <View style={{justifyContent: 'center', margin: height*0.1, width: width*percent-height*0.2-4, height: height-4-height*0.2, backgroundColor: 'rgba(0, 200, 100, 100)', borderRadius: 20, alignItems: 'flex-end'}}>
            {/* <Text style={{fontWeight: '300', marginHorizontal: "15%"}}>{percent*100}%...</Text> */}
            <Text style={{fontSize: width*14/350, paddingVertical: "2%", paddingHorizontal: '5%',fontFamily: Platform.OS === 'ios' ? 'Arial MD Bold' : '', fontWeight: '300'}}>Tornado {percent*50}/50</Text>
        </View>
    </View>
    </View>
  )
}
