import {TextInput, TouchableOpacity,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,} from 'react-native'
import React,{useState} from 'react'
import axios from 'axios'
import Dropdown from '../components/dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SelectList } from 'react-native-dropdown-select-list'
import instance from '../components/axios';

const SignupScreen = ({navigation}) => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [cpassword,setCpassword]=useState('')
    
    const [validPassword,setValidPassword]=useState(true)

    const [isValidEmail,setIsValidEmail]=useState(true)

    const [dept,setDept]=useState('')


    const data= [
        {key:'1', value:'MCA'},
        {key:'2', value:'EEE'},
    ]

    const validateEmail = ()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(email));

        if(isValidEmail === false){
            Alert.alert(
                
                'Invalid Email',
                'Please enter a valid email',
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
    }

    const [selected, setSelected] = React.useState("");




    
    

    const passwordCheck=()=>{
        if (password != cpassword){
            setValidPassword(false);
            Alert.alert(
                
                'Password Mismatch',
                'Passwords should be the same',
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
        else{
            setValidPassword(true)
        }
    }


    const handleRegister =()=>{
        console.log("hi")
        instance.post('register',{
        name:name,
        email:email,
        password:password,
        dept:dept,
        }
        ).then((res)=>{
            console.log(res.message,"from the backend")
            Alert.alert(
                'Registration Successful',
                'Congrats!',
                [
                    {
                      text: 'OK', // Button text
                    },
                  ],
                {
                  cancelable: true,
                },
            )
            navigation.navigate("Login")
        }).catch((err)=>{
            console.log(err,"error occurred")
        })

        
    }

    const handleDept = (value) =>{
        setDept(value)
    }

  return (

    
    // <KeyboardAvoidingView
    //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //     style={styles.container}  
    // >
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={styles.inner}>
    <View style={styles.topBar}>
    <View style={styles.title}>
        <Text style={styles.titleText}>Sign Up</Text>
    </View>
    </View>
    
    <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Name'
        value={name}
        onChangeText={text=>setName(text)}
        style={styles.input}
        />
    </View>

    <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Email'
        value={email}
        onChangeText={text=>setEmail(text)}
        onEndEditing={validateEmail}
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

    <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Confirm Password'
        value={cpassword}
        onChangeText={text=>setCpassword(text)}
        style={styles.input}
        onEndEditing={passwordCheck}
        secureTextEntry
        />
    </View>
    

    
    <View style={styles.selectOption}>
    <SelectList
        setSelected={(val) => setSelected(val)} 
        data={data}
        maxHeight={90}
        save="value"
        placeholder='Department'
        onSelect={()=>{handleDept(selected)}}
    />
    </View>

    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={
                
                ()=>{

                    if(name && isValidEmail && password && validPassword)
                    {
                    if(validPassword){
                        handleRegister()
                        console.log("register button")
                }
                    else{
                        Alert.alert(
                
                            'Password Mismatch',
                            'Passwords should be the same',
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
                }
                else{
                    Alert.alert(
                        'Some fields are empty/Invalid',
                        'Kindly fill all the fields with correct data',
                        [
                            {
                              text: 'OK', // Button text
                            },
                          ],
                        {
                            cancelable: true,
                        }
                    )
                }
                }
            }
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

export default SignupScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    inner: {
        paddingBottom: 24,
        flex: 1,
        justifyContent: 'space-around',
        alignItems:'center'
      },

inputContainer:{
    width:'80%'
},
title:{
    marginTop:50,
    alignItems:'center',
    
},
titleText:{
    marginTop:50,
    fontSize:50,
    fontWeight:"500",
    color:"white",
},
input:{
    height:45,
    backgroundColor:'white',
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius:10,
    marginTop:15,
    color:'black'
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
    padding: 10,
    borderRadius:10,
    alignItems:'center',
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

pickerButton:{
    paddingHorizontal: 20,
    paddingVertical:10,
    alignItems:"center",
    borderRadius:10,
    marginBottom:10
},

DatePickerbutton:{
    width:120,
    backgroundColor: '#0782F9',
    
},

DatePickerbuttonText:{
    color:'white'
},

DatePicker:{
    width:'80%'
},

selectOption:{
    marginTop:15,
    width:'80%',
    backgroundColor:"white",
    borderRadius:10,


},
topBar:{
    backgroundColor:"#0782F9",
    height:250,
    width:'100%',
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
    marginBottom:30,
}

})