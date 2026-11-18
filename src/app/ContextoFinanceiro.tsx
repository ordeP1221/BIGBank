// @ts-nocheck
import { createContext, ReactNode, useContext, useState } from 'react';

const ContextoFinanceiro = createContext();

export function ProvedorFinanceiro({ children }: { children: ReactNode }) {
  const [entradas, setEntradas] = useState(4850);
  const [despesasFixas, setDespesasFixas] = useState(2300);
  const [despesasVariaveis, setDespesasVariaveis] = useState(680);
  const [investimentos, setInvestimentos] = useState(450);
  

  const [nomeUsuario, setNomeUsuario] = useState('Marcelo');
  const [fotoUsuario, setFotoUsuario] = useState('🐱');
  
  const [historico, setHistorico] = useState([
    { id: 1, nome: 'Mercado Pão de Mel', data: 'Hoje • Alimentação diária', valor: 142.50, tipo: 'despesa', categoria: 'variavel', icone: '🛒' },
    { id: 2, nome: 'Salário Mensal', data: 'Ontem • Empresa Tech S.A', valor: 4200.00, tipo: 'ganho', categoria: 'fixo', icone: '💵' },
    { id: 3, nome: 'Internet Fibra Óptica', data: '03 de Outubro • Conta fixa', valor: 119.90, tipo: 'despesa', categoria: 'fixo', icone: '📶' },
    { id: 4, nome: 'Reserva de Emergência', data: '02 de Outubro • Investimento', valor: 450.00, tipo: 'investimento', categoria: 'investimento', icone: '📈' },
  ]);

  const adicionarTransacao = (nova, valor, isGanho, categoria) => {
    if (isGanho) {
      setEntradas((prev) => prev + valor);
    } else if (categoria === 'investimento') {
      setInvestimentos((prev) => prev + valor);
    } else {
      if (categoria === 'fixo') setDespesasFixas((prev) => prev + valor);
      else if (categoria === 'variavel') setDespesasVariaveis((prev) => prev + valor);
    }
    setHistorico((prev) => [nova, ...prev]);
  };

  // NOVA FUNÇÃO PARA ATUALIZAR O PERFIL
  const atualizarPerfil = (novoNome, novaFoto) => {
    setNomeUsuario(novoNome);
    setFotoUsuario(novaFoto);
  };

  return (
    <ContextoFinanceiro.Provider value={{ 
      entradas, despesasFixas, despesasVariaveis, investimentos, historico, adicionarTransacao,
      nomeUsuario, fotoUsuario, atualizarPerfil // <-- Exportando os dados do perfil
    }}>
      {children}
    </ContextoFinanceiro.Provider>
  );
}

export function useFinanceiro() {
  const context = useContext(ContextoFinanceiro);
  if (!context) throw new Error('useFinanceiro deve ser usado dentro do ProvedorFinanceiro');
  return context;
}