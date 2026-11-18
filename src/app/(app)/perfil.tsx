// @ts-nocheck
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFinanceiro } from '../ContextoFinanceiro';

export default function Perfil() {
  const router = useRouter();
  const { entradas, despesasFixas, despesasVariaveis, investimentos, nomeUsuario, fotoUsuario, atualizarPerfil } = useFinanceiro();

  const [modalVisivel, setModalVisivel] = useState(false);
  const [novoNome, setNovoNome] = useState(nomeUsuario);
  const [novaFoto, setNovaFoto] = useState(fotoUsuario);

  const saldoLivre = entradas - (despesasFixas + despesasVariaveis);
  const porcentagemPaz = entradas > 0 ? Math.max(0, Math.min(100, Math.round((saldoLivre / entradas) * 100))) : 0;

  const salvarPerfil = () => {
    atualizarPerfil(novoNome, novaFoto);
    setModalVisivel(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>BIGBANK</Text>
          <Text style={styles.headerTitle}>Seu Perfil</Text>
        </View>

        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Text style={{ fontSize: 50 }}>{fotoUsuario}</Text>
          </View>
          <Text style={styles.userName}>{nomeUsuario}</Text>
          <Text style={styles.userEmail}>marcelo@bigbank.com</Text>
          
          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisivel(true)}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.secaoTitulo}>RESUMO DA SUA CONTA</Text>
        <View style={styles.resumoCard}>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Saldo Livre</Text>
            <Text style={[styles.resumoValor, { color: '#2D6A4F' }]}>R$ {saldoLivre.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={styles.divisoria} />
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Total Investido</Text>
            <Text style={[styles.resumoValor, { color: '#1B4332' }]}>R$ {investimentos.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={styles.divisoria} />
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Saúde Financeira</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#52B788' }} />
              <Text style={[styles.resumoValor, { color: '#2D6A4F' }]}>{porcentagemPaz}%</Text>
            </View>
          </View>
        </View>

        <Text style={styles.secaoTitulo}>CONFIGURAÇÕES</Text>
        
        <View style={styles.configCard}>
          <TouchableOpacity style={styles.configItem}>
            <View style={styles.configIcone}><Text style={{ fontSize: 18 }}>🔔</Text></View>
            <Text style={styles.configTexto}>Notificações</Text>
            <Text style={styles.configSeta}>›</Text>
          </TouchableOpacity>
          <View style={styles.divisoria} />
          <TouchableOpacity style={styles.configItem}>
            <View style={styles.configIcone}><Text style={{ fontSize: 18 }}>🔒</Text></View>
            <Text style={styles.configTexto}>Segurança e Privacidade</Text>
            <Text style={styles.configSeta}>›</Text>
          </TouchableOpacity>
          <View style={styles.divisoria} />
          <TouchableOpacity style={styles.configItem}>
            <View style={styles.configIcone}><Text style={{ fontSize: 18 }}>💬</Text></View>
            <Text style={styles.configTexto}>Central de Ajuda</Text>
            <Text style={styles.configSeta}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.sairButton} onPress={() => router.replace('/login')}>
          <Text style={styles.sairButtonText}>Sair da conta com tranquilidade</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>BigBank App v1.0.0</Text>
        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal visible={modalVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            
            <Text style={styles.modalLabel}>Seu Nome:</Text>
            <TextInput 
              style={styles.modalInput} 
              value={novoNome} 
              onChangeText={setNovoNome} 
            />

            <Text style={styles.modalLabel}>Escolha seu Avatar:</Text>
            <View style={styles.avataresContainer}>
              {['👩', '👨', '👩‍🦰', '🧑', '👧', '🐱', '🐶', '🦊', '🐻', '🦁'].map((emoji) => (
                <TouchableOpacity 
                  key={emoji} 
                  style={[styles.avatarOpcao, novaFoto === emoji && styles.avatarSelecionado]}
                  onPress={() => setNovaFoto(emoji)}
                >
                  <Text style={{ fontSize: 30 }}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalBotoes}>
              <TouchableOpacity style={styles.modalBotaoCancelar} onPress={() => setModalVisivel(false)}>
                <Text style={{ fontWeight: 'bold', color: '#555' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBotaoSalvar} onPress={salvarPerfil}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  header: { marginBottom: 24 },
  headerSubtitle: { fontSize: 12, fontWeight: 'bold', color: '#1B4332', letterSpacing: 1 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#1B4332' },
  userCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#F0F0F0' },
  avatarContainer: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#D8F3DC', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 2, borderColor: '#1B4332' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1B4332', marginBottom: 4 },
  userEmail: { fontSize: 14, color: '#777', marginBottom: 20 },
  editButton: { backgroundColor: '#F4F6F4', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 20 },
  editButtonText: { fontSize: 14, fontWeight: 'bold', color: '#1B4332' },
  secaoTitulo: { fontSize: 12, fontWeight: 'bold', color: '#555', letterSpacing: 1, marginBottom: 12 },
  resumoCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: '#F0F0F0' },
  resumoItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  resumoLabel: { fontSize: 15, color: '#555' },
  resumoValor: { fontSize: 16, fontWeight: 'bold' },
  configCard: { backgroundColor: '#FFF', borderRadius: 24, paddingHorizontal: 20, marginBottom: 32, borderWidth: 1, borderColor: '#F0F0F0' },
  configItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  configIcone: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F4F6F4', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  configTexto: { flex: 1, fontSize: 15, color: '#1B4332', fontWeight: '500' },
  configSeta: { fontSize: 20, color: '#CCC' },
  divisoria: { height: 1, backgroundColor: '#F0F0F0' },
  sairButton: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#C1121F', paddingVertical: 16, borderRadius: 50, alignItems: 'center', marginBottom: 24 },
  sairButtonText: { color: '#C1121F', fontSize: 15, fontWeight: 'bold' },
  versionText: { fontSize: 12, color: '#AAA', textAlign: 'center' },

  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '85%', backgroundColor: '#FFF', borderRadius: 20, padding: 24 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1B4332', marginBottom: 16 },
  modalLabel: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 8 },
  modalInput: { borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 20 },
  avataresContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  avatarOpcao: { padding: 10, borderRadius: 12, backgroundColor: '#F0F0F0' },
  avatarSelecionado: { backgroundColor: '#D8F3DC', borderWidth: 2, borderColor: '#1B4332' },
  modalBotoes: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  modalBotaoCancelar: { flex: 1, padding: 15, borderRadius: 10, backgroundColor: '#F0F0F0', alignItems: 'center' },
  modalBotaoSalvar: { flex: 1, padding: 15, borderRadius: 10, backgroundColor: '#1B4332', alignItems: 'center' },
});