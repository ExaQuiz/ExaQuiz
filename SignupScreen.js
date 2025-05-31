import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [state, setState] = useState('');
  const [league, setLeague] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleSignup = async () => {
    if (!phone || !name || !gender || !language || !state || !league) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    try {
      const res = await axios.post('https://your-backend-url/api/signup', {
        phone,
        name,
        gender,
        language,
        state,
        league,
        referralCode: referralCode.trim() === '' ? null : referralCode.trim().toUpperCase(),
      });
      if (res.data.success) {
        Alert.alert('Success', 'Signup successful');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', res.data.message || 'Signup failed');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text>📱 Phone Number</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone"
        keyboardType="phone-pad"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Text>👤 Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Text>⚧️ Gender</Text>
      <View style={{ borderWidth: 1, marginBottom: 10 }}>
        <Picker selectedValue={gender} onValueChange={(val) => setGender(val)}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      <Text>🗣️ Language</Text>
      <View style={{ borderWidth: 1, marginBottom: 10 }}>
        <Picker selectedValue={language} onValueChange={(val) => setLanguage(val)}>
          <Picker.Item label="Select Language" value="" />
          <Picker.Item label="Hindi" value="Hindi" />
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Bengali" value="Bengali" />
          <Picker.Item label="Tamil" value="Tamil" />
          <Picker.Item label="Telugu" value="Telugu" />
        </Picker>
      </View>
      <Text>🌍 State</Text>
      <View style={{ borderWidth: 1, marginBottom: 10 }}>
        <Picker selectedValue={state} onValueChange={(val) => setState(val)}>
          <Picker.Item label="Select State" value="" />
          <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
          <Picker.Item label="Bihar" value="Bihar" />
          <Picker.Item label="Maharashtra" value="Maharashtra" />
          <Picker.Item label="Delhi" value="Delhi" />
          <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
        </Picker>
      </View>
      <Text>🏆 League</Text>
      <View style={{ borderWidth: 1, marginBottom: 10 }}>
        <Picker selectedValue={league} onValueChange={(val) => setLeague(val)}>
          <Picker.Item label="Select League" value="" />
          <Picker.Item label="All India" value="All India" />
          <Picker.Item label="State League" value="State League" />
          <Picker.Item label="City League" value="City League" />
        </Picker>
      </View>
      <Text>🎁 Referral Code (optional)</Text>
      <TextInput
        value={referralCode}
        onChangeText={setReferralCode}
        placeholder="Referral Code"
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
        autoCapitalize="characters"
      />
      <TouchableOpacity onPress={handleSignup} style={{ backgroundColor: 'blue', padding: 15 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupScreen;