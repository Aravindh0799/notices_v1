import { StyleSheet, Text,Modal, View, Image,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import instance from '../components/axios';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageModal from '../components/imageModal';


const NoticeScreen = ({navigation,route}) => {

    const title = route.params.title
    const desc = route.params.desc
    const image = route.params.image
    const vdate = route.params.vdate
    const imageUri = image

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        // setSelectedImageIndex(index);
        setIsModalVisible(true);
      };
    
      const closeModal = () => {
        setIsModalVisible(false);
      };


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
        <Text style={styles.vd}>Validity till: {vdate}</Text>
    </View>

    
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
        width:390,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        marginBottom:30,
        alignItems:'center',
            
    },
    topText:{
        marginTop:50,
        fontSize:50,
        color:'white'
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
        marginBottom:10,
        borderRadius:10
    },
    vdc:{
        marginTop:10,
        alignItems:"flex-end",
        // backgroundColor:"blue",
        width:"80%",

    }


    
   

})