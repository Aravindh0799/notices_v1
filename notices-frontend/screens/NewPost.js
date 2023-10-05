import React, { useState } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import ImagePickerComponent from '../components/imagepicker';

import { StyleSheet } from 'react-native';
import instance from '../components/axios';

const NewPost = () => {
  const [imageData, setImageData] = useState(null);
  const [text, setText] = useState('');

  const handleImageSelect = (image) => {

    setImageData(image);
    console.log("from np",image)
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageData.uri ,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      formData.append('text', text);

      const response = await instance.post('/newPost', formData,  {
        // body: formData,
        headers: {
            Accept :'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        Alert.alert('Success', 'Image uploaded successfully');
      } else {
        Alert.alert('Error', 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <View style = {styles.container}>
      <ImagePickerComponent onImageSelect={handleImageSelect} />
      <TextInput
        placeholder="Enter some text"
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default NewPost;

const styles = StyleSheet.create({
    container:{
        marginTop:100
    }
})