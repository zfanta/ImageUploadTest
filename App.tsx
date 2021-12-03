/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Linking, SafeAreaView, Text} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

const url = 'https://api-dev.jdjeon.com';

async function login() {
  await fetch(`${url}/auth/signIn`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: '1@user.com',
      password: '1',
    }),
  });
}

async function getUploadUrl(): Promise<{
  [name: string]: {url: string; key: string};
}> {
  const response = await fetch(
    `${url}/aws/s3/pre-signed-upload-request?filenames=test.jpg`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  return await response.json();
}

async function getImageBlob() {
  const image = await launchImageLibrary({mediaType: 'photo'});

  const {uri} = image.assets?.[0] ?? {};
  if (uri === undefined) {
    throw new Error('No image selected');
  }

  return await (await fetch(uri)).blob();
}

async function uploadImage() {
  await login();
  const {url: uploadUrl, key} = (await getUploadUrl())['test.jpg'];

  const imageBlob = await getImageBlob();

  await fetch(uploadUrl, {
    method: 'PUT',
    body: imageBlob,
  });

  return key;
}

const App = () => {
  const [key, setKey] = useState<string>('');
  useEffect(() => {
    uploadImage().then(setKey).catch(console.error);
  }, []);

  return (
    <SafeAreaView>
      <Text onPress={() => Linking.openURL(`https://image.jdjeon.com/${key}`)}>
        {`https://image.jdjeon.com/${key}`}
      </Text>
    </SafeAreaView>
  );
};

export default App;
