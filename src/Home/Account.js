import React, {useState} from 'react'
import { View, TouchableOpacity, Text, Platform} from 'react-native'
import { userAuth } from '../Components/userDataContext';
import { Ionicons } from '@expo/vector-icons';
import { EditUsername } from '../Components/EditAccount/EditUsername';
export const Account = () => {
    
    const {userData, setUserData, logOut, user} = userAuth();
    // console.log(user);
    // console.log(user.username);
    // console.log(userData);
    // console.log(user);
    const username = user.username;
    const id = user.id;
    const [changeUsernameVisible, setChangeUsernameVisible] = useState(false);
    return (
        <View>
            <EditUsername username={username} id={id} visible={changeUsernameVisible} setVisible={setChangeUsernameVisible}/>
            <Text style={{
                fontSize: 20,
                justifyContent: 'center',
                paddingTop: "5%",
                fontFamily: "Avenir Next",
                fontWeight: "500",
                paddingHorizontal: "7%",
                color: "#525252"}}>Account Information</Text>
            <View style={{marginTop: "1%", width: "100%", backgroundColor: "white", borderTopColor: 'grey', borderTopWidth: 0.2, marginBottom: 0.4}}>
            <View style={{flexDirection: 'row', marginLeft: "7%", borderBottomWidth: 0.2, borderBottomColor: 'grey', paddingVertical: "2%"}}>
            <Text style={{
                fontSize: 18,
                justifyContent: 'center',
                fontFamily: "Avenir Next",
                fontWeight: "500",}}>Username</Text>
            <Text style={{fontFamily: "Avenir Next",fontSize: 18, position: 'absolute', alignSelf: 'center', right: "10%"}}>{user.username}</Text>
            <TouchableOpacity onPress={()=>{setChangeUsernameVisible(true)}} style={{position: 'absolute', alignSelf: 'center', right: "3%"}}>
            <Ionicons size={20} style={{fontFamily: "Avenir Next"}} name='md-chevron-forward'/>
            </TouchableOpacity>
            </View>
            </View>
            <View style={{width: "100%", backgroundColor: "white", marginBottom: 0.2}}>
            <View style={{flexDirection: 'row', marginLeft: "7%", borderBottomWidth: 0.2, borderBottomColor: 'grey', paddingVertical: "2%"}}>
            <Text style={{
                fontSize: 18,
                justifyContent: 'center',
                fontFamily: "Avenir Next",
                fontWeight: "500",}}>Email</Text>
            <Text style={{fontFamily: "Avenir Next",fontSize: 18, position: 'absolute', alignSelf: 'center', right: "10%"}}>{user.email}</Text>
            <TouchableOpacity style={{position: 'absolute', alignSelf: 'center', right: "3%"}}>
            <Ionicons size={20} style={{fontFamily: "Avenir Next"}} name='md-chevron-forward'/>
            </TouchableOpacity>
            </View>
            </View>
            <View style={{width: "100%", backgroundColor: "white", marginBottom: 0.2}}>
            <View style={{flexDirection: 'row', marginLeft: "7%", borderBottomWidth: 0.2, borderBottomColor: 'grey', paddingVertical: "2%"}}>
            <Text style={{
                fontSize: 18,
                justifyContent: 'center',
                fontFamily: "Avenir Next",
                fontWeight: "500",}}>Section</Text>
            <Text style={{fontFamily: "Avenir Next",fontSize: 18, position: 'absolute', alignSelf: 'center', right: "10%"}}>{user.section}</Text>
            <TouchableOpacity style={{position: 'absolute', alignSelf: 'center', right: "3%"}}>
            <Ionicons size={20} style={{fontFamily: "Avenir Next"}} name='md-chevron-forward'/>
            </TouchableOpacity>
            </View>
            </View>
            <View style={{width: "100%", backgroundColor: "white", marginBottom: 0.2}}>
            <View style={{flexDirection: 'row', marginLeft: "7%", borderBottomWidth: 0.2, borderBottomColor: 'grey', paddingVertical: "2%"}}>
            <Text style={{
                fontSize: 18,
                justifyContent: 'center',
                fontFamily: "Avenir Next",
                fontWeight: "500",}}>Instrument</Text>
            <Text style={{fontFamily: "Avenir Next",fontSize: 18, position: 'absolute', alignSelf: 'center', right: "10%"}}>{user.instrument}</Text>
            <TouchableOpacity style={{position: 'absolute', alignSelf: 'center', right: "3%"}}>
            <Ionicons size={20} style={{fontFamily: "Avenir Next"}} name='md-chevron-forward'/>
            </TouchableOpacity>
            </View>
            </View>
            <View style={{width: "100%", backgroundColor: "white", marginBottom: 0.2}}>
            <View style={{flexDirection: 'row', marginLeft: "7%", borderBottomWidth: 0.2, borderBottomColor: 'grey', paddingVertical: "2%"}}>
            <Text style={{
                fontSize: 18,
                justifyContent: 'center',
                fontFamily: "Avenir Next",
                fontWeight: "500",}}>Position</Text>
            <Text style={{fontFamily: "Avenir Next",fontSize: 18, position: 'absolute', alignSelf: 'center', right: "10%"}}>{user.position}</Text>
            <TouchableOpacity style={{position: 'absolute', alignSelf: 'center', right: "3%"}}>
            <Ionicons size={20} style={{fontFamily: "Avenir Next"}} name='md-chevron-forward'/>
            </TouchableOpacity>
            </View>
            </View>
            <View style={{width: "100%", backgroundColor: "white", marginBottom: 0.2}}>
            <View style={{flexDirection: 'row', borderBottomWidth: 0.2, borderBottomColor: 'grey', paddingVertical: "2%"}}>
            <Text style={{
                fontSize: 18,
                justifyContent: 'center',
                fontFamily: "Avenir Next",
                fontWeight: "500",marginLeft: "7%"}}>Password</Text>
            <TouchableOpacity style={{position: 'absolute', alignSelf: 'center', right: "3%"}}>
            <Ionicons size={20} style={{fontFamily: "Avenir Next"}} name='md-chevron-forward'/>
            </TouchableOpacity>
            </View>
            </View>
            <Text style={{
                fontSize: 20,
                justifyContent: 'center',
                paddingTop: "5%",
                fontFamily: "Avenir Next",
                fontWeight: "500",
                paddingHorizontal: "7%",
                color: "#525252"}}>Notifications</Text>
            <TouchableOpacity onPress={()=>{logOut()}}>
                <Text>Log Out</Text>
            </TouchableOpacity>
            
        </View>
    );
}
// const percent = 0.78
// const monthNames = ["January", "February", "March", "April", "May", "June",
// "July", "August", "September", "October", "November", "December"
// ];
// const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// function toDate(datetime, monthNames, dayNames){
//     const date = datetime.getDate().toString();
//     const month = monthNames[datetime.getMonth()];
//     const day = dayNames[datetime.getDay()];
//     return day+", "+month+" "+date;
//   }
  
//   return (
//     <View style={{flex: 1, alignContent: 'center', paddingHorizontal: 10}}>
        
//         <Text style={{
//             fontSize: '40', 
//             paddingTop: 50, 
//             paddingBottom: 15,
//             fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : '', 
//             alignSelf: 'center', }}
//             >Show</Text>
//         <ProgressBar width={350} height={40} color={(0, 255, 127)} percent={percent} title={"Tornado"} padding={"0%"} center={false}/>
//         {/* <ProgressBar width={100} height={20} color={(0, 255, 127)} percent={0} title={"Part 2"} padding={"5%"} center={false}/>
//         <ProgressBar width={100} height={20} color={(0, 255, 127)} percent={0} title={"Part 3"} padding={"5%"} center={false}/> */}
//         <Text style={{fontWeight: '300',
//             fontSize: 30,
//             paddingHorizontal: "5%",
//             paddingTop: "5%",
//             paddingBottom: "1%"}}>{toDate(new Date(), monthNames, dayNames)}</Text>
            
//         <Text style={{fontWeight: '300',
//             fontSize: 20,
//             paddingHorizontal: "10%",
//             paddingTop: "1%",
//             paddingBottom: "1%"}}>Practice Notes</Text>
//         <Text style={{fontWeight: '300',
//             fontSize: 15,
//             paddingHorizontal: "7%",
//             paddingVertical: "1%"}}> • Finished parts 25-29</Text>
//         <Text style={{fontWeight: '300',
//             fontSize: 15,
//             paddingHorizontal: "7%",
//             paddingVertical: "1%"}}> • Cleaned parts 10-20</Text>
        
//         <Text style={{fontWeight: '300',
//             fontSize: 15,
//             paddingHorizontal: "7%",
//             paddingVertical: "1%"}}> • Played parts 0-5 with music</Text>
//         <View style={{height: "20%"}}>
//         <Text style={{right: 0, position: 'absolute', fontWeight: '300',
//             fontSize: 20,
//             paddingHorizontal: "5%",
//             paddingTop: "5%",
//             paddingBottom: "1%"}}>Comments</Text>
//         <Text style={{right: 0, top: "30%", position: 'absolute', fontWeight: '300',
//             fontSize: 15,
//             paddingHorizontal: "7%",
//             paddingVertical: "1%"}}> • Finished parts 25-29</Text>
//         <Text style={{right: 0, top: "45%", position: 'absolute', fontWeight: '300',
//             fontSize: 15,
//             paddingHorizontal: "7%",
//             paddingVertical: "1%"}}> • Cleaned parts 10-20</Text>
//         <Text style={{right: 0, top: "60%", position: 'absolute', fontWeight: '300',
//             fontSize: 15,
//             paddingHorizontal: "7%",
//             paddingVertical: "1%"}}> • Played parts 0-5 with music</Text>
//         <TouchableOpacity onPress={()=>{logOut()}}>
//             <Text>TOUCH ME</Text>
//         </TouchableOpacity>
//         </View>
//         {/* <TouchableOpacity onPress={()=>{logOut()}}>
//             <Text>
//                 HELLOOODOOOOOD
//             </Text>
//         </TouchableOpacity> */}
//     </View>
//   )
// }