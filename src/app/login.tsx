import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (email.trim() === 'marcelo@bigbank.com' && senha === '123456') {
      router.replace('/(app)');
    } else {
      Alert.alert('Ops!', 'E-mail ou senha incorretos.\n\nDica: use marcelo@bigbank.com e 123456');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <View style={styles.logoCircle}><Text style={{ fontSize: 30 }}>🏦</Text></View>
            <Text style={styles.title}>BigBank</Text>
            <Text style={styles.subtitle}>Que bom ter você aqui. Vamos cuidar do seu din din hoje?</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>E-mail ou CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="exemplo@bigbank.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Sua senha segura</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />
              <Text style={{ fontSize: 16 }}>👁️</Text>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Entrar →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OU ACESSE COM BIOMETRIA / REDES</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={{ fontSize: 24 }}>☝️</Text>
              <Text style={styles.socialText}>Biometria</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={{ fontSize: 24, color: '#DB4437', fontWeight: 'bold' }}>G</Text>
              <Text style={styles.socialText}>Conta Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Ainda não tem conta? </Text>
            <Text style={styles.footerLink}>Crie grátis em 1 minuto</Text>
          </View>

          <Text style={styles.securityText}>Seus dados são criptografados com padrões bancários.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F9F7' },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  logoCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#D8F3DC', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1B4332', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#555', textAlign: 'center', lineHeight: 22 },
  formContainer: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#1B4332', marginBottom: 8 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 20 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, paddingHorizontal: 16, marginBottom: 12 },
  passwordInput: { flex: 1, paddingVertical: 16, fontSize: 16 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotText: { fontSize: 13, color: '#2D6A4F', fontWeight: 'bold' },
  loginButton: { backgroundColor: '#1B4332', paddingVertical: 18, borderRadius: 50, alignItems: 'center' },
  loginButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  divider: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  dividerText: { marginHorizontal: 12, fontSize: 11, color: '#888', fontWeight: 'bold' },
  socialContainer: { flexDirection: 'row', gap: 12, marginBottom: 40 },
  socialButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E0E0E0', paddingVertical: 16, borderRadius: 12 },
  socialText: { fontSize: 14, fontWeight: 'bold', color: '#555' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  footerText: { fontSize: 14, color: '#555' },
  footerLink: { fontSize: 14, color: '#2D6A4F', fontWeight: 'bold' },
  securityText: { fontSize: 12, color: '#999', textAlign: 'center' }
});