import { StyleSheet, Text, View, Image,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import instance from '../components/axios';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const AScreen = ({navigation,route}) => {
  
  const aff = route.params.aff
    console.log("ascreen",aff)
  const [notices,setNotices] = useState("")
  const [notice,setNotice] = useState(false)



  useFocusEffect(
    React.useCallback(() => {
      // Fetch data or perform any other necessary refresh actions here
      instance.post("getAllNotices").then(
        (res) => {
          const temp = res.data;
          setNotices(temp);
          setNotice(!notice);
        }
      );

    },[])
  )
//   useEffect(()=>{
//     instance.post("getAllNotices").then(
//       (res)=>{
//         console.log(res.data,"image")
//         const temp = res.data
//         setNotices(temp)
//     setNotice(!notice)


//       }
//     )
 
//   },[])


//   const handleDelete=(id)=>{
//     console.log(id)

//     instance.post("deletePost",{id:id}).then(
//         (res)=>{
//             console.log(res.data.message)
//             if(res.data.message==="deleted"){
//                 console.log("jj")
//                 navigation.navigate('NewPost')
//             }
//             else{
//                 console.log("delete unsuccessful")
//                 Alert.alert(
                        
//                     'Delete unsuccessful',
//                     'Could not delete the post!',
//                     [
//                         {
//                             text: 'OK', // Button text
//                         },
//                     ],
//                     {
//                         cancelable: true,
//                     },
//                     )
//             }
//     })
//   }

  const nlist = () =>{

    if(notices && Array.isArray(notices)){
  
    return notices.reverse().map(element=>{
    return(
            <TouchableOpacity
            onPress={()=>{
              navigation.navigate("NoticeScreen",{title:element.title,desc:element.description,image:element.image,vdate:element.validityDate,aff:aff,id:element._id})
            }}>
            <View key={element._id} style={styles.cards}>
            <View style={styles.details}>
            <Text style={styles.dName}>{element.title}</Text>
            <Text style={styles.desc}>{element.description}</Text>
            <Image  style={styles.image} src={element.image}/>
            </View>
            <View style={styles.vdate}>
            <Text style={styles.dText}>Valid till : {element.validityDate}</Text>
            </View>
            {/* <View style={styles.dbtnContainer}>
            <TouchableOpacity 
                onPress={()=>{handleDelete(element._id)}}
                style={styles.dButton}
            >
                <Text style={styles.delText}>Delete</Text>
            </TouchableOpacity> */}
            {/* </View> */}
            </View>
            </TouchableOpacity>
            

    )
   })
}

  }


  const empty = () =>{
    if(notices.length===0){
      console.log("empyt")
    return(
      <View>
      <Text style={styles.np}>No posts</Text>
    </View>
    )
    }
    else{
      
    }
  }


  return (
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={styles.inner}>
    <View style={styles.container}>


    <View style={styles.topBar}>
        <Text style={styles.topText}>All Notices </Text>
    </View>

    <View style={styles.content}>
      {nlist()}
    </View>


    <View>
      {empty()}
    </View>

    </View>
    </View>
  </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
  )
}

export default AScreen


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
        fontSize:50,
        color:'white'
    },

    cards:{
      backgroundColor:"grey",
      width:"100%",
      // alignItems:"center",
      padding:"2%",
      color:'white',
      borderRadius:10,
      marginBottom:20
    },

    content:{
      width:"80%",
      color:'white',
      
    },

    details:{
      alignItems:"center"
    },

    dName:{
      fontSize:30,
      color:"white",
      
    },

    dText:{
      alignItems:"flex-start"
    },
    vdate:{ 
      
      marginTop:10,
      // backgroundColor:"yellow",
      alignItems:"flex-end"
    },

    dText:{
      fontSize:12,
    },
    desc:{
      marginTop:5,
      marginBottom:15
    },

    image:{
      height:250,
      width:250,
      borderRadius:10
    },
    np:{
      fontSize:20
    },

    dbtnContainer:{
        alignItems:"center",
        margin:10,
    },
    dButton:{
        alignItems:'center',
        borderRadius:5,
        width:60,
        marginTop:5,
        backgroundColor:"red",
        padding:7
    },
    delText:{
        color:"white"
    }

})