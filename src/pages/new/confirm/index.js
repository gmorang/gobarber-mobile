import React from 'react';
import Background from '../../../components/background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../../services/api';

function ConfirmRequest({ navigation, route }) {
  const { provider, time } = route.params;

  const dateFormatted = React.useMemo(() => formatRelative(parseISO(time), new Date(), { locale: pt }), [time])

  async function handleAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`
          }} />

        <Name>{provider.name}</Name>

        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAppointment}>Confirmar agendamento</SubmitButton>
      </Container>
    </Background>
  );
}

export default ConfirmRequest;
