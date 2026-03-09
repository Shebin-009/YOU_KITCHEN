import { View, Text,StyleSheet, TextInput,TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Stack, useRouter } from 'expo-router'



export default function login(){
  
  const[opt,setOtp] = useState("");
  const [error,setError] = useState("");


  const handleVerify = () =>{
    if(opt.length < 6){
      setError("OTP must be 6 digits")
      return;
    }
    setError("");
    Alert.alert("OTP verification successful")
    }




  return (
  <>
    <Stack.Screen options={{headerShown:false}}/>
      <View style={styles.container}>
        <Text style={styles.enterotp}>
           Enter OTP
        </Text>
        <Text style={styles.text}>
          Verify OTP
        </Text>
        <TextInput
            placeholder='Enter OTP'
            style={[
            styles.otpsection,
            error ? styles.inputError : null
            ]}
            value={opt}
            onChangeText={(text) => {
            const cleaned = text.replace(/[^0-9]/g, "");
            if (cleaned.length <= 6) {
            setOtp(cleaned);
             }
            setError("");
             }}
           keyboardType="number-pad"
           maxLength={6}
       />
          {error ? (
          <Text style={styles.errorText}>{error}</Text>
          ) : null}
    
          <TouchableOpacity 
                style={styles.verifybtn}
                onPress={handleVerify} >
            <Text style={styles.verifytxt}>
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

  enterotp: {
    color: "#3a3a3b",
    fontSize: 30,
    fontWeight:"900",
    marginBottom: 5,
  },

  text: {
    color: "#3a3b3c",
    fontSize: 14,
    marginBottom: 25,
  },

  otpsection: {
    height: 50,
    width: "100%",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  verifybtn: {
    backgroundColor: "#037EB2",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  verifytxt: {
    color: "white",
    fontSize: 16,
  },
  inputError:{
    borderColor:"#ff4d4f",
    backgroundColor:"#fff1f0"
  },
  errorText:{
    color:"#ff4d4f",
    fontSize:12,
    marginTop:15,
    marginBottom:15,
    textAlign:"center"
  }
});

