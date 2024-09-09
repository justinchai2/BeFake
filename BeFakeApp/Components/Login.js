import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Switch } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation , setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    if (!username || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      setLoading(false);
      return;
    }
    console.log(username, password)
    try {
      const response = await axios.post('http://10.0.2.2:8000/api/login/', {
        username,
        password,
      });

      if (response.status === 200) {
        Alert.alert('Login Successful', `Welcome, ${response.data.username}`);
        setIsLoggedIn(true);  
        navigation.navigate('Home');  
      }
    } catch (error) {
        console.log("dfadfgwrgr")
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((previousState) => !previousState);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Login</Text>

      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Username"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={username}
        onChangeText={(text) => setUsername(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        autoCapitalize="none"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />

      {/* Dark Mode Toggle */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, isDarkMode ? styles.darkText : styles.lightText]}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      <Text style={[styles.signupText, isDarkMode ? styles.darkText : styles.lightText]}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1c1c1e',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  lightInput: {
    borderColor: '#ddd',
    backgroundColor: '#fff',
    color: '#000',
  },
  darkInput: {
    borderColor: '#555',
    backgroundColor: '#333',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
  },
  signupLink: {
    color: 'blue',
  },
});

export default LoginScreen;
