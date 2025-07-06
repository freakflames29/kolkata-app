import { View, Text } from 'react-native';
import React from 'react';

interface BlankSpaceProps {
  height?: number;
  width?: number;
}

const BlankSpace: React.FC<BlankSpaceProps> = ({ height, width }) => {
  return (
    <View
      style={{
        height,
        width,
      }}
    />
  );
};

export default BlankSpace;
