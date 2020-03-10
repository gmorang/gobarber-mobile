import React from 'react';
import Background from '../../../components/background';

import { Container, Provider, ProvidersList, Avatar, Name } from './styles';

import api from '../../../services/api';

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = React.useState([]);

  React.useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');

      setProviders(response.data);
    }

    loadProviders();
  }, [])

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item }) => (
            <Provider onPress={() => navigation.navigate('SelectDateTime', { provider: item })}>
              <Avatar
                source={{
                  uri: item.avatar ? item.avatar.url
                    : `https://api.adorable.io/avatar/50/${item.name}.png`
                }} />
              <Name>{item.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}
