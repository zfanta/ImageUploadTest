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

const App = () => {
  const [images, setImages] = React.useState<string[]>([]);

  function onPress() {
    MultipleImagePicker.openPicker({})
      .then(response => {
        setImages(response.map(asset => asset.path));
      })
      .catch(console.error);
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Button title="Pick" onPress={onPress} />
          {images.map(image => (
            <View key={image}>
              <Text>{image}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
