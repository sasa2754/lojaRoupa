import { FIREBASE_DB } from '@/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Alert, View, TextInput, TouchableOpacity, FlatList, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F7E5FFFF',
      gap: 10
  },

  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      height: 40,
      paddingHorizontal: 10,
      marginBottom: 10,
  },

  button: {
      backgroundColor: '#964BEBFF',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      shadowColor: "#8C07C065",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 1,
      shadowRadius: 4.65,
      elevation: 7,
  },

  buttonText: {
      color: '#fff',
      fontWeight: 'bold'
  },

  userItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },

  deleteButton: {
      color: 'red',
  },

  updateButton: {
    color: 'blue',
  },

  id: {
    maxWidth: 80,
  },

  table: {
    borderColor: '#B430E9FF',
    borderWidth: 2,
    borderRadius: 6
  },

  name: {
    maxWidth: 100
  }
});

interface User {
  id: string,
  name: string
}

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, "users"), (snapshop) => {
      const userList: User[] = snapshop.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
      setUsers(userList);
    })

    return () => unsubscribe();
  }, []);

  const addUser = async () => {
    if (newUser === "") {
        Alert.alert("Por favor, insira um nome.");
        return;
    }
    await addDoc(collection(FIREBASE_DB,"users"), { name: newUser });
    setNewUser('');
  };

  const deleteUser = async (id: string) => {
    await deleteDoc(doc(FIREBASE_DB, "users", id));
  };

  const updateUser = async (id: string) => {
    if (newUser === "") {
      Alert.alert("Por favor, insira um novo nome para o usuário.");
      return;
    }

    const userRef = doc(FIREBASE_DB, "users", id);

    await updateDoc(userRef, {
      name: newUser
    });

    setNewUser('');
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
            style={styles.input}
            placeholder="Novo Usuário"
            value={newUser}
            onChangeText={setNewUser}
        />
        <TouchableOpacity style={styles.button} onPress={addUser}>
            <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.userItem}>
                  <Text style={styles.id} numberOfLines={1} ellipsizeMode='tail'>{item.id}</Text>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                    <TouchableOpacity onPress={() => updateUser(item.id)}>
                        <Text style={styles.updateButton}>Atualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteUser(item.id)}>
                        <Text style={styles.deleteButton}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
      </View>

  </View>
  );
}
