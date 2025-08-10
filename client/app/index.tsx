// app/index.tsx
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Button, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const { 
  BACKEND_URL, 
  IOS_CLIENT_ID, 
  ANDROID_CLIENT_ID, 
  WEB_CLIENT_ID 
} = Constants.expoConfig?.extra || {};

export default function HomeScreen() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    scopes: ["openid", "profile", "email"],
    responseType: "id_token",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.authentication?.idToken ?? response.params?.id_token;
  
      console.log("Full auth response:", response.authentication);
  
      if (!idToken) {
        console.error("No ID token found in response");
        return;
      }
  
      fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Backend JWT:", data.token);
          router.push({
            pathname: "/dashboard",
            params: { token: data.token }
          });
        })
        .catch(console.error);
    }
  }, [response, router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => promptAsync()}
      />
    </View>
  );
}
