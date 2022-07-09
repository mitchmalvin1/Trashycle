import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors'



function Button({ children, onPress,customStyle, chosen }) {
    console.log(children);
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed, chosen && styles.pressed , customStyle]}
            onPress={onPress}
        >
            <View>
                <Text style={[styles.buttonText]}>{children}</Text>
            </View>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        justifyContent: 'center',
        paddingHorizontal: 12,
        backgroundColor: Colors.green_1,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        height: 40,
    },
    pressed: {
        opacity: 0.75
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
});     