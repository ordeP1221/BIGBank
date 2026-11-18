import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProvedorFinanceiro } from '../ContextoFinanceiro';

export default function AppTabs() {
  const insets = useSafeAreaInsets();

  return (
    <ProvedorFinanceiro>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1B4332',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#FFF',
            borderTopWidth: 1,
            borderTopColor: '#F0F0F0',
            height: 65 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom + 5 : 10,
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen name="login" options={{ title: 'Login', href: null, tabBarStyle: { display: 'none' } }} />

        <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: () => <Text style={{ fontSize: 20 }}>🌱</Text> }} />
        <Tabs.Screen name="financas" options={{ title: 'Finanças', tabBarIcon: () => <Text style={{ fontSize: 20 }}>🔄</Text> }} />
        <Tabs.Screen name="relatorios" options={{ title: 'Relatórios', tabBarIcon: () => <Text style={{ fontSize: 20 }}>📊</Text> }} />
        <Tabs.Screen name="carteira" options={{ title: 'Carteira', tabBarIcon: () => <Text style={{ fontSize: 20 }}>💼</Text> }} />
        <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text> }} />
      </Tabs>
    </ProvedorFinanceiro>
  );
}