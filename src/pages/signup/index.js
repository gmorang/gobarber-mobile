import React from 'react';
import { View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo.png';

import Background from '../../components/background';

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

import { signUpRequest } from '../../store/modules/auth/actions';

function SignUp({ navigation }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password))
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

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
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            returnKeyType="send"
            ref={passwordRef}
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Criar conta
          </SubmitButton>

        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Fazer Login</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  )
}

export default SignUp;
