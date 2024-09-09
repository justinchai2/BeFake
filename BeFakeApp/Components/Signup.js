import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const SignUpScreen = ({navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Input validation (optional)
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    // Start the loading indicator
    setLoading(true);

    try {
      // Example API endpoint for sign-up (adjust the URL based on your backend)
      const response = await axios.post("http://10.0.2.2:8000/api/signup/", {
        username: username,
        email: email,
        password: password,
      });

      // On success
      if (response.status === 201) {
        Alert.alert('Success', 'Account created successfully! Please log in.');
        navigation.navigate('Login');  // Redirect to Login page
      } else {
        Alert.alert('Error', 'There was an issue creating your account.');
      }
    } catch (error) {
      // On failure
      console.error(error);
      if (error.response && error.response.data) {
        Alert.alert(
          "Error",
          error.response.data.error || "Something went wrong."
        );
      } else {
        Alert.alert("Error", "Network error.");
      }
    } finally {
      setLoading(false); // Stop the loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="username"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />

      <Button
        title={loading ? "Signing Up..." : "Sign Up"}
        onPress={handleSignUp}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default SignUpScreen;
