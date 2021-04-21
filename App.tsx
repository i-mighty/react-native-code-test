import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import React, {useEffect, useRef, useState} from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import mapping from "./mapping.json";
import { useFonts } from "expo-font";
import {firebaseConfig} from "src/configs/firebaseConfig"
import RootNavigator from './src/navigators/RootNavigator';
import * as Notifications from 'expo-notifications';
import * as ErrorRecovery from 'expo-error-recovery';
import ContextProvider from './src/containers/ContextProvider';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
}

const App = () => {
  const [loaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ContextProvider>
      <NavigationContainer>
        <>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider
            {...eva}
            theme={eva.light}
            customMapping={{ ...eva.mapping, ...mapping }}
          >
            <SafeAreaView style={styles.container} >
              <RootNavigator/>
            </SafeAreaView>
          </ApplicationProvider>
        </>
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;

export {
  firebase as firebaseInstance
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 100
  }
})
