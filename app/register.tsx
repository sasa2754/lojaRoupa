import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const styles = StyleSheet.create({
    container: {
       backgroundColor: '#F7F8D1FF',
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
    },

    favo: {
        width: '250%',
        height: '90%',
    },

    box: {
        backgroundColor: '#FFFFFFE0',
        width: '90%',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        position: 'absolute',
        shadowColor: "#423E14C5",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        gap: 18,
        maxWidth: 500
    },

    input: {
        borderColor: '#F0E09CFF',
        borderWidth: 2,
        borderRadius: 5,
        padding: 4,
    },

    button: {
        width: 140,
        height: 30,
        backgroundColor: '#FFEC97FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },

    inputContainer: {
        width: '90%'
    }
});


export default function Login() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [repeatPass, setRepeatPass] = useState('');

    const auth = FIREBASE_AUTH;

    useEffect(() => {
        console.log(auth.currentUser);
    }, [auth.currentUser]);

    useEffect(() => {
        console.log(email, pass);
    }, [email, pass]);

    const onPress = () => {
        createUserWithEmailAndPassword(auth, email, pass)
            .then((dadosUsuario) => {
                console.log(dadosUsuario);
                router.push("/index.tsx");
            })
            .catch((err) => {
                alert('Algo deu errado, tente novamente!');
                console.error(err);
            });
    };

    console.log(email, pass);
    console.log(typeof email, typeof pass);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.favo} source={require('@/assets/images/favo-de-mel.png')} resizeMode="contain"></Image>
            
            <View style={styles.box}>
                <Text style={{color: '#B66A08FF', fontFamily: 'Puff', fontSize: 20, fontWeight: 'bold'}}>Login</Text>
                
                <View style={{gap: 10, width: '90%', alignItems: 'center'}}>
                    <View style={styles.inputContainer}>
                        <Text style={{color: '#D3A832FF', fontSize: 18, fontFamily: 'Karla', fontWeight: 'bold'}}>Nome</Text>
                        <TextInput style={styles.input} value={name} onChangeText={setName} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{color: '#D3A832FF', fontSize: 18, fontFamily: 'Karla', fontWeight: 'bold'}}>Email</Text>
                        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{color: '#D3A832FF', fontSize: 18, fontFamily: 'Karla', fontWeight: 'bold'}}>Senha</Text>
                        <TextInput style={styles.input} value={pass} onChangeText={setPass} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{color: '#D3A832FF', fontSize: 18, fontFamily: 'Karla', fontWeight: 'bold'}}>Repita a senha</Text>
                        <TextInput style={styles.input} value={repeatPass} onChangeText={setRepeatPass} />
                    </View>
                </View>

                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <Text style={{color: '#5E4606FF', fontFamily: 'Karla', fontWeight: 'bold'}}>Entrar</Text>
                </TouchableOpacity> 

                <View style={{width: 200, alignItems: 'center'}}>
                    <Text style={{color: '#B66A08FF', fontFamily: 'Karla', fontWeight: 'bold'}}>Já tem uma conta?</Text>
                    <Link href={'/'} style={{color: '#D3A832FF', fontFamily: 'Karla', fontWeight: 'bold'}}>Login</Link>
                </View>
            </View>
        
        </SafeAreaView>
    );
}


