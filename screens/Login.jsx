import React, { useState, useContext } from 'react'
import { Image, TextInput, View, StyleSheet, Text, Pressable, Alert } from 'react-native'
import AuthForm from '../components/Auth/AuthForm';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Colors } from '../constants/colors';
import { AuthContext } from '../store/auth-context';
import { login, signIn } from '../util/auth';
import { getProfile } from '../util/auth';

const Login = ({ navigation }) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const authCtx = useContext(AuthContext);

    async function loginHandler({ email, password }) {
        setIsAuthenticating(true);
        const userType = authCtx.userType;
        try {
            const token = await signIn(email, password, userType +'s');
            if (token == null) {  //successfully signed in but wrong user type
                Alert.alert(
                    'Authentication failed!',
                    `Could not log you in. Please check that you are indeed signing in as ${userType} !`
                );
                setIsAuthenticating(false);
                return;
            }
            const fetchedProfile = await getProfile(token, userType);
            console.log('got profile', fetchedProfile);
            authCtx.setProfile(fetchedProfile);
            authCtx.authenticate(token);


        } catch (error) {
            Alert.alert(
                'Authentication failed!',
                'Could not log you in. Please check your credentials or try again later!'
            );
            console.log(123, error);
            setIsAuthenticating(false);
        }
    }

    function signUpHandler() {
        navigation.navigate('SignUp');
    }

    function changeUserType() {
        navigation.navigate('Welcome');
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..." />
    }

    else {
        return (
            <View style={styles.screen}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/emoji/logoo.png')} />
                    <Text style={styles.logoText}>Trashycle</Text>
                </View>
                <View style={styles.formContainer}>
                    <AuthForm
                        isLogin
                        onSubmit={loginHandler}
                        changeUserType={changeUserType}
                        toggleModal={toggleModal}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.text}>Don't have an account?</Text>
                    <Pressable onPress={signUpHandler} >
                        <Text style={[styles.signUpText, styles.text]}> Sign up</Text>
                    </Pressable>
                </View>

            </View>
        )
    }

}

export default Login;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.green_3
    },
    text: {
        fontWeight: '600'
    },
    logoContainer: {
        flex: 2,
        width: '100%',
        //backgroundColor: 'red',

        justifyContent: 'center',
        flexDirection:'row',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    logo: {
        width: 200,
        height: 150,
    },
    logoText :{
       fontSize:25,
       fontWeight:'900',
       marginBottom:50,
    },
    formContainer: {
        flex: 1.5,
        width: '100%',
        //  backgroundColor: 'white',
        padding: 16,
    },
    footerContainer: {
        flex: 2,
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 50,
    },
    signUpText: {
        textDecorationLine: 'underline',

    }
})