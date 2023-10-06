import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TextInput, 
    Button, 
    Image, 
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,
    FlatList,
   } from 'react-native';
import CheckBox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import instance from '../components/axios';
import ImagePickerComponent from '../components/imagepicker';

export default function PostNew(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validityDate, setValidityDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [staffChecked, setStaffChecked] = useState(false);
  const [studentChecked, setStudentChecked] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const [imageData, setImageData] = useState(null);

  const handleImageSelect = (image) => {

    setImageData(image);
    console.log("from np",image)
  };

  const [isChecked, setIsChecked] = useState({
    staff: false,
    student: false,
  });

  const [errorTitle, setErrorTitle] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorVdate,setErrorVdate]=useState('')
  const [errorImage, setErrorImage] = useState('');
  const [errorCheckbox, setErrorCheckbox] =  useState('');

  useEffect(() => {
    (async () =>{
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted') ;
    })();
  }, []);


  if(hasGalleryPermission === false){
    return <Text> No access to Internal Storage </Text>
  }

  const toggleDatePicker=()=>{
    setShowDatePicker(!showDatePicker);
  }

  const handleDate=(event, selectedDate)=>{
    setShowDatePicker(Platform.OS=='ios');
    if(selectedDate!==undefined){

      const date = new Date()
      date.setUTCHours(0,0,0,0)
      selectedDate.setUTCHours(0,0,0,0)
      if(selectedDate<date){
        console.log("invalid vdate")
        setErrorVdate("Validity date is already expired")
        setValidityDate(selectedDate)
        console.log("valid vdate",errorVdate)
      }
      else{
      setErrorVdate('')
      console.log("valid vdate",errorVdate)
      setValidityDate(selectedDate);
      }
    }
  };
  const handleStaffCheck = () =>{
    setStaffChecked(staffChecked);
    
  };
  const handleStudentCheck = () =>{
    setStudentChecked(!studentChecked);
    
  };
  
  const handleSubmit = async () => {
    try{
          if(!title){
            setErrorTitle('Title is required');
          }
          else{
            setErrorTitle('');
          }
          if(!description){
            setErrorDescription('Description is required');
          }
          else{
            setErrorDescription('');
          }
          if(!image){
            setErrorImage('Image is not selected');
          }
          else{
            setErrorImage('');
          }
          
          if (!studentChecked && !staffChecked) {
            // Display an error message or take appropriate action if neither checkbox is checked.
            alert('Please select at least one option (Staff or Student).');
            return;
          }
      if(!title || !description || !(staffChecked || studentChecked) || !errorVdate){
        Alert.alert('Validation Error', 'Please fill all the required fields.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('image', {
          uri: imageData.uri ,
          type: 'image/jpeg',
          name: 'image.jpg',
        });

        formData.append('title',title)
        formData.append('description',description)
        formData.append('validityDate',validityDate.toDateString())
        formData.append('staffChecked',staffChecked)
        formData.append('studentChecked',studentChecked)

        const response = await instance.post('/newPost', formData,  {
          // body: formData,
          headers: {
              Accept :'application/json',
            'Content-Type': 'multipart/form-data',
          },

        });
      
    // const response = await instance.post('newPost', { 
    //   title,
    //   description,
    //   validityDate: validityDate.toDateString(),
    //   staffChecked,
    //   studentChecked,
    
    //   image,
    // });

    console.log('resopnse', response.data);
    if( response.data.message === 'success'){
      console.log("Success");
      Alert.alert("Submitted successfully. Kindly wait 5 mins to reflect");
      setTitle('');
      setDescription('');
      setValidityDate(new Date());
      setStaffChecked(false);
      setStudentChecked(false);
      setImageData(null)
      setErrorTitle('');
      setErrorDescription('');
      setErrorImage('');
      setErrorVdate('');
    }
    else{
      console.error('Registration failed. Response:', response.data);
    }
  }
    catch (error){
      if(error.response){
        Alert.alert("Image Size Too Large");
        console.error('Registration failed. Response:', error.response.data);
      }
      else if(error.request){
        Alert.alert("Network Error occured");
        console.error('No response received. Request:', error.request);
      }
      else{
        Alert.alert("Network Error occured");
        console.error('Error in making the request:', error.message);
      }
      
    }
  }
  catch (error) {
    console.error('Error submitting form:', error);
  }
};

  // const pickImageAndConvertToBase64v1 = async () => {
  //   // Request permission to access the device's image library
  //   console.log("entered image ")
  //  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   console.log(status)
  //   if (status !== 'granted') {
  //     console.error('Permission to access image library denied');
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     quality: 1,
  //     base64: true, // Set this option to true to include base64 data
  //   });
  //  console.log(result)  
  //   if (!result.canceled) {
  //     const base64String = result.assets[0].base64; // Base64 representation of the selected image
  //     setBase64Image(base64String);
  //     setImage(base64String)
  //   }
  //   else{
  //     setImage(null)
  //   }
  //   console.log('from the base function',base64Image)
  // };


  return (
    <View style={styles.first}>
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}> New Circular</Text>
        <View style={styles.inputContainer}>
         {/* Title */}
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            value={title}
            placeholder="Enter title"
          />
          {errorTitle ? <Text style={styles.error}>{errorTitle}</Text> : null}
        </View> 
         {/* Description */} 
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="Enter description"
          />
          {errorDescription ? <Text style ={styles.error}> {errorDescription}</Text> : null}
        </View>

          {/* Validity Date */}
          <Text style={styles.label}>Validity Date:</Text>
          <TouchableOpacity onPress={toggleDatePicker}>
          <Text  style={styles.input}>
            {validityDate.toDateString()}
          </Text>
          {errorVdate ? <Text style ={styles.error}> {errorVdate}</Text> : null}
          </TouchableOpacity>
          {
            showDatePicker && (
              <DateTimePicker
                value={validityDate}
                mode="date"
                placeholder="default"
                onChange={handleDate}
                />
            )
          }
          {/*Checkboxes Staff / Student*/}
          <Text style={styles.labelCheck}> Post To :</Text>
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                value={staffChecked}
                onValueChange={setStaffChecked}
                color={staffChecked? '#4630EB' : undefined}
              />
              <Text style={styles.checkboxLabel}>Staff</Text>
              <CheckBox
                style={styles.checkbox}
                value={studentChecked}
                onValueChange={setStudentChecked}
                color={studentChecked? '#4630EB' : undefined}
              />
              <Text>Student</Text>
            </View>
            

              <Text style={styles.label}>Posted Date:</Text>
              <TextInput
                style={styles.input}
                value={new Date().toDateString()}
                editable={false}
              />

            <View style = {styles.container}>
                  <ImagePickerComponent onImageSelect={handleImageSelect} />
                </View>

              <View style={styles.button2}>
              <Button title="Submit" onPress={handleSubmit} />

              </View>
          
    
    </ScrollView>
    </View> 
  );  
};


const styles = StyleSheet.create({

  first:{
    marginTop:50,
    padding:20,
    borderRadius:15,
  },
  container:{
    padding:16,
  },
  title:{
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color:"#000080",
  },
  inputContainer:{
    marginBottom:16,
  },
  label:{
    fontSize: 15,
    marginBottom: 8,
    color:"#000000",
    
  },
  labelCheck:{
    marginTop: 15,
  },
  input:{
    borderWidth: 2,
    borderColor:'#ccc',
    borderRadius:15,
    padding: 8,
    fontSize: 16,
  },
  checkboxContainer:{
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
  checkbox:{
    marginHorizontal: 10,
  },
  checkboxLabel:{
    fontSize: 16,
  },
  image:{
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 4,
    marginBottom: 16,
  },
  uploadImage:{
    marginTop: 20,
    backgroundColor: 'yellow',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
    textAlign: 'center'
  },
  uploadText:{
    color:"white",
    fontSize: 16,
    fontWeight: 'bold',
  },
  button1:{
    marginTop:20,
    marginBottom:10,
    marginVertical:'10',
    borderRadius:5,
    backgroundColor: '#00ff22',
  },  
  button2:{
    marginTop:10,
    marginBottom:10,
    color: "yellow",
  },
  error:{
    color:'red',
    fontSize: 12,
    marginTop: 5,
  },

});
