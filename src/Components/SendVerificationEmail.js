import React, { Component, useEffect, useState } from 'react';
import { View, Alert, Text, TouchableOpacity} from 'react-native';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import OTPTextView from 'react-native-otp-textinput';
import emailjs from '@emailjs/browser';


export default function SendVerificationEmail({emailTo, username, otp, visible, setVisible, createAccount}) {
    const [input, setInput] = useState("");
    const [submitColor, setSubmitColor] = useState('rgba(255,255,255,0.5)');
    console.log(otp);
    useEffect(()=>{
        console.log('sent', emailTo);
        // handleEmail()
    }, [])
    useEffect(()=>{
        if (input.length == 6){
            setSubmitColor('white');
        } else {
            setSubmitColor('rgba(255,255,255,0.5)');
        }
    }, [input])
    // handleEmail = () => {
    //     emailjs.send("service_aph3v61","template_m61q7jh",{
    //         to_name: "Advait",
    //         message: "123456",
    //         }, "bYIpD2-gvTYscRnHa");
    // }
    return (
        <Dialog
        visible={visible}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
      >
        <DialogContent style={{paddingTop: "5%", alignItems: 'center', width: "90%"}}>
        <Text style={{fontSize: 20, fontWeight: '500', fontFamily: "Avenir Next"}}>One more step!</Text>
        <Text style={{color: 'rgb(75,75,75)', marginHorizontal: "5%", marginTop: "5%", fontSize: 15, fontWeight: '500', textAlign: 'center'}}>Instructions sent to {<Text style={{color: "rgb(0,200,100)"}}>{emailTo}</Text>}.</Text>
        <Text style={{color: 'rgb(75,75,75)', marginHorizontal: "10%", marginTop: "5%", fontSize: 15, fontWeight: '500', textAlign: 'center'}}>Get your verification code and enter it below.</Text>
        <OTPTextView
        handleTextChange={(text)=>{setInput(text)}}
        inputCount={6}
        keyboardType="numeric"
        textInputStyle={{borderRadius: 10, borderWidth: 1}}/>
        <View style={{flexDirection: 'row', paddingTop: "5%"}}>
        <TouchableOpacity onPress={()=>{setVisible(false)}} style={{marginRight: "5%", paddingHorizontal: "10%", paddingVertical: "3.5%", borderWidth: 0.5, borderColor: 'grey', borderRadius: 5}}>
            <Text style={{fontWeight: "600", fontFamily: "Avenir Next", fontSize: 16}}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{(input==otp) ? (createAccount(),setVisible(false)) : Alert.alert("Incorrect OTP")}} style={{backgroundColor: '#0096FF', marginLeft: "5%", paddingHorizontal: "11%", paddingVertical: "3.5%", borderRadius: 5, shadowRadius: 1, shadowColor: 'grey', shadowOpacity: 1, shadowOffset: [1,1]}}>
            <Text style={{fontWeight: "600", fontFamily: "Avenir Next", fontSize: 16, color: submitColor}}>SUBMIT</Text>
        </TouchableOpacity>
        </View>
        </DialogContent>
        </Dialog>
    )
}
