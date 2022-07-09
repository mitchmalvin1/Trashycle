import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { Colors } from '../constants/colors'
import { AuthContext } from '../store/auth-context'
import { getLocalRequests } from '../util/auth'
import { useFocusEffect } from '@react-navigation/native';




const Activity = () => {

  const [pendingReq, setPendingReq] = useState();
  const [confirmedReq, setConfirmedReq] = useState();
  const [completedReq, setCompletedReq] = useState();

  const [isFetching, setIsFetching] = useState(true);

  const [pendingSelected, setPendingSelected] = useState(true);
  const [upcomingSelected, setUpcomingSelected] = useState(false);
  const [completedSelected, setCompletedSelected] = useState(false);

  const [reqSelected, setReqSelected] = useState(pendingReq);






  const authCtx = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      async function getReq() {
        const req1 = await getLocalRequests('users',authCtx.token,'pending');
        const req2 = await getLocalRequests('users',authCtx.token,'scheduled');
        const req3 = await getLocalRequests('users',authCtx.token,'completed');
        let reqArr,reqArr2,reqArr3 = null;

        if(req1) {
         reqArr = Object.keys(req1).map((key) => {  //convert object data retrieved from firebase into array
            return {
              [key]: req1[key]
            }
          });
        }
      
        if (req2) {
          reqArr2 = Object.keys(req2).map((key) => {  //convert object data retrieved from firebase into array
            return {
              [key]: req1[key]
            }
          });
        }

        if (req3) {
         reqArr3 = Object.keys(req3).map((key) => {  //convert object data retrieved from firebase into array
            return {
              [key]: req1[key]
            }
          });
        }
     
     
        setPendingReq(req1);
        setConfirmedReq(req2);
        setCompletedReq(req3);
        setIsFetching(false)
      }
      getReq();

      return () => {  //cleanup to unsubscribe
        isActive = false;
      };
    }, [])

  )



  function onTapPending() {
    setPendingSelected(true);
    setReqSelected(pendingReq);
    setUpcomingSelected(false);
    setCompletedSelected(false);
  }

  function onTapUpcoming() {
    setUpcomingSelected(true);
    setReqSelected(confirmedReq);
    setPendingSelected(false);
    setCompletedSelected(false);
  }

  function onTapCompleted() {
    setCompletedSelected(true);
    setReqSelected(completedReq);
    setPendingSelected(false);
    setUpcomingSelected(false);
  }


  function renderReq({ item }) { //item refers to itemObj
    console.log('hmm123', item,confirmedReq);
    const data = Object.values(item)[0];
    // const data = Object.values(itemData)[0];
    // console.log('1234',data,data.categories);

    return (
      <Pressable style={styles.requestContainer}>
          <Text style={styles.detailsText}>Booking number: {Object.keys(item)[0]}</Text>
          <Text style={styles.detailsText}>
            {data.categories.map((category, index) => {
              if (index == data.categories.length - 1) {
                return category;
              } else {
                return category + ', '
              }
            })}
          </Text>
          <Text style={styles.detailsText}>{data.day}, {data.time}</Text>
     

        <Text style={styles.detailsText}>{data.address}</Text>
      </Pressable>
    )
  }


  const dummyData = [1, 2, 3, 4, 5]
  return (
    <View style={styles.screen}>
      <Text style={[styles.title, { marginLeft: '5%' }]}>Activity</Text>
      <View style={styles.headerContainer}>
        <Pressable style={[styles.pressableContainer, { borderBottomColor: pendingSelected ? Colors.green_1 : Colors.green_3 }]} onPress={onTapPending}>
          <Text style={[styles.secondaryTitle, { textAlign: 'center', }]}>Pending</Text>
        </Pressable>
        <Pressable style={[styles.pressableContainer, { borderBottomColor: upcomingSelected ? Colors.green_1 : Colors.green_3 }]} onPress={onTapUpcoming}>
          <Text style={[styles.secondaryTitle, { textAlign: 'center', }]}>Upcoming</Text>
          <View style={styles.line}></View>
        </Pressable>
        <Pressable style={[styles.pressableContainer, { borderBottomColor: completedSelected ? Colors.green_1 : Colors.green_3 }]} onPress={onTapCompleted}>
          <Text style={[styles.secondaryTitle, { textAlign: 'center', }]}>Completed</Text>
          <View style={styles.line}></View>
        </Pressable>
      </View>

      {isFetching ? <ActivityIndicator size="large" /> :
        <FlatList
         ListEmptyComponent={<Text style={styles.nullText}>Oops! There seems to be nothing yet.</Text>}
          data={pendingSelected ? pendingReq : upcomingSelected ? confirmedReq : completedReq}
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
  nullText : {
    textAlign:'center',
    fontWeight:'700',
    marginTop:'10%'
},
  scrollScreen: {
    backgroundColor: 'red'
  },
  requestContainer: {
    marginHorizontal: '10%',
    marginVertical: '5%',
    paddingHorizontal: '4%',
    paddingVertical: '5%',
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
    fontWeight: '700',
    marginVertical:'5%',
  }
  // line: {
  //   width: '100%',
  //   borderWidth: 1,
  //   marginTop: '10%',
  // }
})



// {pendingReq? 'hmm': pendingReq['-N3hrGLxaVNC7lDx5t6l'].address}

//{"-N3hrGLxaVNC7lDx5t6l": {"address": "730 Clementi West Street 2, Block 730, Singapore 120730", "categories": ["Newspaper", "Cardboard", "Mixed paper"], "day": "2022-06-06", "image": "https://firebasestorage.googleapis.com/v0/b/extrash-updated.appspot.com/o/images%2Fpending%2F-N3hrGLxaVNC7lDx5t6l?alt=media&token=f3cfb660-832f-4554-a803-a54320d372c1", "location": {"lat": 1.3048584324374972, "lng": 103.76337990515057}, "time": "09.00 AM - 11:30 AM", "uid": "INBIbq7SbzMD2X69eXq1Wlng4SK2"}}