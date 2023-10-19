import { StyleSheet, Text,Modal, View, Image,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import instance from '../components/axios';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageModal from '../components/imageModal';
import { useFocusEffect } from '@react-navigation/native';


const NoticeScreen = ({navigation,route}) => {

    const title = route.params.title
    const desc = route.params.desc
    const image = route.params.image
    const vdate = route.params.vdate
    const imageUri = image
    const aff=route.params.aff
    const [isModalVisible, setIsModalVisible] = useState(false);
    var dBtn = false
    var id = null
    var stud = null
    var staff = null
    var pstDate = null
    var dept = null
    var read = null
    var array = []
    // console.log(aff)
    if(aff==="admin"){
      dBtn = true
      console.log(aff)
      id = route.params.id
      stud = route.params.stud
      staff = route.params.staff
      pstDate = route.params.pstDate
      dept = route.params.dept
      read = route.params.read
      if(read){
        array = read.split(",")
      }
      console.log("arr",array)
      console.log("stud:",stud)
      console.log("staff:",staff)

    }

    useFocusEffect(
      React.useCallback(() => {
        // Fetch data or perform any other necessary refresh actions here
        array = null
        console.log("no value")
      },[])
    )

    const openModal = () => {
        // setSelectedImageIndex(index);
        setIsModalVisible(true);
      };
    
      const closeModal = () => {
        setIsModalVisible(false);
      };


      const handleDelete=(id)=>{
        console.log(id)
    
        instance.post("deletePost",{id:id}).then(
            (res)=>{
                console.log(res.data.message)
                if(res.data.message==="deleted"){
                    console.log("jj")
                    navigation.navigate('AScreen',{aff:aff})
                }
                else{
                    console.log("delete unsuccessful")
                    Alert.alert(
                            
                        'Delete unsuccessful',
                        'Could not delete the post!',
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
        })
      }


      const readlist = () =>{

        if(array.length!=0){
          console.log("read",array,array.length)
          return array.reverse().map(element=>{
            return(
              <Text>{element}</Text>
              )
            })
          }
          else{
        array = []
      }
      }

      const empty = ()=>{
        console.log(array.length)
        if(array.length===0){
          console.log("empto")
          return(
            <View>
            <Text>No views yet</Text>
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
        <Text style={styles.topText}>{title} </Text>
    </View>

    <View style={styles.descContainer}>
        <Text style={styles.desc}>{desc}</Text>
        <TouchableOpacity onPress={
            ()=>{
                openModal()
            }
        }>
        <Image style={styles.img} src={image}></Image>
        </TouchableOpacity>
    </View>

    <View style={styles.vdc}>
        <Text style={styles.vd}>Valid till: {vdate}</Text>
    </View>

    {dBtn && 
    (<View style={styles.Bottomcontainer}>
    <View style={styles.postDetails}>
      <Text>Posted Date: {pstDate}</Text>
      <Text>Posted for: {stud=="true"?(staff=="false"?"Student":"Both"):"Faculty"}</Text>
      <Text>Department: {dept}</Text>
    </View>
    <View style={styles.dbtnContainer}>
      <TouchableOpacity 
                onPress={ ()=>{
                  Alert.alert(
                            
                    'Delete post',
                    'Are you sure?',
                    [
                        {
                            text: 'Delete', // Button text
                            onPress:()=>{handleDelete(id)}
                        },
                        {
                          text: 'Cancel',
                          
                        }
                    ],
                    {
                        cancelable: true,
                    },
                    )
                  }
                  
                  }
                style={styles.dButton}
            >
                <Text style={styles.delText}>Delete</Text>
            </TouchableOpacity>
    </View>
    <View>
      <Text style={styles.rd}>Read By: </Text>
      {readlist()}
      </View>
    <View>
      {empty()}
    </View>
    </View>
    
    )}



    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageModal
        isVisible={isModalVisible}
        imageUri={imageUri}
        onClose={closeModal}
      />
    </View>
    

    </View>
    </View>
  </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
  )

  }
export default NoticeScreen


const styles = StyleSheet.create({
    container:{
      flex:1,
    //   justifyContent: 'center',
      alignItems: 'center',
    },

    topBar:{
        backgroundColor:"#0782F9",
        height:150,
        width:'100%',
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        marginBottom:30,
        alignItems:'center',
            
    },
    topText:{
        marginTop:50,
        fontSize:50,
        color:'white',
        
    },

    descContainer:{
        alignItems:"center",
        width:"90%",
        // backgroundColor:"blue",
        borderBlockColor:"gray",
        borderRadius:10,
        borderWidth:2,
        borderColor:"black"
    },

    desc:{
        margin:10,
    },

    img:{
        height:300,
        width:300,
        marginBottom:20,
        borderRadius:10
    },
    vdc:{
        marginTop:10,
        alignItems:"flex-end",
        // backgroundColor:"blue",
        width:"80%",

    },

    dbtnContainer:{

      alignItems:"center",
      margin:10,
  },
  dButton:{
      alignItems:'center',
      borderRadius:5,
      width:100,
      marginTop:5,
      backgroundColor:"red",
      padding:7
  },
  delText:{
      color:"white"
  },
  postDetails:{
    alignItems:'flex-end'
  },
  Bottomcontainer:{

    width:'80%'
  },

  rd:{
    fontSize:20,
    fontWeight:"800"
  }
    
   

})