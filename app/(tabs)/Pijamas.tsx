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

interface Pijama {
  id: string,
  name: string,
  image: string,
  preco: string
}

export default function Pijama() {
  const [pijama, setPijama] = useState<Pijama[]>([]);
  const [newNamePijama, setNewNamePijama] = useState('');
  const [newPrecoPijama, setNewPrecoPijama] = useState('');
  const [newImagePijama, setNewImagePijama] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, "pijama"), (snapshop) => {
      const pijamaList: Pijama[] = snapshop.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Pijama[];
      setPijama(pijamaList);
    })

    return () => unsubscribe();
  }, []);

  const add = async () => {
    if (newNamePijama === "" && newNamePijama === "" && newPrecoPijama === "") {
        Alert.alert("Por favor, insira um produto!");
        return;
    }
    await addDoc(collection(FIREBASE_DB,"pijama"), { name: newNamePijama, image: newImagePijama, preco: newPrecoPijama });
    setNewNamePijama('');
    setNewPrecoPijama('');
    setNewImagePijama('');
  };

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(FIREBASE_DB, "pijama", id));
  };

  const update = async (id: string) => {
    if (newNamePijama === "" && newNamePijama === "" && newPrecoPijama === "") {
      Alert.alert("Por favor, insira os dados para serem atualizados.");
      return;
    }

    const userRef = doc(FIREBASE_DB, "pijama", id);

    await updateDoc(userRef, {
      name: newNamePijama,
      image: newImagePijama,
      preco: newPrecoPijama
    });

    setNewNamePijama('');
    setNewPrecoPijama('');
    setNewImagePijama('');
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            value={newNamePijama}
            onChangeText={setNewNamePijama}
          />
          <TextInput
            style={styles.input}
            placeholder="Link da imagem do produto"
            value={newImagePijama}
            onChangeText={setNewImagePijama}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            value={newPrecoPijama}
            onChangeText={setNewPrecoPijama}
          />
          <TouchableOpacity style={styles.button} onPress={add}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.table}>
          <FlatList
            data={pijama}
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
