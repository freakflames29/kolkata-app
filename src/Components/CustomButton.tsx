import { View, Text, TouchableOpacity, StyleSheet, Image,ImageRequireSource } from 'react-native';
import React from 'react';
import imagePath from '../utils/imagePath';
import useResponsiveDimensions from '../hooks/useResponsiveDimensions';
import FontsVariant from '../utils/FontsVariant';


interface CustomButtonProps {
  backgroundColor: string;
  textColor?: string;
  borderRadius?: number;
  image?: ImageRequireSource,
  text:string,
  onPress?:()=>void,
  fontsFamily?:string
}

const CustomButton : React.FC<CustomButtonProps> = (
    {
        backgroundColor="white",
        borderRadius = 100,
        image,
        text,
        onPress,
        textColor,
        fontsFamily
    }
) => {
  const { wp, hp } = useResponsiveDimensions();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: backgroundColor,
      width: '100%',
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: borderRadius,
      flexDirection: 'row',
      gap: 10,
    },
    textStyle:{
        color: textColor || "white",
        fontFamily: fontsFamily  || FontsVariant.LibreCaslonTextBold
    }
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
     {image && <Image
        source={image}
        style={{
          width: wp(6),
          height: wp(6),
        }}
        resizeMode="contain"
      />}

      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
