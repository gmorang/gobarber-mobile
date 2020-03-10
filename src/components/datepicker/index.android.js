import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import { Container, DateButton, DateText } from './styles';
import { DatePickerAndroid } from 'react-native';

export default function DatePicker({ date, onChange }) {
  const dateFormmated = React.useMemo(() => format(date, "dd 'de' MMMMM 'de' yyyy", { locale: pt }), [date]);

  async function handleOpenPicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      mode: 'spinner',
      date
    });

    if (action === DatePickerAndroid.dateSetAction) {
      const selectDate = new Date(year, month, day);

      onChange(selectDate);
    }
  }

  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormmated}</DateText>
      </DateButton>
    </Container>
  );
}
