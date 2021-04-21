import React, { FC, useState, useEffect } from 'react';
import { Alert, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Text, Input, Button, InputProps } from "@ui-kitten/components";
import { Control, FieldErrors, useController, useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormInput from 'src/components/FormInput';
import { useNavigation } from '@react-navigation/native';
import { routes } from 'src/types/routes';
import { useAuth } from '../hooks/auth';
import {firebaseInstance} from '../../App'
import Spinner from 'react-native-loading-spinner-overlay';


interface LoginForm{
  email: string;
  password: string;
}


const formSchema = yup.object().shape({
  email: yup.string().required('No email address was provided').email('Please enter a valid email address'),
  password: yup.string().required('No password was provided').min(8, 'Password should be at least 8 characters long')
});

const LoginPage: FC = () => {
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState<Partial<LoginForm>>();
  const [formValues, setFormValues] = useState<LoginForm>();
  const [, setAuthState] = useAuth();
  const [loading, setLoading] = useState(false)

  const {handleSubmit, control} = useForm({
    resolver: yupResolver(formSchema)
  })

  const loginAction = (email: string, password: string) => {
    firebaseInstance.auth().signInWithEmailAndPassword(email, password).then((userCreds) => {
      setAuthState({authState: true, userDetails: userCreds.user})
      setLoading(false);
      navigation.navigate(routes.HOME)
    }).catch((e: Error) => {
      Alert.alert(`Couldn't login`, e.message)
    })
  }

  const onValidForm = (data: LoginForm) => {
    setLoading(true)
    setFormValues(data);
    loginAction(data.email, data.password);
  }

  const onInvalidForm = (errors: FieldErrors<LoginForm>) => {
    let fieldErrors = {
      email: errors.email?.message,
      password: errors.password?.message
    }
    setFormErrors(fieldErrors);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Text style={styles.titleText} category="h2">
        Login
      </Text>
      <View style={styles.form}>
        <FormInput
          label='Email Address'
          placeholder='Enter your email address'
          caption={formErrors?.email}
          style={styles.input}
          name="email"
          control={control}

        />
        <FormInput
          label='Password'
          placeholder='Enter your password'
          caption={formErrors?.password}
          secureTextEntry={true}
          style={styles.input}
          name="password"
          control={control}
        />
        <Button onPress={handleSubmit(onValidForm, onInvalidForm)}>
          Login
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20
  },
  titleText: {
    textAlign: "center",
  },
  input: {
    marginVertical: 10
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});
