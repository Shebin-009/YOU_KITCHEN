import * as SecureStore from "expo-secure-store";

export const saveToken = async (token: string) => {
  try{
  await SecureStore.setItemAsync("authToken", token);
  }catch(error){
    console.error("Secure Storage token saving" , error)
    throw new Error("Failed to save token")
  }
};

export const getToken = async () => {
  return await SecureStore.getItemAsync("authToken");
};

export const removeToken = async () => {
  await SecureStore.deleteItemAsync("authToken");
};
