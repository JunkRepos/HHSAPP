import React, {useState}from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import CalenderCardInfo from '../CalenderComp/CalenderCardInfo';

function CalenderCard({item, navigation, img}){
    const [showModal, setShowModal] = useState(false);
    const onPress = () => {setShowModal(!showModal)};

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('blur', e => {
        if (showModal) {
          onPress();

        }
      });
      return unsubscribe;
    }, [navigation]);

    return (
      <View>
        <TouchableOpacity style={{marginRight: 10, marginTop: 17}} onPress={()=>onPress()}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: "column"}}>
              <Text style={{marginBottom: 10}}>{item.time}</Text>
              <Text style={{fontSize: 20, marginBottom: 10, maxWidth: "90%"}}>{item.name}</Text>
              <Text style={{fontSize: 14, color: 'grey'}}>{item.location}</Text>
              <Text style={{fontSize: 14, color: 'grey'}}>{item.guests}</Text>
              </View>
              
              
              <Avatar.Image source={img}/>
            </View>
          </Card.Content>
        </Card>
        </TouchableOpacity>
              
            <CalenderCardInfo item={item} show={showModal} setShow={setShowModal}/>
      </View>
    )
    
  }

export default CalenderCard;
const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 24,
    alignSelf: 'center',
  },
  box: {

    marginHorizontal: 10,
    width: "80%",
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  }
});
              {/* //   <Card onPress={onPress}>
              //   <Card.Content>

              //     <View */}
              //       style={{
              //         flexDirection: 'row',
              //         justifyContent: 'space-between',
              //         alignItems: 'center',
              //       }}>
              //       <Text>time: {item.time}</Text>
              //     </View>

              //     <View
              //       style={{
              //         flexDirection: 'row',
              //         justifyContent: 'space-between',
              //         alignItems: 'center',
              //       }}>
              //       <Text>location: {item.location}</Text>
              //     </View>

              //     <View
              //       style={{
              //         flexDirection: 'row',
              //         justifyContent: 'space-between',
              //         alignItems: 'center',
              //       }}>
              //       <Text>gear: {item.gear}</Text>
              //     </View>

              //   </Card.Content>
              // </Card>