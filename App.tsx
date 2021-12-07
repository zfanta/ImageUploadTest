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
import {View} from 'react-native';

import {Settings, LoginButton, AccessToken} from 'react-native-fbsdk-next';

Settings.initializeSDK();

const App = () => {
  return (
    <View>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            // @ts-ignore
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              // @ts-ignore
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </View>
  );
};

export default App;
