import { NativeModules } from 'react-native';

const { LocationEnabler } = NativeModules;

interface LocationEnablerInterface {
  promptForEnableLocation(): Promise<string>;
  isLocationEnabled(): Promise<boolean>;
}

export default LocationEnabler as LocationEnablerInterface;
