import { View, Text,StyleSheet, TextInput,TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'



export default function login(){

const router = useRouter();
const handleSubmit = () =>{
  Alert.alert("OTP Verified")
}

  return (
  <>
    <Stack.Screen options={{headerShown:false}}/>
      <View style={styles.container}>
        <Text style={styles.welcometext}>
           Enter OTP
        </Text>
        <Text style={styles.signtext}>
          Verify OTP
        </Text>
        <TextInput placeholder='Enter OTP'
               style={styles.name}>
        </TextInput>    
          <TouchableOpacity 
                style={styles.submitbtn} 
                onPress={handleSubmit}>
            <Text style={styles.submittxt}>
                Verify
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

  submitbtn: {
    backgroundColor: "#037EB2",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  submittxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

