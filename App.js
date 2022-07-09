import { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppIntroSlider from 'react-native-app-intro-slider';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

import Home from './screens/Home';
import Activity from './screens/Activity';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Map from './screens/Map';
import Materials from './screens/Materials';
import PickTime from './screens/PickTime';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { Colors } from './constants/colors';
import Rewards from './screens/Rewards';
import Community from './screens/Community';
import Profile from './screens/Profile';
import ConfirmPickup from './screens/ConfirmPickup';
import Welcome from './screens/Welcome';
import Result from './screens/Result';
import Jobs from './screens/Jobs';
import RiderHome from './screens/RiderHome';
import RiderMap from './screens/RiderMap';
import RiderProfile from './screens/RiderProfile';
import Calculator from './screens/Calculator';


const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const slides = [
  {
    key: 1,
    title: 'Sort your recycling',
    text: "Sort your trash by material. Read the descriptions on our list of acceptable materials if you're unsure of what's what!",
    image: require('./assets/emoji/onboarding-06.png'),
    backgroundColor: 'white'
  },
  {
    key: 2,
    title: 'Schedule a pickup',
    text: "Take and upload photos of your recyclables, then fill in your location and when you'd like to have your recycling collected.",
    image: require('./assets/emoji/onboarding-05.png'),
    backgroundColor: 'white'
  },
  {
    key: 3,
    title: 'Leave the recycling to us',
    text: "Our Extrash rider will collect your recycling directly from you.",
    image: require('./assets/emoji/onboarding-04.png'),
    backgroundColor: 'white'
  },
  {
    key: 4,
    title: 'Get rewards',
    text: "Trade in your points in exchange for cashback or vouchers.",
    image: require('./assets/emoji/onboarding-03.png'),
    backgroundColor: 'white'
  },


]

function renderItem({ item }) {
  return (
    <SafeAreaView style={styles.slideContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.text}</Text>
      </View>

    </SafeAreaView>
  )
}

function renderNextButton() {
  return (
    <View style={styles.buttonCircle}>
      <AntDesign name="arrowright" size={32} color="black" />
    </View>
  );
}

function renderPreviousButton() {
  return (
    <View style={styles.buttonCircle}>
      <AntDesign name="arrowleft" size={32} color="black" />
    </View>
  )
}

function renderDoneButton() {
  return (
    <View style={styles.buttonCircle}>
      <AntDesign name="check" size={32} color="black" />
    </View>
  )
}
// function HomeStack() {
//   return (
//     <Stack.Navigator screenOptions={{
//       headerShown: true
//     }}>
//       <Stack.Screen name="HomeTabScreen" component={HomeTabScreen} options={{
//         headerShown:false
//       }}/>
//       <Stack.Screen name="Map" component={Map} />
//       <Stack.Screen name="Materials" component={Materials} options={{
//         headerShown:false
//         }}/>
//     </Stack.Navigator>
//   )
// }


function HomeTabScreen() {
  return (
    <Tabs.Navigator

      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.green_3,
        tabBarInactiveTintColor: Colors.green_1,
        tabBarStyle: {
          borderTopColor: Colors.green_3,
          borderTopWidth: 1,
          shadowColor: 'black',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.55,
          shadowRadius: 4,
        },

      }}>
      <Tabs.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />
      }} />
      <Tabs.Screen name="Activity" component={Activity} options={{
        tabBarIcon: ({ color, size }) => <AntDesign name="profile" size={size} color={color} />
      }} />
      <Tabs.Screen name="Rewards" component={Rewards} options={{
        tabBarIcon: ({ color, size }) => <MaterialIcons name="attach-money" size={size} color={color} />
      }} />
      <Tabs.Screen name="Community" component={Community} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />
      }} />
      <Tabs.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />
      }} />
    </Tabs.Navigator>
  )
}

function RiderTabScreen() {
  return( 
    <Tabs.Navigator

      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.green_3,
        tabBarInactiveTintColor: Colors.green_1,
        tabBarStyle: {
          borderTopColor: Colors.green_3,
          borderTopWidth: 1,
          shadowColor: 'black',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.55,
          shadowRadius: 4,
        },

      }}>
      <Tabs.Screen name="Home" component={RiderHome} options={{
        tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />
      }} />
      <Tabs.Screen name="Jobs" component={Jobs} options={{
        tabBarIcon: ({ color, size }) => <AntDesign name="profile" size={size} color={color} />
      }} />
      <Tabs.Screen name="Rewards" component={Rewards} options={{
        tabBarIcon: ({ color, size }) => <MaterialIcons name="attach-money" size={size} color={color} />
      }} />
      <Tabs.Screen name="RiderProfile" component={RiderProfile} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />
      }} />
    </Tabs.Navigator>
     
  )
}

function NonAuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true
    }}>
      <Stack.Screen name="Welcome" component={Welcome} options={{
              headerShown: false
            }} />
      <Stack.Screen name="Login" component={Login} options={{
        headerShown: false
      }} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}

function AuthStack() {

  //if user show user, if driver show driver
  const authCtx = useContext(AuthContext);

  if (authCtx.userType === 'user')
  {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="HomeTabScreen" component={HomeTabScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Map" component={Map} options={{
          headerShown: true
        }} />
        <Stack.Screen name="Materials" component={Materials} />
        <Stack.Screen name="PickTime" component={PickTime} />
        <Stack.Screen name="ConfirmPickup" component={ConfirmPickup} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    )
  }
  
  else {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="RiderTabScreen" component={RiderTabScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="RiderMap" component={RiderMap} options={{
          headerShown: true
        }}/>
           <Stack.Screen name="Calculator" component={Calculator} />
      
      </Stack.Navigator>
    )
  }

  
}

function Navigation() {

  const authCtx = useContext(AuthContext);
  
  return (
       <NavigationContainer>
          {authCtx.isAuthenticated && <AuthStack />}
          {!authCtx.isAuthenticated && <NonAuthStack />}
        </NavigationContainer>
      
   
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  // useEffect(() => {
  //   async function fetchToken() {
  //     const storedToken = await AsyncStorage.getItem('token');

  //     if (storedToken) {
  //       authCtx.authenticate(storedToken);
  //     }

  //     setIsTryingLogin(false);
  //   }

  //   fetchToken();
  // }, []);

  // if (isTryingLogin) {
  //   return <AppLoading />;
  // }

  return <Navigation />;
}

export default function App() {

  const [isSliding, setIsSliding] = useState(true);




  function onDone() {
    setIsSliding(false);
  }

  return (


    isSliding ?
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        onDone={onDone}
        renderNextButton={renderNextButton}
        renderPrevButton={renderPreviousButton}
        showPrevButton={true}
        renderDoneButton={renderDoneButton}
        activeDotStyle={styles.activeDot}
        dotStyle={styles.inactiveDot}
      />
      :
      <>
        <StatusBar />

        <AuthContextProvider>
          <Root />
        </AuthContextProvider>

      </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 0.6,
    //  backgroundColor: 'red',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1.5,
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
  textContainer: {
    flex: 1,
    width: '75%',
    //backgroundColor: 'green'
  },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    backgroundColor: Colors.green_3
  },
  inactiveDot: {
    backgroundColor: Colors.green_1
  }

});
