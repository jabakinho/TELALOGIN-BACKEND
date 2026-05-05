import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import TelaLogin from './telas/TelaLogin';
import {
  pegarTokenDoCelular,
  apagarTokenDoCelular,
} from './servicos/authService';

export default function App() {
  const [usuarioEstaLogado, setUsuarioEstaLogado] = useState(false);
  const [verificandoToken, setVerificandoToken] = useState(true);

  useEffect(() => {
    const verificarAcesso = async () => {
      const token = await pegarTokenDoCelular();

      if (token) {
        setUsuarioEstaLogado(true);
      }

      setVerificandoToken(false);
    };

    verificarAcesso();
  }, []);

  const sairDoSistema = async () => {
    await apagarTokenDoCelular();
    setUsuarioEstaLogado(false);
  };

  if (verificandoToken) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1687ff" />
        <Text>Verificando acesso...</Text>
      </View>
    );
  }

  if (!usuarioEstaLogado) {
    return (
      <TelaLogin
        aoLogarComSucesso={() => setUsuarioEstaLogado(true)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo ao Sistema Interno!</Text>
      <Text style={styles.texto}>Seu token está salvo no celular.</Text>

      <View style={styles.areaBotao}>
        <Button title="Sair do App" onPress={sairDoSistema} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  texto: {
    fontSize: 16,
    textAlign: 'center',
  },

  areaBotao: {
    marginTop: 25,
    width: '80%',
  },
});
