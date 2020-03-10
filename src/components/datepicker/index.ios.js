import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText, Picker } from './styles';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { DatePickerIOS } from 'react-native';

export default function DatePicker({ date, onChange }) {
  const [opened, setOpened] = React.useState(false);

  const dateFormmated = React.useMemo(() => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }), [date]);
  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormmated}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            minuteInterval={60} l
            ocale="pt"
            mode="date" />
        </Picker>
      )}
    </Container>
  );
}
