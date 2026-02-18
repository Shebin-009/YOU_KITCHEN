import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Stack, useRouter } from 'expo-router'

export default function Login() {

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

    const handleSubmit = () => {
    let newErrors: any = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      router.push("/verify");
    }
  };

  return (
<>
    <Stack.Screen options={{ headerShown: false }} /> 
      <View style={styles.container}>
        <Text style={styles.welcometext}>
          Welcome back..!
        </Text>
        <Text style={styles.signtext}>
          Sign in to continue
        </Text>
        <TextInput
            placeholder='Email'
            keyboardType='email-address'
            style={[styles.name, errors.email && styles.inputError]}
            value={email}
            onChangeText={(text) => {
            setEmail(text);
            setErrors({...errors, email: "" });
          }}
        />
            {errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
            )}
          <TouchableOpacity
            style={styles.submitbtn}
            onPress={handleSubmit}
            >
            <Text style={styles.submittxt}>
                Submit
            </Text>
          </TouchableOpacity>
      </View>
</>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
  },

  welcometext: {
    color: "#3a3a3b",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
  },

  signtext: {
    color: "#3a3b3c",
    fontSize: 14,
    marginBottom: 25,
  },

  name: {
    height: 50,
    width: "100%",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputError:{
    borderColor:"#ff4d4f",
    backgroundColor:"#fff1f0"
  },
  submitbtn: {
    backgroundColor: "#037EB2",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  errorText:{
    color:"#ff4d4f",
    fontSize:12,
    marginBottom:10,
  },
  submittxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
