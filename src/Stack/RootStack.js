import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../LogIn/LogInScreen';
import Register from '../Register/RegisterScreen';
import MainStack from './MainStack';
import { Loading } from '../Loading/Loading';
import { UserContextProvider } from '../Components/userDataContext';
import { navigationRef } from "../Components/NavRef";
const Stack = createNativeStackNavigator();
export default function RootStack(){
  return (
    <UserContextProvider >
      <NavigationContainer ref={navigationRef}>
      
        <Stack.Navigator

        screenOptions={{
          headerShown: false,
          SafeAreaView: true
        }}>
          <Stack.Screen name="Loading" component={Loading} options={{ title: 'Loading' }}/>
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/>
          <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }}/>
          <Stack.Screen name="Home" component={MainStack} options={{ title: 'Home' }}/>
          {/* <Stack.Screen name="Edit" component={EditAccount} options={{ title: 'Account'}}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  
  );
}

