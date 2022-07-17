import React from 'react'
import { KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback, ScrollView} from 'react-native';
const KeyBoardAvoidingView = (props) => {
  return (
<KeyboardAvoidingView
behavior={"position"}
style={{backgroundColor: 'transparent'}}
// keyboardVerticalOffset={50}
>
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<ScrollView>
{props.children}
</ScrollView>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>
);
};
export default KeyBoardAvoidingView;

