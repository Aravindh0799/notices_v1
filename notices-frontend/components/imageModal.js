import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Image } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageModal = ({ isVisible, imageUri, onClose }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <ImageViewer
          imageUrls={[{ url: imageUri }]}
          enableSwipeDown={true}
          onSwipeDown={onClose}
        />
      </Modal>
    );
  };
  

  export default ImageModal