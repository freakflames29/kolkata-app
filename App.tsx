

import { NewAppScreen } from '@react-native/new-app-screen';
import { Button, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import LocationEnabler from './src/LocationEnabler';
import { useEffect } from 'react';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const enableLocation = async ()=>{
    try{
      const status= await LocationEnabler.isLocationEnabled();
      const result = await LocationEnabler.promptForEnableLocation();
      console.log(result);
      console.log("The status is "+status);
      

    }catch(e){
      console.error(e);
    }
  }

  useEffect(()=>{
    enableLocation();
  },[]);


  return (
    <View style={styles.container}>
      <Text>Location Enabler</Text>
      <Button title="Enable Location" onPress={enableLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
});

export default App;
