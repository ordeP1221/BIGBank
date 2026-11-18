// @ts-nocheck
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFinanceiro } from '../ContextoFinanceiro';

export default function Relatorios() {
  const { entradas, despesasFixas, despesasVariaveis, investimentos } = useFinanceiro();
  const [filtroTempo, setFiltroTempo] = useState('Hoje');

  const porcentagemPoupada = entradas > 0 ? Math.round((investimentos / entradas) * 100) : 0;
  const totalGastos = despesasFixas + despesasVariaveis + investimentos;
  
  const pctFixas = totalGastos > 0 ? (despesasFixas / totalGastos) * 100 : 0;
  const pctVariaveis = totalGastos > 0 ? (despesasVariaveis / totalGastos) * 100 : 0;
  const pctInvestimentos = totalGastos > 0 ? (investimentos / totalGastos) * 100 : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>BIGBANK</Text>
          <Text style={styles.headerTitle}>Relatórios</Text>
        </View>

        <Text style={styles.greetingTitle}>Gráficos & Fluxo de Gastos</Text>
        <Text style={styles.greetingSubtitle}>Compreender para onde sua energia financeira vai é o primeiro passo para ter mais paz.</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtrosScroll} contentContainerStyle={styles.filtrosContainer}>
          {['Hoje', 'Esta Semana', 'Este Mês', 'Trimestre'].map((tempo) => (
            <TouchableOpacity 
              key={tempo} 
              style={[styles.filtroBotao, filtroTempo === tempo && styles.filtroBotaoAtivo]}
              onPress={() => setFiltroTempo(tempo)}
            >
              <Text style={[styles.filtroTexto, filtroTempo === tempo && styles.filtroTextoAtivo]}>{tempo}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.card}>
          {/* CABEÇALHO DO CARD AJUSTADO */}
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Text style={{ fontSize: 20 }}>💼</Text>
              <Text style={styles.cardTitle}>Total Investido no seu Mês</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✓ Dentro da margem</Text>
            </View>
          </View>
          
          <Text style={styles.cardValor}>R$ {investimentos.toFixed(2).replace('.', ',')}</Text>
          <Text style={styles.cardSub}>Média diária comprimento de R$ {(investimentos / 30).toFixed(2).replace('.', ',')} / dia</Text>
          
          <View style={styles.linhaDivisoria} />

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#2D6A4F' }} />
            <Text style={{ fontWeight: 'bold', color: '#1B4332', fontSize: 14 }}>Ritmo equilibrado</Text>
            <Text style={{ color: '#2D6A4F', fontWeight: 'bold' }}>{porcentagemPoupada}% preservado</Text>
          </View>
          <Text style={styles.cardSub}>Você preservou {porcentagemPoupada}% da sua receita prevista até hoje. Suas escolhas estão sustentando sua tranquilidade.</Text>
        </View>

        <View style={styles.graficoCard}>
          <Text style={styles.graficoTitle}>Trajetória Diária</Text>
          <Text style={styles.graficoSub}>Movimento contínuo sem solavancos no fluxo mensal</Text>

          <View style={styles.graficoArea}>
            <View style={styles.fundoGrafico} />

            <View style={styles.linhaGuia}>
              <View style={styles.linhaTracejada} />
              <Text style={styles.linhaGuiaTexto}>guia saldo</Text>
            </View>

            <View style={styles.barrasContainer}>
              <View style={styles.barraWrapper}>
                <View style={[styles.barra, { height: 60, backgroundColor: '#95D5B2' }]} />
                <Text style={styles.barraLabel}>Sem1</Text>
              </View>
              
              <View style={styles.barraWrapper}>
                <View style={[styles.barra, { height: 130, backgroundColor: '#1B4332' }]} />
                <Text style={styles.barraLabel}>Sem2</Text>
              </View>

              <View style={styles.barraWrapper}>
                <View style={[styles.barra, { height: 90, backgroundColor: '#52B788' }]} />
                <Text style={styles.barraLabel}>Sem3</Text>
              </View>

              <View style={styles.barraWrapper}>
                <View style={[styles.barra, { height: 50, backgroundColor: '#95D5B2' }]} />
                <Text style={styles.barraLabel}>Sem4</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.destaqueCard}>
          <View style={styles.destaqueIcone}>
            <Text style={{ fontSize: 20 }}>🛒</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.destaqueTitle}>Dia de maior movimento: Mercado familiar</Text>
          </View>
        </View>

        <View style={styles.legendaContainer}>
          <View style={styles.legendaItem}>
            <View style={[styles.bolinha, { backgroundColor: '#1B4332' }]} />
            <Text style={styles.legendaTexto}>Gastos essenciais</Text>
          </View>
          <View style={styles.legendaItem}>
            <View style={[styles.bolinha, { backgroundColor: '#95D5B2' }]} />
            <Text style={styles.legendaTexto}>Lazer & Conforto</Text>
          </View>
        </View>

        <View style={styles.distribuicaoCard}>
          <Text style={styles.graficoTitle}>Distribuição de Gastos</Text>
          <Text style={styles.graficoSub}>Para onde seu dinheiro está fluindo este mês.</Text>

          <View style={styles.barraDistribuicaoContainer}>
            <View style={[styles.barraDistribuicao, { width: `${pctFixas}%`, backgroundColor: '#1B4332' }]} />
            <View style={[styles.barraDistribuicao, { width: `${pctVariaveis}%`, backgroundColor: '#52B788' }]} />
            <View style={[styles.barraDistribuicao, { width: `${pctInvestimentos}%`, backgroundColor: '#95D5B2' }]} />
          </View>

          <View style={styles.distribuicaoLista}>
            <View style={styles.distribuicaoItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={[styles.bolinha, { backgroundColor: '#1B4332' }]} />
                <Text style={styles.distribuicaoTexto}>Despesas Fixas</Text>
              </View>
              <Text style={styles.distribuicaoValor}>R$ {despesasFixas.toFixed(2).replace('.', ',')}</Text>
            </View>

            <View style={styles.distribuicaoItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={[styles.bolinha, { backgroundColor: '#52B788' }]} />
                <Text style={styles.distribuicaoTexto}>Despesas Variáveis</Text>
              </View>
              <Text style={styles.distribuicaoValor}>R$ {despesasVariaveis.toFixed(2).replace('.', ',')}</Text>
            </View>

            <View style={styles.distribuicaoItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={[styles.bolinha, { backgroundColor: '#95D5B2' }]} />
                <Text style={styles.distribuicaoTexto}>Investimentos</Text>
              </View>
              <Text style={styles.distribuicaoValor}>R$ {investimentos.toFixed(2).replace('.', ',')}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  header: { marginBottom: 20 },
  headerSubtitle: { fontSize: 12, fontWeight: 'bold', color: '#1B4332', letterSpacing: 1 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#1B4332' },
  greetingTitle: { fontSize: 24, fontWeight: 'bold', color: '#1B4332', marginBottom: 8 },
  greetingSubtitle: { fontSize: 15, color: '#555', lineHeight: 22, marginBottom: 24 },
  filtrosScroll: { marginBottom: 24 },
  filtrosContainer: { gap: 10 },
  filtroBotao: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#F0F0F0' },
  filtroBotaoAtivo: { backgroundColor: '#D8F3DC', borderWidth: 1, borderColor: '#2D6A4F' },
  filtroTexto: { fontSize: 14, color: '#555', fontWeight: '500' },
  filtroTextoAtivo: { color: '#1B4332', fontWeight: 'bold' },
  
  card: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: '#F0F0F0' },
  
  // NOVO ESTILO DO CABEÇALHO DO CARD (Um embaixo do outro)
  cardHeader: { marginBottom: 16, alignItems: 'flex-start' },
  
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1B4332' },
  badge: { backgroundColor: '#D8F3DC', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: '#1B4332', fontSize: 11, fontWeight: 'bold' },
  
  cardValor: { fontSize: 32, fontWeight: 'bold', color: '#1B4332', marginBottom: 4 },
  cardSub: { fontSize: 13, color: '#777', lineHeight: 18 },
  linhaDivisoria: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 16 },
  graficoCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginBottom: 20, borderWidth: 1, borderColor: '#F0F0F0' },
  graficoTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B4332', marginBottom: 4 },
  graficoSub: { fontSize: 13, color: '#777', marginBottom: 24 },
  graficoArea: { height: 200, justifyContent: 'flex-end', position: 'relative' },
  linhaGuia: { position: 'absolute', top: 50, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', zIndex: 1 },
  linhaTracejada: { flex: 1, height: 1, borderWidth: 1, borderColor: '#E0E0E0', borderStyle: 'dashed' },
  linhaGuiaTexto: { fontSize: 10, color: '#AAA', marginLeft: 8 },
  fundoGrafico: { position: 'absolute', bottom: 25, left: 10, right: 10, height: 110, backgroundColor: '#E8F5E9', borderTopLeftRadius: 100, borderTopRightRadius: 100, opacity: 0.6, zIndex: 0 },
  barrasContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: '100%', paddingBottom: 25, zIndex: 2 },
  barraWrapper: { alignItems: 'center', width: 40 },
  barra: { width: 28, borderTopLeftRadius: 14, borderTopRightRadius: 14, position: 'relative' },
  barraLabel: { marginTop: 8, fontSize: 11, color: '#888', fontWeight: '500' },
  destaqueCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F6F4', borderRadius: 16, padding: 16, marginBottom: 30, marginTop: 10 },
  destaqueIcone: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#D8F3DC', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  destaqueTitle: { fontSize: 14, fontWeight: 'bold', color: '#1B4332' },
  legendaContainer: { flexDirection: 'row', gap: 20, paddingHorizontal: 4, paddingBottom: 20, marginBottom: 10 },
  legendaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  bolinha: { width: 8, height: 8, borderRadius: 4 },
  legendaTexto: { fontSize: 12, color: '#666' },
  distribuicaoCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: '#F0F0F0' },
  barraDistribuicaoContainer: { flexDirection: 'row', height: 12, borderRadius: 6, overflow: 'hidden', marginBottom: 24, backgroundColor: '#F0F0F0' },
  barraDistribuicao: { height: '100%' },
  distribuicaoLista: { gap: 16 },
  distribuicaoItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  distribuicaoTexto: { fontSize: 14, color: '#555', fontWeight: '500' },
  distribuicaoValor: { fontSize: 14, fontWeight: 'bold', color: '#1B4332' },
});