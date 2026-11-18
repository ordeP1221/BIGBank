// @ts-nocheck
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFinanceiro } from '../ContextoFinanceiro';

export default function Inicio() {
  const router = useRouter();
  const { entradas, despesasFixas, despesasVariaveis, investimentos, historico, adicionarTransacao, nomeUsuario, fotoUsuario } = useFinanceiro();

  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalExtratoVisivel, setModalExtratoVisivel] = useState(false);
  const [nomeDigitado, setNomeDigitado] = useState('');
  const [valorDigitado, setValorDigitado] = useState('');
  const [tipoAcao, setTipoAcao] = useState('ganho'); 

  const saldoLivre = entradas - (despesasFixas + despesasVariaveis);
  const porcentagemPaz = entradas > 0 ? Math.max(0, Math.min(100, Math.round((saldoLivre / entradas) * 100))) : 0;

  const handleSalvar = () => {
    const valor = parseFloat(valorDigitado.replace(',', '.'));
    if (!isNaN(valor)) {
      let nomeMovimentacao = nomeDigitado.trim();
      let iconeMovimentacao = '💸';
      let categoria = '';

      if (tipoAcao === 'ganho') { nomeMovimentacao = nomeMovimentacao || 'Novo Ganho'; iconeMovimentacao = '💵'; categoria = 'extra'; }
      else if (tipoAcao === 'despesaFixa') { nomeMovimentacao = nomeMovimentacao || 'Nova Despesa Fixa'; iconeMovimentacao = '🏠'; categoria = 'fixo'; }
      else if (tipoAcao === 'despesa') { nomeMovimentacao = nomeMovimentacao || 'Despesa (Dia a Dia)'; iconeMovimentacao = '🛒'; categoria = 'variavel'; }
      else if (tipoAcao === 'investimento') { nomeMovimentacao = nomeMovimentacao || 'Novo Investimento'; iconeMovimentacao = '📈'; categoria = 'investimento'; }

      const novaMovimentacao = {
        id: Date.now(),
        nome: nomeMovimentacao,
        data: 'Agora mesmo',
        valor: valor,
        tipo: tipoAcao === 'ganho' ? 'ganho' : tipoAcao === 'investimento' ? 'investimento' : 'despesa',
        categoria: categoria,
        icone: iconeMovimentacao
      };
      
      adicionarTransacao(novaMovimentacao, valor, tipoAcao === 'ganho', categoria);
    }
    setNomeDigitado(''); setValorDigitado(''); setModalVisivel(false);
  };

  const abrirModal = (tipo) => { setTipoAcao(tipo); setNomeDigitado(''); setValorDigitado(''); setModalVisivel(true); };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>BIGBANK</Text>
            <Text style={styles.headerTitle}>Início</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 20 }}>{fotoUsuario}</Text>
          </View>
        </View>

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingTitle}>Olá, {nomeUsuario}!</Text>
          <Text style={styles.greetingSubtitle}>Vamos dar um passo de cada vez hoje. Respire fundo: estamos cuidando do seu caminho.</Text>
        </View>

        <View style={styles.darkCard}>
          <View style={styles.darkCardHeader}>
            <View style={styles.darkCardIcon}><Text style={{color: '#fff'}}>⚠️</Text></View>
            <Text style={styles.darkCardSubtitle}>Atenção!</Text>
          </View>
          <Text style={styles.darkCardTitle}>Ainda não cadastrou todas as entradas deste mês?</Text>
          <Text style={styles.darkCardText}>Cadastrar seus ganhos leva 30 segundos e traz clareza imediata para o seu coração e para o seu bolso.</Text>
          <TouchableOpacity style={styles.greenButton} onPress={() => router.push('/financas')}>
            <Text style={styles.greenButtonText}>Cadastrar Ganhos & Renda Extra agora →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.saldoCard}>
          <View style={styles.saldoHeader}>
            <Text style={styles.saldoTitle}>Saldo Livre Estimado</Text>
            <View style={styles.badgePlanejado}><Text style={styles.badgeText}>● Dentro do planejado</Text></View>
          </View>
          <Text style={styles.saldoValor}>R$ {saldoLivre.toFixed(2).replace('.', ',')}</Text>
          <Text style={styles.saldoSubtitle}>Valor seguro disponível até o fim do mês, livre de pendências.</Text>

          <View style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>↑ Total Entradas</Text>
              <Text style={[styles.gridItemValue, { color: '#2D6A4F' }]}>+ R$ {entradas}</Text>
              <Text style={styles.gridItemSub}>Salário + Extras</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>📍 Despesas Fixas</Text>
              <Text style={[styles.gridItemValue, { color: '#C1121F' }]}>- R$ {despesasFixas}</Text>
              <Text style={styles.gridItemSub}>Contas essenciais</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>🛍️ Despesas Variáveis</Text>
              <Text style={[styles.gridItemValue, { color: '#C1121F' }]}>- R$ {despesasVariaveis}</Text>
              <Text style={styles.gridItemSub}>Dia a dia atual</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>📈 Investimentos</Text>
              <Text style={[styles.gridItemValue, { color: '#2D6A4F' }]}>+ R$ {investimentos}</Text>
              <Text style={styles.gridItemSub}>Fundo de paz</Text>
            </View>
          </View>
        </View>

        <View style={styles.termometroCard}>
          <View style={styles.termometroHeader}>
            <Text style={styles.termometroTitle}>Sua alocação:</Text>
            <Text style={styles.termometroPorcentagem}>{porcentagemPaz}%</Text>
          </View>
          <View style={styles.barraFundo}>
            <View style={[styles.barraPreenchida, { width: `${porcentagemPaz}%` }]} />
          </View>
          <Text style={styles.termometroTexto}>Seu alicerce está protegido: {porcentagemPaz}% do seu orçamento essencial já está quitado ou provisionado com folga este mês.</Text>
        </View>

        <Text style={styles.secaoTitulo}>AÇÕES IMEDIATAS</Text>
        <View style={styles.acoesContainer}>
          <TouchableOpacity style={[styles.acaoBotao, { backgroundColor: '#1B4332' }]} onPress={() => abrirModal('ganho')}>
            <Text style={[styles.acaoTexto, { color: '#FFF' }]}>+ Ganho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.acaoBotao, { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD' }]} onPress={() => abrirModal('despesa')}>
            <Text style={[styles.acaoTexto, { color: '#1B4332' }]}>🛒 Despesa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.acaoBotao, { backgroundColor: '#D8F3DC' }]} onPress={() => abrirModal('investimento')}>
            <Text style={[styles.acaoTexto, { color: '#1B4332' }]}>📈 Investimentos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.movimentacoesCard}>
          <View style={styles.movimentacoesHeader}>
            <Text style={styles.movimentacoesTitle}>🕒 Últimas Movimentações</Text>
            <TouchableOpacity onPress={() => setModalExtratoVisivel(true)}>
              <Text style={styles.verExtrato}>Ver extrato</Text>
            </TouchableOpacity>
          </View>

          {historico.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.movimentacaoItem}>
              <View style={[styles.movimentacaoIcone, (item.tipo === 'ganho' || item.tipo === 'investimento') && { backgroundColor: '#D8F3DC' }]}>
                <Text>{item.icone}</Text>
              </View>
              <View style={styles.movimentacaoInfo}>
                <Text style={styles.movimentacaoNome}>{item.nome}</Text>
                <Text style={styles.movimentacaoData}>{item.data}</Text>
              </View>
              <Text style={(item.tipo === 'ganho' || item.tipo === 'investimento') ? styles.movimentacaoValorPos : styles.movimentacaoValorNeg}>
                {(item.tipo === 'ganho' || item.tipo === 'investimento') ? '+' : '-'} R$ {item.valor.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal visible={modalVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {tipoAcao === 'ganho' ? 'Adicionar Novo Ganho' : tipoAcao === 'despesaFixa' ? 'Adicionar Despesa Fixa' : tipoAcao === 'investimento' ? 'Adicionar Investimento' : 'Adicionar Despesa'}
            </Text>
            <TextInput style={styles.modalInput} placeholder="Nome (ex: Tesouro Direto)" value={nomeDigitado} onChangeText={setNomeDigitado} />
            <TextInput style={styles.modalInput} placeholder="Valor (ex: 500)" keyboardType="numeric" value={valorDigitado} onChangeText={setValorDigitado} />
            
            {tipoAcao !== 'ganho' && tipoAcao !== 'investimento' && (
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20 }}>
                <TouchableOpacity style={[styles.acaoBotao, { flex: 1, paddingHorizontal: 5, backgroundColor: tipoAcao === 'despesa' ? '#1B4332' : '#F0F0F0' }]} onPress={() => setTipoAcao('despesa')}>
                  <Text style={{ fontSize: 12, color: tipoAcao === 'despesa' ? '#FFF' : '#555', fontWeight: 'bold' }}>Dia a Dia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.acaoBotao, { flex: 1, paddingHorizontal: 5, backgroundColor: tipoAcao === 'despesaFixa' ? '#1B4332' : '#F0F0F0' }]} onPress={() => setTipoAcao('despesaFixa')}>
                  <Text style={{ fontSize: 12, color: tipoAcao === 'despesaFixa' ? '#FFF' : '#555', fontWeight: 'bold' }}>Fixa</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.modalBotoes}>
              <TouchableOpacity style={styles.modalBotaoCancelar} onPress={() => setModalVisivel(false)}>
                <Text style={{ fontWeight: 'bold', color: '#555' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBotaoSalvar} onPress={handleSalvar}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={modalExtratoVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { maxHeight: '80%' }]}>
            <Text style={styles.modalTitle}>Extrato Completo</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {historico.map((item) => (
                <View key={item.id} style={styles.movimentacaoItem}>
                  <View style={[styles.movimentacaoIcone, (item.tipo === 'ganho' || item.tipo === 'investimento') && { backgroundColor: '#D8F3DC' }]}>
                    <Text>{item.icone}</Text>
                  </View>
                  <View style={styles.movimentacaoInfo}>
                    <Text style={styles.movimentacaoNome}>{item.nome}</Text>
                    <Text style={styles.movimentacaoData}>{item.data}</Text>
                  </View>
                  <Text style={(item.tipo === 'ganho' || item.tipo === 'investimento') ? styles.movimentacaoValorPos : styles.movimentacaoValorNeg}>
                    {(item.tipo === 'ganho' || item.tipo === 'investimento') ? '+' : '-'} R$ {item.valor.toFixed(2).replace('.', ',')}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={[styles.modalBotaoSalvar, { marginTop: 20, flex: 0, width: '100%', paddingVertical: 15 }]} onPress={() => setModalExtratoVisivel(false)}>
              <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Fechar Extrato</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 24 },
  headerSubtitle: { fontSize: 12, fontWeight: 'bold', color: '#1B4332', letterSpacing: 1 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#1B4332' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#D8F3DC', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#1B4332' },
  greetingContainer: { marginBottom: 24 },
  greetingTitle: { fontSize: 32, fontWeight: 'bold', color: '#1B4332', marginBottom: 8 },
  greetingSubtitle: { fontSize: 16, color: '#555', lineHeight: 22 },
  darkCard: { backgroundColor: '#0F381F', borderRadius: 24, padding: 24, marginBottom: 20 },
  darkCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 10 },
  darkCardIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2D6A4F', justifyContent: 'center', alignItems: 'center' },
  darkCardSubtitle: { color: '#D8F3DC', fontSize: 14, fontWeight: '500' },
  darkCardTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', marginBottom: 12, lineHeight: 30 },
  darkCardText: { color: '#D8F3DC', fontSize: 14, lineHeight: 20, marginBottom: 24 },
  greenButton: { backgroundColor: '#95D5B2', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greenButtonText: { color: '#0F381F', fontWeight: 'bold', fontSize: 16, flex: 1 },
  saldoCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginBottom: 20, borderWidth: 1, borderColor: '#F0F0F0' },
  saldoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  saldoTitle: { fontSize: 16, color: '#555' },
  badgePlanejado: { backgroundColor: '#D8F3DC', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: '#1B4332', fontSize: 12, fontWeight: 'bold' },
  saldoValor: { fontSize: 36, fontWeight: 'bold', color: '#1B4332', marginBottom: 8 },
  saldoSubtitle: { fontSize: 14, color: '#777', marginBottom: 20 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  gridItem: { width: '48%', backgroundColor: '#F8F9FA', padding: 16, borderRadius: 16, marginBottom: 10 },
  gridItemTitle: { fontSize: 12, color: '#555', marginBottom: 4 },
  gridItemValue: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  gridItemSub: { fontSize: 12, color: '#999' },
  termometroCard: { backgroundColor: '#F4F6F4', borderRadius: 24, padding: 24, marginBottom: 24 },
  termometroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  termometroTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B4332' },
  termometroPorcentagem: { fontSize: 18, fontWeight: 'bold', color: '#2D6A4F' },
  barraFundo: { height: 12, backgroundColor: '#D8F3DC', borderRadius: 6, marginBottom: 16 },
  barraPreenchida: { height: 12, backgroundColor: '#1B4332', borderRadius: 6 },
  termometroTexto: { fontSize: 14, color: '#555', lineHeight: 20 },
  secaoTitulo: { fontSize: 12, fontWeight: 'bold', color: '#555', letterSpacing: 1, marginBottom: 12 },
  acoesContainer: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  acaoBotao: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  acaoTexto: { fontSize: 14, fontWeight: 'bold' },
  movimentacoesCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: '#F0F0F0' },
  movimentacoesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  movimentacoesTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B4332' },
  verExtrato: { fontSize: 14, color: '#2D6A4F', fontWeight: 'bold' },
  movimentacaoItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  movimentacaoIcone: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  movimentacaoInfo: { flex: 1 },
  movimentacaoNome: { fontSize: 16, fontWeight: '500', color: '#1B4332' },
  movimentacaoData: { fontSize: 12, color: '#888', marginTop: 4 },
  movimentacaoValorNeg: { fontSize: 16, fontWeight: 'bold', color: '#C1121F' },
  movimentacaoValorPos: { fontSize: 16, fontWeight: 'bold', color: '#2D6A4F' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '85%', backgroundColor: '#FFF', borderRadius: 20, padding: 24 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1B4332', marginBottom: 16 },
  modalInput: { borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 15, fontSize: 18, marginBottom: 15 },
  modalBotoes: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  modalBotaoCancelar: { flex: 1, padding: 15, borderRadius: 10, backgroundColor: '#F0F0F0', alignItems: 'center' },
  modalBotaoSalvar: { flex: 1, padding: 15, borderRadius: 10, backgroundColor: '#1B4332', alignItems: 'center' },
});