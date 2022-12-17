import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Calender from '../Home/Calender'
import Music from '../Home/Music'
import Account from '../Home/Account'
const Tab = createBottomTabNavigator();
function MainStack (){
    // const insets = useSafeAreaInsets();
    return (
<Tab.Navigator 
    screenOptions={{
        headerTitleStyle: {fontSize: 20, fontFamily: "Avenir Next", fontWeight: "500"},
        tabBarBackground: () => (
          <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        ),
      }}>
<Tab.Screen name="Calendar" component={Calender}  options={{ title: 'Calender', 
tabBarIcon: ({ color, size }) => (
    <Ionicons name="calendar-outline" color={color} size={size} />
  )}}/>
<Tab.Screen name="Music" component={Music} options={{ title: 'Music', 
tabBarIcon: ({ color, size }) => (
    <Ionicons name="musical-notes-outline" color={color} size={size} />
  )}}/>
<Tab.Screen name="Account" component={Account} options={{ title: 'Account', 
tabBarIcon: ({ color, size }) => (
    <Ionicons name="person-circle-outline" color={color} size={size} />
  )}}/>

</Tab.Navigator>

    );
};

export default MainStack;