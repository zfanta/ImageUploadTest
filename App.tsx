/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, ScrollView, View, Text} from 'react-native';

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const App = () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [image, setImage] = React.useState<string>('');

  function onPickPress() {
    MultipleImagePicker.openPicker({})
      .then(response => {
        setImages(response.map(asset => asset.path));
      })
      .catch(console.error);
  }

  function onCameraPress() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(response => {
        setImage(response.path);
      })
      .catch(console.error);
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Button title="Pick" onPress={onPickPress} />
          {images.map(image => (
            <View key={image}>
              <Text>{image}</Text>
            </View>
          ))}
          <Button title="Camera" onPress={onCameraPress} />
          <Text>{image}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
