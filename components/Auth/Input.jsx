import { View, Text, TextInput, StyleSheet } from 'react-native';

//import { Colors } from '../../constants/styles';

function Input({
    keyboardType,
    secure,
    isInvalid,
    placeholder,
    onUpdateValue,
    customStyle,
    value
}) {
    return (
        <View style={[styles.inputContainer,customStyle]}>

            <TextInput
                style={[styles.input, isInvalid && styles.inputInvalid]}
                autoCapitalize="none"
                keyboardType={keyboardType}
                secureTextEntry={secure}
                placeholder={placeholder}
                value={value}
                // placeholderTextColor={placeholderTextColor}
             onChangeText={onUpdateValue}
            // value={value}
            />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 4,
        borderRadius: 10,
        overflow:'hidden',
       
    },
    label: {
        color: 'black',
        marginBottom: 4,
    },
    labelInvalid: {
        color: 'red',
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        backgroundColor: 'white',
       
        fontSize: 16,
    },
    inputInvalid: {
        backgroundColor: 'gray',
    },
});