import React from 'react';
import { View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo.png';

import Input from '../../components/input';
import Button from '../../components/button';
import Background from '../../components/background';

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

import { signInRequest } from '../../store/modules/auth/actions';

function SignIn({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();
  const passwordRef = React.useRef();

  function handleSubmit() {
    dispatch(signInRequest(email, password))
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>

        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  )
}

export default SignIn;
