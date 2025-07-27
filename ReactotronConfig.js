import Reactotron,{networking} from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // You might need to install this if not already
import {reactotronRedux} from "reactotron-redux"

// if (__DEV__) {
Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure() // controls connection & communication settings
  .use(networking())
  .use(reactotronRedux()) // add the reactotron redux plugin
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

// Optional: Patch console.log to send logs to Reactotron
const yeOldeConsoleLog = console.log;
console.log = (...args) => {
  yeOldeConsoleLog(...args);
  Reactotron.log(...args);
};
// }

export default Reactotron;
