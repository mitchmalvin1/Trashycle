import { useContext, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { AuthContext } from '../../store/auth-context';

import Button from '../ui/Button';
import Input from './Input';

function AuthForm({ isLogin, onSubmit, changeUserType, toggleModal }) {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');


    const authCtx = useContext(AuthContext)
    //   const {
    //     email: emailIsInvalid,
    //     confirmEmail: emailsDontMatch,
    //     password: passwordIsInvalid,
    //     confirmPassword: passwordsDontMatch,
    //   } = credentialsInvalid;

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
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

    function submitHandler() {

        if (!checkValidity()) {
            Alert.alert('Invalid input', 'Please check your entered credentials.');
        }
        else {
            onSubmit({
                email: enteredEmail,
                password: enteredPassword,
            });
        }
    }

    return (
        <View style={styles.form}>
            <View>
                <Input
                    placeholder="username/email"
                    placeholderTextColor='black'
                    onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                    value={enteredEmail}
                    keyboardType="email-address"
                />
                <Input
                    placeholder="password"
                    placeholderTextColor='black'
                    onUpdateValue={updateInputValueHandler.bind(this, 'password')}
                    secure
                    value={enteredPassword}
                //isInvalid={passwordIsInvalid}
                />

                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        Log in as {authCtx.userType}
                    </Button>
                </View>

                <View style={styles.forgotPasswordContainer}>
                    <Pressable style={styles.learnMoreButton} onPress={toggleModal}>
                        <Text>?</Text>
                    </Pressable>
                    <Pressable style={styles.pressableContainer}>
                        <Text style={styles.forgotPasswordText}>
                            Forgot Password?
                        </Text>
                    </Pressable>
                </View>

                <Pressable style={styles.pressableContainer} onPress={changeUserType}>
                    <Text style={styles.forgotPasswordText}>
                        I am not a {authCtx.userType}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

export default AuthForm;

const styles = StyleSheet.create({
    buttons: {
        marginVertical: 24,
    },
    pressableContainer: {
        marginTop: 5,
        // marginLeft: '60%',
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent:'flex-end',
        marginLeft:5,
    },
    forgotPasswordText: {
        textDecorationLine: 'underline',
        fontWeight: '600'
    },
    learnMoreButton: {
        width: 20,
        height: 20,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginTop: 5,
        // position: 'absolute',
        // right: '6%',
        // top: '2.5%',
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent:'flex-end'
    }
});