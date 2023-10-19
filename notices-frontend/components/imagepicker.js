import React, { useEffect, useState } from 'react';
import { View, Button, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';


const ImagePickerComponent = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  useFocusEffect(React.useCallback(()=>{(
    setSelectedImage(null)
  )
  },[])
  )

  console.log(onImageSelect)


  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        console.error('Permission to access media library denied');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        console.log(result.assets[0].uri)
        setSelectedImage(result.assets[0].uri);
        onImageSelect(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking an image:', error);
    }
  };

  return (
    <View>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Pick an image from your library" onPress={pickImage} />
    </View>
  );
};

export default ImagePickerComponent;

