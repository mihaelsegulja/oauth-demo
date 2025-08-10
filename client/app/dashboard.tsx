import { useLocalSearchParams } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { Text, View } from "react-native";

type TokenPayload = {
  sub: string;
  name: string;
  exp: number;
};

export default function Dashboard() {
  const { token } = useLocalSearchParams();
  
  let decoded: TokenPayload | null = null;
  try {
    if (token) {
      decoded = jwtDecode<TokenPayload>(token as string);
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Dashboard</Text>
      <Text style={{ marginTop: 20 }}>JWT from backend:</Text>
      <Text selectable style={{ marginTop: 10, color: "blue" }}>
        {token ?? "No token provided"}
      </Text>

      {decoded ? (
        <>
          <Text style={{ marginTop: 20 }}>Sub (email): {decoded.sub}</Text>
          <Text>Name: {decoded.name}</Text>
          <Text>Expiry (unix): {decoded.exp}</Text>
          <Text>
            Expiry (date): {new Date(decoded.exp * 1000).toLocaleString()}
          </Text>
        </>
      ) : (
        <Text style={{ marginTop: 20, color: "red" }}>
          Unable to decode token
        </Text>
      )}
    </View>
  );
}
