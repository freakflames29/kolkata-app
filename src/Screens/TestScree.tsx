import { View, Text, Button } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../redux/slices/counterSlice';
// or import Reactotron from 'reactotron-react'

const TestScree = () => {
  // console.tron = Reactotron;
  const value = useSelector(state => state.counter.value);

  const dispatch = useDispatch();

  const increment = () => {
    dispatch(counterActions.increment());
  };

  //   const url = 'https://jsonplaceholder.typicode.com/users';
  const url = 'http://192.168.1.2:8000/api/auth/book';
  const fetchfun = async () => {
    const res = await axios(url);

    return res.data;
  };

  useEffect(() => {
    const payload = {
      name: 'sourav',
      pet: 'meow',
    };
    AsyncStorage.setItem('meoew', JSON.stringify(payload));

    fetchfun()
      .then(d => console.log('The data', d))
      .catch(e => console.log('The error ', e));
    // console.log('The data ', data);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:"#fff" }}>
      <Text>TestScree = {value}</Text>
      <Button title="Increment" onPress={increment}/>
    </View>
  );
};

export default TestScree;
