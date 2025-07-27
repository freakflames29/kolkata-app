import { NativeModules } from 'react-native';

const { LocationEnabler } = NativeModules;

interface LocationEnablerInterface {
  promptForEnableLocation(): Promise<string>;
}

export default LocationEnabler as LocationEnablerInterface;
