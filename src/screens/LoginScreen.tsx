import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import PokemonLogo from 'assets/icons/PokemonLogo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from 'utils/atoms';

export default function LoginScreen({ navigation }: any) {
  const { control, handleSubmit } = useForm();
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom)

  const onSubmit = (data: any) => {
    console.log(data);
    setIsAuthenticated(true)
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor="white"
      />
      <Text style={styles.loginTitle}>TCG Marketplace</Text>
      <PokemonLogo height={hp(20)} width={hp(20)} />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="username"
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="password"
        defaultValue=""
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTitle: {
    color: 'black',
    fontSize: wp(7),
    fontWeight: 'bold',
  },
  input: {
    width: wp(80),
    height: hp(7),
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    width: '80%',
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
