import { Stack } from 'expo-router';
import { ProvedorFinanceiro } from './ContextoFinanceiro';

export default function RootLayout() {
  return (
    <ProvedorFinanceiro>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(app)" />
      </Stack>
    </ProvedorFinanceiro>
  );
}