import { View, Text,StyleSheet, TextInput,TouchableOpacity, Linking, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useState } from "react";
import { useRouter } from 'expo-router';
import { Dropdown } from "react-native-element-dropdown";

export default function signIn () {
      const router = useRouter();
  

const termsAndServices = () =>{
  Linking.openURL("https://www.termsfeed.com/blog/sample-terms-and-conditions-template/")
} 

const privacyAndPolicy = () =>{
  Linking.openURL("https://policies.google.com/privacy?hl=en-US")
}


  const [name,setName] = useState("");
  const[businessName,setBusinessName] = useState("");
  const[email,setEmail] = useState("");
  const [phone, setPhone] = useState("+44");
  const[source,setSource] = useState("");
  const[errors,setErrors] = useState<any>({});

  const data = [ 
    {label:"Instagram", value:"instagram"},
    {label:"Facebook", value:"facebook"},
    {label:"Google", value:"google"},
    {label:"Friend", value:"friend"}
  ];

  const validateEmail = (email:string) =>{ return /\S+@\S+\.\S+/.test(email); };

  const handleSubmit = () => {
  let newErrors: any = {};

  if (!name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!businessName.trim()) {
    newErrors.businessName = "Business name is required";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!validateEmail(email)) {
    newErrors.email = "Enter a valid email";
  }

  if (phone.length <= 3) {
    newErrors.phone = "Phone number is required";
  } else if (!/^\+44\d{9,10}$/.test(phone)) {
    newErrors.phone = "Enter a valid UK phone number";
}

  if (!source) {
    newErrors.source = "Please select an option";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    router.push("/verify");
  }
};


  return (

<>
<Stack.Screen options={{headerShown:false}}/>
<ScrollView>
    <View style={styles.container}>
      <Text style={styles.text1}>
        Set up your account to<Text style={styles.text2}> get started</Text>
      </Text>
      <TextInput placeholder='Name' 
                 style={[styles.name,
                  errors.name && styles.inputError]}
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    setErrors({...errors, name:""});
                  }}
      />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      <TextInput placeholder='Bussiness Name' 
                 style={[styles.name, errors.businessName && styles.inputError]}
                 value={businessName}
                 onChangeText={(text) => {
                  setBusinessName(text);
                  setErrors({...errors, businessName:""});
                 }}
                 />
            {errors.businessName && 
            <Text style = {styles.errorText}>{errors.businessName}</Text>}       
      <TextInput placeholder='Email' keyboardType='email-address' 
                 style={[styles.name,
                 errors.email && styles.inputError]}
                 value={email}
                 onChangeText={(text) => {
                  setEmail(text);
                  setErrors({...errors,email:""});
                 }}
                 />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
                  )}
      <TextInput
                 placeholder="Phone Number"
                 keyboardType="phone-pad"
                 style={[styles.name, errors.phone && styles.inputError]}
                 value={phone}
                 onChangeText={(text) => {
                   if (!text.startsWith("+44")) {
                       text = "+44";
                     }
                       setPhone(text);
                       setErrors({...errors,phone: "" });
                       }}
       />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

      <Dropdown
               style={[styles.dropdown, errors.source && styles.inputError]}
               data={data}
               labelField="label"
               valueField="value"
               placeholder="How did you hear about us ?"
               value={source}
               onChange={(item) => {
               setSource(item.value);
               setErrors({...errors, source:""})
               }}
               />
               {errors.source && (
                <Text style={styles.errorText}>{errors.source}</Text>
        )}
      <TouchableOpacity style={styles.submitbtn} onPress={handleSubmit}>
              <Text style={styles.submittxt}>
                Submit
              </Text>
      </TouchableOpacity>
      <Text style={styles.lasttext}>
          By clicking submit, you agree to our{" "}
  
      <Text
          style={styles.termstext}
          onPress={termsAndServices}>
               Terms of Services
      </Text>
          {" and "}
      <Text
          style={styles.privacytext}
          onPress={privacyAndPolicy}>
              Privacy Policy
      </Text>
    </Text>
 </View>
</ScrollView>
</>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
  },

  text1: {
    fontSize: 30,
    fontWeight:"700",
    color: "#3a3a3b",
    marginBottom: 10,
  },

  text2: {
    color: "#037EB2",
    fontSize: 30,
  },

  name: {
    height: 50,
    width: "100%",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 18,
  },

  dropdown:{
    height:50,
    borderWidth:2,
    borderColor:"#e5e7eb",
    borderRadius:8,
    paddingHorizontal:15,
    marginTop:20,
  },

  submitbtn: {
    backgroundColor: "#037EB2",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  submittxt: {
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
    marginBottom:10,
  },

  lasttext: {
    color: "#828282",
    fontSize: 13,
    marginTop: 30,
    textAlign: "center",
  },

  termstext: {
    color: "#037EB2",
  },

  privacytext: {
    color: "#037EB2",
  },
});
