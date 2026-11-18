// @ts-nocheck
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFinanceiro } from '../ContextoFinanceiro';

export default function Financas() {
  const router = useRouter();
  const { historico, adicionarTransacao } = useFinanceiro();
  
  const ganhos = historico.filter((item) => item.tipo === 'ganho');

  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novaRendaNome, setNovaRendaNome] = useState('');
  const [novaRendaValor, setNovaRendaValor] = useState('');

  const totalEntradas = ganhos.reduce((acc, item) => acc + item.valor, 0);
  
  const entradasFiltradas = ganhos.filter((item) => {
    if (filtroAtivo === 'todos') return true;
    return item.categoria === filtroAtivo;
  });

  const handleAdicionarRenda = () => {
    const valor = parseFloat(novaRendaValor.replace(',', '.'));
    if (!isNaN(valor) && novaRendaNome.trim() !== '') {
      const novaRenda = {
        id: Date.now(),
        nome: novaRendaNome,
        valor: valor,
        tipo: 'ganho',
        categoria: 'extra',
        data: 'Agora mesmo • Renda Extra',
        icone: '✨'
      };
      
      adicionarTransacao(novaRenda, valor, true, 'extra');
      
      setNovaRendaNome('');
      setNovaRendaValor('');
      setModalVisivel(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 24, color: '#1B4332', fontWeight: 'bold' }}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Fluxo Positivo</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.greetingSubtitle}>Celebrar cada real que entra fortalece seu caminho com calma e propósito.</Text>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>TOTAL PREVISTO ESTE MÊS</Text>
          <Text style={styles.totalValor}>R$ {totalEntradas.toFixed(2).replace('.', ',')}</Text>
          
          <View style={styles.badgeCrescimento}>
            <Text style={styles.badgeText}>📈 +12% vs. mês anterior</Text>
          </View>
          
          <Text style={styles.totalSub}>{ganhos.length} fontes ativas sincronizadas com sua tranquilidade</Text>

          <View style={styles.porcentagensContainer}>
            <View style={styles.porcentagemItem}>
              <View style={[styles.bolinha, { backgroundColor: '#1B4332' }]} />
              <Text style={styles.porcentagemTexto}>Fixos (85%)</Text>
            </View>
            <View style={styles.porcentagemItem}>
              <View style={[styles.bolinha, { backgroundColor: '#52B788' }]} />
              <Text style={styles.porcentagemTexto}>Freelas (12%)</Text>
            </View>
            <View style={styles.porcentagemItem}>
              <View style={[styles.bolinha, { backgroundColor: '#95D5B2' }]} />
              <Text style={styles.porcentagemTexto}>Passivos (3%)</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisivel(true)}>
          <Text style={styles.addButtonText}>+ Adicionar Novo Ganho ou Renda Extra</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtrosScroll} contentContainerStyle={styles.filtrosContainer}>
          <TouchableOpacity style={[styles.filtroBotao, filtroAtivo === 'todos' && styles.filtroBotaoAtivo]} onPress={() => setFiltroAtivo('todos')}>
            <Text style={[styles.filtroTexto, filtroAtivo === 'todos' && styles.filtroTextoAtivo]}>Todos ({ganhos.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filtroBotao, filtroAtivo === 'fixo' && styles.filtroBotaoAtivo]} onPress={() => setFiltroAtivo('fixo')}>
            <Text style={[styles.filtroTexto, filtroAtivo === 'fixo' && styles.filtroTextoAtivo]}>Ganhos Fixos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filtroBotao, filtroAtivo === 'extra' && styles.filtroBotaoAtivo]} onPress={() => setFiltroAtivo('extra')}>
            <Text style={[styles.filtroTexto, filtroAtivo === 'extra' && styles.filtroTextoAtivo]}>Renda Extra</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.secaoTitulo}>SUAS FONTES DE ENTRADA</Text>
        
        {entradasFiltradas.map((item) => (
          <View key={item.id} style={styles.movimentacaoItem}>
            <View style={styles.movimentacaoIcone}>
              <Text style={{ fontSize: 20 }}>{item.icone}</Text>
            </View>
            <View style={styles.movimentacaoInfo}>
              <Text style={styles.movimentacaoNome}>{item.nome}</Text>
              <View style={styles.linhaStatus}>
                <Text style={styles.movimentacaoTag}>{item.categoria === 'fixo' ? 'Fixo Mensal' : 'Renda Extra'}</Text>
                <Text style={styles.movimentacaoStatus}> • Recebido</Text>
              </View>
            </View>
            <Text style={styles.movimentacaoValorPos}>+ R$ {item.valor.toFixed(2).replace('.', ',')}</Text>
          </View>
        ))}

        <View style={styles.dicaCard}>
          <View style={styles.dicaIcone}>
            <Text style={{ fontSize: 20 }}>💡</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.dicaTitle}>Dica BigBank</Text>
            <Text style={styles.dicaText}>Ter mais de uma fonte de renda, mesmo pequena, alivia imprevistos do dia a dia e renova sua sensação de liberdade.</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal visible={modalVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Novo Ganho</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Nome da fonte (ex: Freelance)"
              value={novaRendaNome}
              onChangeText={setNovaRendaNome}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Valor (ex: 500)"
              keyboardType="numeric"
              value={novaRendaValor}
              onChangeText={setNovaRendaValor}
            />

            <View style={styles.modalBotoes}>
              <TouchableOpacity style={styles.modalBotaoCancelar} onPress={() => setModalVisivel(false)}>
                <Text style={{ fontWeight: 'bold', color: '#555' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBotaoSalvar} onPress={handleAdicionarRenda}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Adicionar</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1B4332' },
  greetingSubtitle: { fontSize: 16, color: '#555', lineHeight: 22, marginBottom: 24 },
  totalCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginBottom: 20, borderWidth: 1, borderColor: '#F0F0F0' },
  totalLabel: { fontSize: 12, color: '#555', fontWeight: 'bold', letterSpacing: 1, marginBottom: 8 },
  totalValor: { fontSize: 36, fontWeight: 'bold', color: '#1B4332', marginBottom: 12 },
  badgeCrescimento: { backgroundColor: '#D8F3DC', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 12 },
  badgeText: { color: '#2D6A4F', fontSize: 12, fontWeight: 'bold' },
  totalSub: { fontSize: 12, color: '#888', marginBottom: 20 },
  porcentagensContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 16 },
  porcentagemItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  bolinha: { width: 8, height: 8, borderRadius: 4 },
  porcentagemTexto: { fontSize: 12, color: '#555' },
  addButton: { backgroundColor: '#1B4332', paddingVertical: 16, borderRadius: 50, alignItems: 'center', marginBottom: 24 },
  addButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  filtrosScroll: { marginBottom: 24 },
  filtrosContainer: { gap: 10 },
  filtroBotao: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#F0F0F0' },
  filtroBotaoAtivo: { backgroundColor: '#D8F3DC', borderWidth: 1, borderColor: '#2D6A4F' },
  filtroTexto: { fontSize: 14, color: '#555', fontWeight: '500' },
  filtroTextoAtivo: { color: '#1B4332', fontWeight: 'bold' },
  secaoTitulo: { fontSize: 12, fontWeight: 'bold', color: '#555', letterSpacing: 1, marginBottom: 16 },
  movimentacaoItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 10, borderWidth: 1, borderColor: '#F0F0F0' },
  movimentacaoIcone: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#D8F3DC', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  movimentacaoInfo: { flex: 1 },
  movimentacaoNome: { fontSize: 16, fontWeight: 'bold', color: '#1B4332' },
  linhaStatus: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  movimentacaoTag: { fontSize: 12, color: '#2D6A4F', fontWeight: 'bold' },
  movimentacaoStatus: { fontSize: 12, color: '#888' },
  movimentacaoValorPos: { fontSize: 16, fontWeight: 'bold', color: '#2D6A4F' },
  dicaCard: { flexDirection: 'row', backgroundColor: '#F4F6F4', borderRadius: 20, padding: 16, alignItems: 'flex-start', gap: 12, marginTop: 10 },
  dicaIcone: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#D8F3DC', justifyContent: 'center', alignItems: 'center' },
  dicaTitle: { fontSize: 14, fontWeight: 'bold', color: '#2D6A4F', marginBottom: 4 },
  dicaText: { fontSize: 13, color: '#555', lineHeight: 18 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '85%', backgroundColor: '#FFF', borderRadius: 20, padding: 24 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1B4332', marginBottom: 16 },
  modalInput: { borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 15 },
  modalBotoes: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 10 },
  modalBotaoCancelar: { flex: 1, padding: 15, borderRadius: 10, backgroundColor: '#F0F0F0', alignItems: 'center' },
  modalBotaoSalvar: { flex: 1, padding: 15, borderRadius: 10, backgroundColor: '#1B4332', alignItems: 'center' },
});