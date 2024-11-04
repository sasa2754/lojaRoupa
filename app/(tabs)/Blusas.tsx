import { FIREBASE_DB } from '@/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Alert, View, TextInput, TouchableOpacity, FlatList, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F7F8D1FF',
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
      backgroundColor: '#EBCE4BFF',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      shadowColor: "#AF972EFF",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 1,
      shadowRadius: 4.65,
      elevation: 7,
      marginVertical: 12
  },

  buttonText: {
      color: '#5E4606FF',
      fontWeight: 'bold'
  },

  Item: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },

  deleteButton: {
    color: '#DA3416FF',
    fontFamily: 'Karla',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 2
  },

  updateButton: {
    color: '#DD710BFF',
    fontFamily: 'Karla',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 2
  },

  id: {
    maxWidth: 80,
  },

  table: {
    borderColor: '#E9BE30FF',
    borderWidth: 2,
    borderRadius: 6
  },

  name: {
    maxWidth: 300,
    fontFamily: 'Puff',
    fontSize: 17,
    padding: 5
  },

  price: {
    maxWidth: 300,
    fontFamily: 'Karla',
    fontSize: 17,
    padding: 5
  },

  image: {
    width: '90%',
    borderRadius: 10
  }
});

interface Blusa {
  id: string,
  name: string,
  image: string,
  preco: string
}

export default function Blusa() {
  const [blusa, setBlusa] = useState<Blusa[]>([]);
  const [newNameBlusa, setNewNameBlusa] = useState('');
  const [newPrecoBlusa, setNewPrecoBlusa] = useState('');
  const [newImageBlusa, setNewImageBlusa] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, "blusa"), (snapshop) => {
      const blusaList: Blusa[] = snapshop.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Blusa[];
      setBlusa(blusaList);
    })

    return () => unsubscribe();
  }, []);

  const add = async () => {
    if (newNameBlusa === "" && newNameBlusa === "" && newPrecoBlusa === "") {
        Alert.alert("Por favor, insira um produto!");
        return;
    }
    await addDoc(collection(FIREBASE_DB,"blusa"), { name: newNameBlusa, image: newImageBlusa, preco: newPrecoBlusa });
    setNewNameBlusa('');
    setNewPrecoBlusa('');
    setNewImageBlusa('');
  };

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(FIREBASE_DB, "blusa", id));
  };

  const update = async (id: string) => {
    if (newNameBlusa === "" && newNameBlusa === "" && newPrecoBlusa === "") {
      Alert.alert("Por favor, insira os dados para serem atualizados.");
      return;
    }

    const userRef = doc(FIREBASE_DB, "blusa", id);

    await updateDoc(userRef, {
      name: newNameBlusa,
      image: newImageBlusa,
      preco: newPrecoBlusa
    });

    setNewNameBlusa('');
    setNewPrecoBlusa('');
    setNewImageBlusa('');
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            value={newNameBlusa}
            onChangeText={setNewNameBlusa}
          />
          <TextInput
            style={styles.input}
            placeholder="Link da imagem do produto"
            value={newImageBlusa}
            onChangeText={setNewImageBlusa}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            value={newPrecoBlusa}
            onChangeText={setNewPrecoBlusa}
          />
          <TouchableOpacity style={styles.button} onPress={add}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.table}>
          <FlatList
            data={blusa}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              
              <View style={styles.Item}>
                
                <img style={styles.image} src={item.image} alt={item.image} />
                
                <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                
                <Text style={styles.price} numberOfLines={1} ellipsizeMode='tail'>R${item.preco}</Text>
                
                <TouchableOpacity onPress={() => update(item.id)}>
                  <Text style={styles.updateButton}>Atualizar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Text style={styles.deleteButton}>Excluir</Text>
                </TouchableOpacity>
              </View>

            )}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
