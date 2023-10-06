import { StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {departments} from '../components/Cards/'
import axios from 'axios'
import {useState} from 'react'

const HomeScreen = ({navigation,route}) => {

  // const [email,setEmail] = useState('')
  // const [dept,setDept]=useState('')
  // setEmail(route.params.email)
  // setDept(route.params.dept)

  const email = route.params.email
  const dept = route.params.dept
  const aff = route.params.aff
  console.log(aff)
  const deptList = () =>{
    return departments.map(element => {
      return (
        <TouchableOpacity
        onPress={()=>{
        //   Alert.alert(
        //         "Clicked "+element.title,
        //         "that's it",[
        //           {
        //             text: 'OK', // Button text
        //           },
        //         ],
        
        //     {
        //       cancelable: true,
        //     },
        // )
        

        navigation.navigate("DScreen",{dept:dept,email:email,dName:element.title,aff:aff})

        }}
        >
        <View key={element.key} style={styles.cards}>
          <Text style={styles.dName}>{element.title}</Text>
          <Text style={styles.dSubTitle}>{element.subtitle}</Text>
        </View>
        </TouchableOpacity>
      );
    });
  }

  return (
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={styles.inner}>
   <View style={styles.container}>
   <View style={styles.topBar}>
      <Text style={styles.topText}>Home</Text>
      </View>

   

    <View style={styles.cardsContainer}>
      
      {deptList()}
    </View>
   </View>
  </View>
  </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
   
  )
}

export default HomeScreen

const styles = StyleSheet.create({
container:{
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
},
topBar:{
  backgroundColor:"#0782F9",
  height:250,
  width:'100%',
  borderBottomLeftRadius:40,
  borderBottomRightRadius:40,
  marginBottom:30,
  alignItems:'center',

},
topText:{
  marginTop:100,
  color:'white',
  fontSize:50,
  
},

// buttonContainer:{
//   backgroundColor:'green',
//   height:100,
//   width:'90%',
//   borderRadius:20,
//   // alignItems:'center',
//   // textAlignVertical:'center',
//   marginBottom:20,
//   marginTop:20
// },

// buttonContainer1:{
//   backgroundColor:'purple',
//   height:100,
//   width:'90%',
//   borderRadius:20,
//   // alignItems:'center',
//   // textAlignVertical:'center',
//   marginBottom:20,
//   marginTop:10
// },

// buttonOutlineText:{
//   marginTop:'3%',
//   marginLeft:'5%',
//   color:'white',
//   fontSize:35
// },

cards:{
  backgroundColor:'green',
  height:100,
  width:'100%',
  borderRadius:20,
  // alignItems:'center',
  // textAlignVertical:'center',
  marginBottom:20,
  marginTop:10
},

cardsContainer:{
  width:'90%'
},

dName:{
  marginTop:'3%',
  marginLeft:'5%',
  color:'white',
  fontSize:35
}
})