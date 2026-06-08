import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="student-register" />
      <Stack.Screen name="teacher-register" />
      <Stack.Screen name="teacher-list" />
      <Stack.Screen name="teacher-profile" />
      <Stack.Screen name="search" />
      <Stack.Screen name="ai-assistant" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="smart-match" />
    </Stack>
  );
}
