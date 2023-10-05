import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React,{useState} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { registerIndieID } from 'native-notify';
import instance from '../components/axios';


const LoginScreen = ({navigation,route}) => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [dept,setDept] = useState('')
    const [aff,setAff] = useState('')
    const handleLogin=()=>{

        if(email && password){
            instance.post('login',{
                email:email,
                password:password
            }).then((res)=>{
                console.log(res.status,"from the login")
                setDept(res.data.dept)
                setAff(res.data.message)
                console.log(aff)
                if(res.status===200){
                    Alert.alert(
                
                        'success',
                        'wahooo!',
                        [
                            {
                              text: 'OK', // Button text
                            },
                          ],
                        {
                          cancelable: true,
                        },
                    )
                    // registerIndieID(email, 10692, '7CUT8pcSuehhKc5ym5wZkD');
                    console.log(aff)
                    navigation.navigate('Home',{email:email,dept:dept,aff:aff})
                }
                else{
                    Alert.alert(
                
                        'User not found',
                        'Kindly register first',
                        [
                            {
                              text: 'OK', // Button text
                            },
                          ],
                        {
                          cancelable: true,
                        },
                    )
                }
            }).catch((error)=>{
                console.log(error)
            })
        }
    }

  return (

    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={styles.inner}>
    <View style={styles.topBar}>
    <View style={styles.title}>
        <Text style={styles.titleText}>Sign In</Text>
    </View>
    </View>

    <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Email'
        value={email}
        onChangeText={text=>setEmail(text)}
        style={styles.input}
        />
    </View>

    <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Password'
        value={password}
        onChangeText={text=>setPassword(text)}
        style={styles.input}
        secureTextEntry
        />
    </View>
    
    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            >
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{
                navigation.navigate('Signup')
            }}
            style={[styles.button,styles.buttonOutline]}
            >
        <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

    </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  ) 
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


inputContainer:{
    marginTop:15,
    
    width:'80%'
},
input:{
    backgroundColor:'white',
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius:10,
    marginTop:5,
    height:45,
},
buttonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems: 'center',
    marginTop:40,
},
button:{
    backgroundColor:'#0782F9',
    width:'100%',
    padding: 15,
    borderRadius:10,
    alignItems:'center',
    marginBottom:15
},


buttonOutline:{
    backgroundColor:'white',
    marginTop: 10,
    borderColor:'#0782F9',
    borderWidth: 2,
},

buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize:16,
},

buttonOutlineText:{
    color:'#0782F9',
    fontWeight:'700',
    fontSize:16,
},

inner:{
    alignItems:'center',

},

topBar:{
    backgroundColor:"#0782F9",
    height:350,
    width:390,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
    marginBottom:30,

},

title:{
    alignItems:'center',
    marginTop:150
}
,
titleText:{
    fontSize:50,
    color:'white'
}
})