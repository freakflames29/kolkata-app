

import { NewAppScreen } from '@react-native/new-app-screen';
import { Button, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import LocationEnabler from './src/LocationEnabler';
import { useEffect } from 'react';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const enableLocation = async ()=>{
    try{
      const result = await LocationEnabler.promptForEnableLocation();
      console.log(result);
      

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
  },
});

export default App;
