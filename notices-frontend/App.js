import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import registerNNPushToken from 'native-notify';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import Sample from './screens/Sample';
import SignupScreen2 from './screens/SignupScreen2';
import DScreen from './screens/DScreen';
import PostNew from './screens/PostNew';
import NewPost from './screens/NewPost';
import NoticeScreen from './screens/NoticeScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  registerNNPushToken(10692, '7CUT8pcSuehhKc5ym5wZkD');
  return (
    <NavigationContainer>
    <Stack.Navigator>
    

      <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false}} name="Signup" component={SignupScreen} />
      <Stack.Screen options={{headerShown:false}} name="Signup2" component={SignupScreen2} />
      <Stack.Screen options={{headerShown:false}} name="Sample" component={Sample} />
      <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
      <Stack.Screen options={{headerShown:false}} name="DScreen" component={DScreen} />
      <Stack.Screen options={{headerShown:false}} name="NoticeScreen" component={NoticeScreen} />
      <Stack.Screen options={{headerShown:false}} name="NewPost" component={PostNew} />
      
      
      <Stack.Screen options={{headerShown:false}} name="Newpost" component={NewPost} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
