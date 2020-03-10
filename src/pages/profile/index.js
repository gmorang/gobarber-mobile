import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/background';
import { Container, Form, FormInput, Separator, SubmitButton, Title, LogoutButton } from './styles';

import { updateProfileRequest } from '../../store/modules/auth/actions';
import { signOut } from '../../store/modules/auth/actions';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const [name, setName] = React.useState(profile.name);
  const [email, setEmail] = React.useState(profile.email);
  const [password, setPassword] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const oldPasswordRef = React.useRef();
  const confirmPasswordRef = React.useRef();

  React.useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile])

  function handleSubmit() {
    dispatch(updateProfileRequest({ name, email, oldPassword, password, confirmPassword }));
  }

  function handleLogout() {
    dispatch(signOut())
  }

  return (
    <Background>
      <Container>
        <Title>Meu Perfil</Title>

        <Form>
          <FormInput
            icon="person-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}

          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua nova senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirmação de senha"
            returnKeyType="send"
            ref={confirmPasswordRef}
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton onPress={handleSubmit}>Atualizar Perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do Gobarber</LogoutButton>
        </Form>
      </Container>
    </Background>
  )
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => <Icon name="person" size={20} color={tintColor} />
};

export default Profile;
