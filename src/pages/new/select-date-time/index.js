import React from 'react';

import Background from '../../../components/background';
import DatePicker from '../../../components/datepicker';

import api from '../../../services/api';

import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ route, navigation }) {
  const [date, setDate] = React.useState(new Date());
  const [hours, setHours] = React.useState([])

  const { provider } = route.params;

  React.useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime()
        }
      });

      setHours(response.data);
    }


    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('confirm', {
      provider,
      time
    })
  }

  return (
    <Background>
      <Container>
        <DatePicker date={date} onChange={setDate} />
        <HourList
          data={hours}
          extraData={date}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour onPress={() => handleSelectHour(item.value)} enabled={item.available}>
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}
