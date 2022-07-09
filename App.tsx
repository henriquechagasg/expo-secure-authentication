import { Button, StyleSheet, Text, View } from 'react-native';
import { persistor, store } from './redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { loggedIn, loggedOut, selectUser } from './redux/auth';
import { useAuthenticateMutation } from './api';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Auth />
      </PersistGate>
    </Provider>
  );
}

function Auth() {
  const dispatch = useDispatch();

  const [authenticate, _] = useAuthenticateMutation();

  const user = useSelector(selectUser);

  const isLoggedIn = !!user.id;

  async function handleLogin() {
    const userData = await authenticate().unwrap();

    dispatch(loggedIn(userData));
  }

  async function handleLogout() {
    dispatch(loggedOut());
  }

  return (
    <View style={styles.container}>
      <Text>
        User current state:
        {isLoggedIn ? 'Authenticated' : 'Not Authetnicated'}
      </Text>
      <Button title="Login" onPress={handleLogin} />
      {isLoggedIn && (
        <>
          <Text style={styles.text}>
            Current user data: {JSON.stringify(user)}
          </Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    textAlign: 'center',
  },
});
