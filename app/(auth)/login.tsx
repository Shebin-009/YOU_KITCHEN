import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { loginUser } from '@/src/api/authApi';
import { saveToken } from '@/src/api/utils/tokenStorage';
import { storeUser } from '@/src/api/utils/useStorage';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");   
  const [showPassword, setShowPassword] = useState(false); 
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [apiError,setApiError] = useState("");

  const router = useRouter();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async () => {
  let newErrors: any = {};

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!validateEmail(email)) {
    newErrors.email = "Enter a valid email";
  }

  if (!password.trim()) {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length !== 0) return;

  try {
    setLoading(true);
    setApiError("");

    const response = await loginUser(email, password);

    const token = String(response.data.token);
    const user = response.data.user;

    await saveToken(token);
    await storeUser(user);

    console.log("Token Stored:", token);
    console.log("User Stored:", user);

    router.replace("/(tabs)/dashboard");

  } catch (error: any) {
    setApiError("Invalid credentials. Please check Email or Password");
  } finally {
    setLoading(false);
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
        {apiError ? (
          <Text style={styles.errorText}>{apiError}</Text>
        ): null}

        <TextInput
            placeholder='Email'
            keyboardType='email-address'
            style={[styles.passwordContainer, errors.email && styles.inputError]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({...errors, email: "" });
            }}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}

        <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
          <TextInput
            placeholder='Password'
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            value={password}
            onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: "" });
          }}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#c7cacf"
          />
        </TouchableOpacity>
      </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity
            style={styles.submitbtn}
            onPress={handleSubmit}>
          <Text style={styles.submittxt}>
            {loading ? "Signing in..." : "Submit"}
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
    fontFamily:"inter_700Bold",
    fontWeight:"900",
    marginBottom: 5,
  },

  signtext: {
    color: "#3a3b3c",
    fontSize: 14,
    marginBottom: 10,
  },

 passwordContainer: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#E5E7EB",
  borderRadius: 8,
  paddingHorizontal: 15,
  height: 50,
  marginTop: 18,
},

passwordInput: {
  flex: 1,
},


  inputError:{
    borderColor:"#ff4d4f",
    backgroundColor:"#fff1f0",
    marginTop:1
  },

  eyeIcon: {
  position: "absolute",
  right: 15,
  top: "50%",
  transform: [{ translateY: -10 }],
},

  submitbtn: {
    backgroundColor: "#037EB2",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop:20
  },

  errorText:{
    color:"#ff4d4f",
    fontSize:12,
    marginBottom:10,
  },

  submittxt: {
    color: "white",
    fontSize: 16,
  },
});
