import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import imagePath from '../utils/imagePath';
import useResponsiveDimensions from '../hooks/useResponsiveDimensions';
import BlankSpace from '../Components/BlankSpace';
import FontsVariant from '../utils/FontsVariant';
import Colors from '../utils/colors';
import CustomTextInput from '../Components/CustomTextInput';
import CustomButton from '../Components/CustomButton';

const Login = () => {
  const { wp, hp } = useResponsiveDimensions();

  const styles = StyleSheet.create({
    imageBackground: {
      flex: 1,
      alignItems: 'center',
    },
    heading: {
      width: wp(100),
      // backgroundColor:"red",
      // padding:20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      color: 'white',
      fontSize: 20,
      fontFamily: FontsVariant.LibreCaslonTextRegular,
    },
    mainHeadingText: {
      fontFamily: FontsVariant.AbrilFatface,
      fontSize: 50,
      textTransform: 'uppercase',
    },
    topHeading: {
      color: Colors.yellow,
      fontSize: 25,
    },
    inputContainer: {
      width: wp(90),
      gap: 10,
      // backgroundColor:"red",
      // margin:"auto"
    },
  });

  return (
    <ImageBackground
      source={imagePath.loginBack}
      style={styles.imageBackground}
    >
      <BlankSpace height={hp(10)} />
      <View style={styles.heading}>
        <Text style={[styles.textStyle, styles.topHeading]}>EXPLORE</Text>
        <Text style={[styles.textStyle, styles.mainHeadingText]}>Kolkata</Text>
        <Text style={styles.textStyle}>City of Joy</Text>
      </View>
      <BlankSpace height={hp(5)} />
      <View style={styles.inputContainer}>
        <CustomTextInput
          placeholder="Email"
          backgroundColor="rgba(255,255,255,0.5)"
        />
        <CustomTextInput
          placeholder="Password"
          backgroundColor="rgba(255,255,255,0.5)"
        />
        <Text
          style={{
            textAlign: 'right',
            fontSize: 15,
            color: 'white',
            paddingRight: 10,
            fontFamily: FontsVariant.LibreCaslonTextRegular,
          }}
        >
          Forogot Paassword?
        </Text>
      </View>

      <BlankSpace height={hp(2)} />
      <View
        style={{
          width: wp(40),
        }}
      >
        <CustomButton
          onPress={() => {}}
          text="Login"
          backgroundColor="#5D2626"
          textColor="white"
          borderRadius={20}
        />
      </View>

      <BlankSpace height={hp(3)} />

      <View
        style={{
          width: wp(100),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection:"row"
        }}
      >
        <View style={{
          width:"100%",
          height:1.5,
          backgroundColor:'white'
        }} />
        <Text style={{
          fontSize:15,
          color:"white",
          fontFamily: FontsVariant.LibreCaslonTextBold,
          marginHorizontal:10
        }}>Or Login With</Text>
        <View  style={{
          width:"100%",
          height:1.5,
          backgroundColor:'white'
        }} />
      </View>
      <BlankSpace height={hp(3)} />

      <View
        style={{
          width: wp(90),
          gap: 10,
        }}
      >
        <CustomButton
          onPress={() => {}}
          text="Login with Apple"
          backgroundColor="#000"
          textColor="white"
          image={imagePath.apple}
          fontsFamily={FontsVariant.ABeeZeeRegular}

          // borderRadius={20}
        />
        <CustomButton
          onPress={() => {}}
          text="Login with Facebook"
          backgroundColor="#1877F2"
          textColor="white"
          image={imagePath.facebook}
          fontsFamily={FontsVariant.ABeeZeeRegular}

          // borderRadius={20}
        />
        <CustomButton
          onPress={() => {}}
          text="Login with Google"
          backgroundColor="#fff"
          textColor="#000"
          image={imagePath.google}
          fontsFamily={FontsVariant.ABeeZeeRegular}

          // borderRadius={20}
        />
      </View>
      <BlankSpace height={hp(3)} />

      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 15,
            fontFamily: FontsVariant.ABeeZeeRegular,
          },
        ]}
      >
        Don’t have an account?
        <Text
          style={{
            color: Colors.yellow,
          }}
        >
          {' '}
          Register
        </Text>
      </Text>
    </ImageBackground>
  );
};

export default Login;
