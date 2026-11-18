// @ts-nocheck
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFinanceiro } from '../ContextoFinanceiro';

export default function Carteira() {
  const { investimentos, historico } = useFinanceiro();

  const listaInvestimentos = historico.filter(item => item.tipo === 'investimento');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>BIGBANK</Text>
          <Text style={styles.headerTitle}>Carteira</Text>
        </View>

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingTitle}>Seu Patrimônio</Text>
          <Text style={styles.greetingSubtitle}>Aqui está o dinheiro que está trabalhando para você e construindo seu fundo de paz.</Text>
        </View>

        <View style={styles.investimentoCard}>
          <Text style={styles.investimentoLabel}>TOTAL INVESTIDO</Text>
          <Text style={styles.investimentoValor}>R$ {investimentos.toFixed(2).replace('.', ',')}</Text>
          <View style={styles.badgeCrescimento}>
            <Text style={styles.badgeText}>📈 Rendendo com tranquilidade</Text>
          </View>
        </View>

        <Text style={styles.secaoTitulo}>SEUS INVESTIMENTOS</Text>

        {listaInvestimentos.length === 0 ? (
          <Text style={styles.textoVazio}>Você ainda não tem investimentos registrados. Use o botão "Investir" na tela de Início.</Text>
        ) : (
          listaInvestimentos.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemIcone}>
                <Text style={{ fontSize: 24 }}>{item.icone}</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemNome}>{item.nome}</Text>
                <Text style={styles.itemData}>{item.data}</Text>
              </View>
              <Text style={styles.itemValor}>+ R$ {item.valor.toFixed(2).replace('.', ',')}</Text>
            </View>
          ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  header: { marginBottom: 24 },
  headerSubtitle: { fontSize: 12, fontWeight: 'bold', color: '#1B4332', letterSpacing: 1 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#1B4332' },
  greetingContainer: { marginBottom: 24 },
  greetingTitle: { fontSize: 28, fontWeight: 'bold', color: '#1B4332', marginBottom: 8 },
  greetingSubtitle: { fontSize: 16, color: '#555', lineHeight: 22 },
  
  investimentoCard: { 
    backgroundColor: '#1B4332', 
    borderRadius: 24, 
    padding: 24, 
    marginBottom: 24,
    alignItems: 'center'
  },
  investimentoLabel: { fontSize: 12, fontWeight: 'bold', color: '#D8F3DC', letterSpacing: 1, marginBottom: 8 },
  investimentoValor: { fontSize: 40, fontWeight: 'bold', color: '#FFF', marginBottom: 12 },
  badgeCrescimento: { backgroundColor: '#2D6A4F', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: '#D8F3DC', fontSize: 12, fontWeight: 'bold' },

  secaoTitulo: { fontSize: 12, fontWeight: 'bold', color: '#555', letterSpacing: 1, marginBottom: 16 },
  
  itemCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#F0F0F0' 
  },
  itemIcone: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#D8F3DC', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  itemInfo: { flex: 1 },
  itemNome: { fontSize: 16, fontWeight: 'bold', color: '#1B4332' },
  itemData: { fontSize: 12, color: '#888', marginTop: 4 },
  itemValor: { fontSize: 16, fontWeight: 'bold', color: '#2D6A4F' },

  textoVazio: { fontSize: 14, color: '#888', fontStyle: 'italic', textAlign: 'center', marginTop: 20 }
});