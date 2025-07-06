import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface ResponsiveDimensions {
  wp: (percentage: number) => number;
  hp: (percentage: number) => number;
  widthPercentageToDP: (percentage: number) => number;
  heightPercentageToDP: (percentage: number) => number;
  screenWidth: number;
  screenHeight: number;
}

const useResponsiveDimensions = (): ResponsiveDimensions => {
  const [screenData, setScreenData] = useState<ScaledSize>(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }: { window: ScaledSize }) => {
      setScreenData(window);
    });

    return () => {
      if (subscription && subscription.remove) {
        subscription.remove();
      }
    };
  }, []);

  const { width, height } = screenData;

  // Width percentage function
  const wp = (percentage: number): number => {
    return (width * percentage) / 100;
  };

  // Height percentage function
  const hp = (percentage: number): number => {
    return (height * percentage) / 100;
  };

  // Additional utility functions
  const widthPercentageToDP = wp;
  const heightPercentageToDP = hp;

  return {
    wp,
    hp,
    widthPercentageToDP,
    heightPercentageToDP,
    screenWidth: width,
    screenHeight: height,
  };
};

export default useResponsiveDimensions;