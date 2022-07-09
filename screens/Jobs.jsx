import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native'
import { Colors } from '../constants/colors'
import { AuthContext } from '../store/auth-context'
import { getGlobalRequests, getLocalRequests, onAcceptRequest, removeMissedReq } from '../util/auth'
import {  useFocusEffect } from '@react-navigation/native';
import LoadingOverlay from '../components/ui/LoadingOverlay'




const Activity = ({navigation,route}) => {

    const isScheduled = route?.params?.goScheduled

  const [pendingReq, setPendingReq] = useState();
  const [scheduledReq, setScheduledReq] = useState();
  const [completedReq, setCompletedReq] = useState();

  const [isFetching, setIsFetching] = useState(true);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const [pendingSelected, setPendingSelected] = useState(isScheduled? false : true);
  const [scheduledSelected, setScheduledSelected] = useState(isScheduled ? true : false);
  const [completedSelected, setCompletedSelected] = useState(false);

  const [reqSelected, setReqSelected] = useState(isScheduled? completedReq : pendingReq);






  const authCtx = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      async function getReq() {
     
        //all these return an array
        let pendingData = await getGlobalRequests('pending');
        let scheduledData = await getLocalRequests('drivers',authCtx.token,'scheduled')
        let completedData = await getLocalRequests('drivers',authCtx.token,'completed');

        // const pendingArr = Object.keys(pendingReq).map((key) => {  //convert object data retrieved from firebase into array
        //   return {
        //     [key]: req1[key]
        //   }
        // });

        setPendingReq(pendingData);
        setScheduledReq(scheduledData);
        setCompletedReq(completedData)
        setIsFetching(false)
      }
      setIsFetching(true);
      getReq();

      return () => {  //cleanup to unsubscribe
        isActive = false;
      };
    }, [toggleRefresh])

  )

let today = new Date().toLocaleDateString('en-CA');
console.log('today',today);

  function onTapPending() {
    setPendingSelected(true);
    setReqSelected(pendingReq);
    setScheduledSelected(false);
    setCompletedSelected(false);
  }

  function onTapUpcoming() {
      console.log(scheduledReq);
    setScheduledSelected(true);
    setReqSelected(scheduledReq);
    setPendingSelected(false);
    setCompletedSelected(false);
  }

  function onTapCompleted() {
    setCompletedSelected(true);
    setReqSelected(completedReq);
    setPendingSelected(false);
    setScheduledSelected(false);
  }

async function onAccept(driverUid,bookingNo) {
  console.log(driverUid,bookingNo);
  setToggleRefresh(!toggleRefresh);


  try {
    const response = await onAcceptRequest(driverUid, bookingNo)
    pendingData = await getGlobalRequests('pending');
    setPendingReq(pendingData);
    setToggleRefresh(!toggleRefresh);
  } catch(err) {
      console.log(err,123);
      Alert.alert('Failed to accept the job', 'Please try again.')
      setToggleRefresh(!toggleRefresh);
  }
  
}

function onProceed(dataObj) {
  navigation.navigate('RiderMap',dataObj)
}

async function onPressMissed(dataObj) {
  setToggleRefresh(!toggleRefresh);
  try {
    console.log(dataObj);
    response = await removeMissedReq(dataObj.driverUid,dataObj.uid,dataObj.bookingNo);
    console.log('successfully cleared missed request');
  } catch(err) {
    console.log('failed to clearr missed req',err);
    setToggleRefresh(!toggleRefresh);
  }

}


  function renderReq({ item }) { //item refers to itemObj
    // console.log('hmm', item);
    const data = Object.values(item)[0];
    const bookingNumber= Object.keys(item)[0];
    console.log(bookingNumber);
    console.log(123,item);
    let button;
    let text = <Text style={{color:'white', fontWeight:'600'}}>Proceed</Text>

   


    if (data.status ==='scheduled' && today > data.day) 
    {
      button = 
       (<View style={styles.buttonsContainer}>
    <Pressable style={[styles.acceptButton, {backgroundColor : 'red'}]} onPress={onPressMissed.bind(this,{
        ...data,
        bookingNo:bookingNumber
    })}>
      <Text style={{color:'white', fontWeight:'600'}}>Missed</Text>
    </Pressable>
</View>)
    }
    else if (data.status ==='scheduled' && today <= data.day) 
    {
      button = 
       (<View style={styles.buttonsContainer}>
    <Pressable style={styles.acceptButton} onPress={onProceed.bind(this,{
        ...data,
        bookingNo:bookingNumber
    })}>
      <Text style={{color:'white', fontWeight:'600'}}>Proceed</Text>
    </Pressable>
</View>)
    }

    else if (data.status==='pending') {
        button = (
            <View style={styles.buttonsContainer}>
    <Pressable style={styles.acceptButton} onPress={onAccept.bind(this,Object.keys(item)[0],authCtx.token)}>
        <Text style={{color:'white', fontWeight:'600'}}>Accept</Text>
    </Pressable>
</View>
        )
    }


    return ( 
        <View style={styles.reqContainer} >
            <View style={styles.rowContainer}>
                <View style={styles.details1Container}>
                  <Text style={styles.addressText}>{data.address}</Text>
                  <Text style={styles.categoriesText}>{data.categories.map((category, index) => {
                     if (index == data.categories.length - 1) {
                          return category;
                     } else {
                       return category + ', '
                     }
                   })}
                   </Text>
                </View>
                <View style={styles.details2Container}>
                   <Text>{data.day}, {data.time}</Text>
                </View>
            </View>
            {button}
        </View>
    )
    // return (
    //   <Pressable style={styles.requestContainer}>
    //       <Text style={[styles.detailsText, {fontWeight:'700'}]}>Booking No: {Object.keys(item)[0]}</Text>
    //       <Text style={styles.detailsText}>
    //         {data.categories.map((category, index) => {
    //           if (index == data.categories.length - 1) {
    //             return category;
    //           } else {
    //             return category + ', '
    //           }
    //         })}
    //       </Text>
    //       <Text style={styles.detailsText}>{data.day}, {data.time}</Text>
    //     <Text style={styles.detailsText}>{data.address}</Text>
    //     {button}
       
    //   </Pressable>
    // )
  }


  const dummyData = [1, 2, 3, 4, 5]
  return (
    <View style={styles.screen}>
      <Text style={[styles.title, { marginLeft: '5%' }]}>Activity</Text>
      <View style={styles.headerContainer}>
        <Pressable style={[styles.pressableContainer, { borderBottomColor: pendingSelected ? Colors.green_1 : Colors.green_3 }]} onPress={onTapPending}>
          <Text style={[styles.secondaryTitle, { textAlign: 'center', }]}>Pending</Text>
        </Pressable>
        <Pressable style={[styles.pressableContainer, { borderBottomColor: scheduledSelected ? Colors.green_1 : Colors.green_3 }]} onPress={onTapUpcoming}>
          <Text style={[styles.secondaryTitle, { textAlign: 'center', }]}>Scheduled</Text>
          <View style={styles.line}></View>
        </Pressable>
        <Pressable style={[styles.pressableContainer, { borderBottomColor: completedSelected ? Colors.green_1 : Colors.green_3 }]} onPress={onTapCompleted}>
          <Text style={[styles.secondaryTitle, { textAlign: 'center', }]}>Completed</Text>
          <View style={styles.line}></View>
        </Pressable>
      </View>

      {isFetching ? 
     <LoadingOverlay message="Loading"/> :

        <FlatList
          ListEmptyComponent={<Text style={styles.nullText}>Oops! There seems to be nothing yet.</Text>}
          data={pendingSelected ? pendingReq : scheduledSelected ? scheduledReq : completedReq}
          renderItem={renderReq}


        />
      }


    </View>
  )
}


// function renderMealItem(itemData) {
//   const item = itemData.item;
//   const mealItemProps = {
//       id: item.id,
//       title: item.title,
//       imageUrl: item.imageUrl,
//       affordability: item.affordability,
//       complexity: item.complexity,
//       duration: item.duration
//   }
//   return <MealItem {...mealItemProps} />
// }


export default Activity


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: '10%',
  },
  title: {
    fontWeight: '900',
    fontSize: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  secondaryTitle: {
    fontWeight: '700',
    fontSize: 18,

    // marginHorizontal:'5%',
  },
  pressableContainer: {
    flex: 1,
    borderBottomWidth: 3,
    paddingBottom: '3%',
  },
  scrollScreen: {
    backgroundColor: 'red'
  },
  requestContainer: {
    marginHorizontal: '10%',
    marginVertical: '5%',
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    borderRadius: 10,
    backgroundColor: Colors.green_3,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
  },
  rowContainer: {
    flexDirection:'row',
    backgroundColor:'red',
  },
  detailsText : {
  
    marginVertical:'1%',
  },
  buttonsContainer: {
    //  backgroundColor:'red',
     justifyContent:'center',
     alignItems:'center',
     marginTop:4,
  },
  acceptButton: {
      backgroundColor: '#64cb65',
      borderRadius:10,
      width:'40%',
      justifyContent:'center',
      alignItems:'center',
      height:30,
      shadowColor: 'black',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
     
   
  },

  nullText : {
      textAlign:'center',
      fontWeight:'700',
      marginTop:'10%'
  },
  reqContainer : {
      paddingVertical:'5%',
      paddingHorizontal:'5%',
      borderBottomWidth:2,
      borderBottomColor:Colors.green_3
  },
  rowContainer: {
      flexDirection:'row'
  },
  details1Container : {
      flex: 2,
      paddingHorizontal: '2%',
  },
  details2Container: {
      flex: 1,
      paddingHorizontal: '2%',
  },
  addressText: {
      marginBottom:'2%',
      fontWeight:'500'
  },
  categoriesText: {
      marginBottom:'2%',
  }

})



// {pendingReq? 'hmm': pendingReq['-N3hrGLxaVNC7lDx5t6l'].address}

//{"-N3hrGLxaVNC7lDx5t6l": {"address": "730 Clementi West Street 2, Block 730, Singapore 120730", "categories": ["Newspaper", "Cardboard", "Mixed paper"], "day": "2022-06-06", "image": "https://firebasestorage.googleapis.com/v0/b/extrash-updated.appspot.com/o/images%2Fpending%2F-N3hrGLxaVNC7lDx5t6l?alt=media&token=f3cfb660-832f-4554-a803-a54320d372c1", "location": {"lat": 1.3048584324374972, "lng": 103.76337990515057}, "time": "09.00 AM - 11:30 AM", "uid": "INBIbq7SbzMD2X69eXq1Wlng4SK2"}}