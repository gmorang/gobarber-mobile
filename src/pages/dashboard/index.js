import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/background';
import Appointment from '../../components/appointment';

import { Container, Title, List } from './styles';

import api from '../../services/api';


function Dashboard({ navigation }) {
  const [appointments, setAppointments] = React.useState([]);

  async function loadAppointments() {
    const response = await api.get('appointments', { params: { page: 1 } });

    setAppointments(response.data);
  }

  React.useEffect(() => {
    const isFocused = navigation.addListener('focus', () => loadAppointments());

    return isFocused;

  }, [navigation])

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment => appointment.id === id ?
        { ...appointment, canceled_at: response.data.canceled_at } : appointment)
    )
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={time => String(time)}
          renderItem={({ item }) => <Appointment onCancel={() => handleCancel(item.id)} data={item} />}
        />
      </Container>
    </Background>
  )
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (<Icon name="event" size={20} color={tintColor} />)
}

export default Dashboard;
