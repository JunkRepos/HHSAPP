import React from 'react'
import { Modal } from 'react-native-paper'
import { View, Text } from 'react-native'
export const EditUsername = () => {
  return (
    <Modal
            animationType = {"slide"}
            transparent={true}
            visible={true}
            size={5}>
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
                    <Text>Edit Username</Text>
                </View>
            </Modal>
            
  )
}
