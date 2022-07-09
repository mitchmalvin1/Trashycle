import React, { useContext, useState } from 'react'
import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView } from 'react-native'
import Input from '../components/Auth/Input'
import Button from '../components/ui/Button'
import { AuthContext } from '../store/auth-context'
import { createProfile, createUser, signUp } from '../util/auth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'





const SignUp = ({ navigation }) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dob, setDob] = useState('');

    const authCtx = useContext(AuthContext);


    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
            case 'username':
                setUsername(enteredValue);
                break;
            case 'phoneNumber':
                setPhoneNumber(enteredValue);
                break;
            case 'dob':
                setDob(enteredValue);
                break;
        }
    }

    function checkValidity() {
        const email = enteredEmail.trim();
        const password = enteredPassword.trim();

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;

        return emailIsValid && passwordIsValid
    }

    function pwIsValid() {  //pw is valid if its has at least one number and at least 6 length
        const password = enteredPassword.trim();
        return password.length > 6 && /[0-9]/.test(password);
    }



    async function signUpHandler() {
        const emailIsValid = enteredEmail.trim().includes('@');

        if (!emailIsValid) {
            Alert.alert('Invalid Email', 'Please check that your email is in the correct format.')
            return
        }
        if (!pwIsValid()) {
            Alert.alert('Invalid Password', 'Please check that your password is at least 6 characters long and contains at least one number.')
            return
        }
        if (enteredPassword != enteredConfirmPassword) {
            Alert.alert('Password Mismatch', 'Please ensure that you entered the same password.')
            return
        }

        if (phoneNumber.length < 8) {
            Alert.alert('Invalid', 'Please ensure that you entered the correct phone number.')
            return
        }
        try {
            // const uid = await createUser(enteredEmail, enteredPassword);
            const uid = await signUp(enteredEmail, enteredPassword)
            // authCtx.authenticate(uid);
            // console.log('fetched uid is', uid);
            const response = await createProfile(uid, authCtx.userType, enteredEmail, enteredPassword, username, phoneNumber, dob)
            Alert.alert('Successful!', 'Account has been created, press the button to go back to the sign in page', [{
                text: 'Sign in now',
                onPress: () => {
                    navigation.goBack()
                    console.log('go back');
                },
                style: 'default'
            }])
            // navigation.goBack();
            //console.log(uid, id);
        }
        catch (err) {
            Alert.alert('Sign up failed, please check your credentials again. Email address might already exist.')

        }


    }
    return (
        <KeyboardAwareScrollView style={styles.screen} behavior="padding">
           

                <Text style={styles.title}>Create an account as a {authCtx.userType}</Text>
                <Text style={styles.text}>Sign up with email to get started!</Text>

                {/* <View style={styles.inputContainer}> */}

                <Input
                    placeholder="Username"
                    placeholderTextColor='black'
                    customStyle={styles.input}
                    onUpdateValue={updateInputValueHandler.bind(this, 'username')}
                    value={username}
                    keyboardType="email-address"
                />
                <Input
                    placeholder="Email"
                    placeholderTextColor='black'
                    customStyle={styles.input}
                    onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                    value={enteredEmail}
                    keyboardType="email-address"
                />
                <Input
                    placeholder="Password"
                    placeholderTextColor='black'
                    customStyle={styles.input}
                    onUpdateValue={updateInputValueHandler.bind(this, 'password')}
                    value={enteredPassword}
                    secure
                />
                <Input
                    placeholder="Re-enter password"
                    placeholderTextColor='black'
                    customStyle={styles.input}
                    onUpdateValue={updateInputValueHandler.bind(this, 'confirmPassword')}
                    value={enteredConfirmPassword}
                    secure
                />
                <Input
                    placeholder="Phone number"
                    placeholderTextColor='black'
                    customStyle={styles.input}
                    onUpdateValue={updateInputValueHandler.bind(this, 'phoneNumber')}
                    value={phoneNumber}
                    keyboardType="phone-pad"
                />
                <Input
                    placeholder="Date of birth (dd/mm/yy)"
                    placeholderTextColor='black'
                    customStyle={styles.input}
                    onUpdateValue={updateInputValueHandler.bind(this, 'dob')}
                    value={dob}
                />
                {/* </View> */}
                {/* <View style={styles.buttonContainer}> */}
                <Button customStyle={styles.buttonContainer} onPress={signUpHandler}>Sign Up</Button>
                {/* </View> */}
          
        </KeyboardAwareScrollView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 20,
    },
    text: {
        marginVertical: 10,
        fontWeight: '600',
    },
    inputContainer: {
        flex: 3,
        //alignItems: 'center'
    },
    input: {
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,

    },
    buttonContainer: {
        marginTop: 100

        // alignItems: 'center'
    }
})