import { initializeApp } from 'firebase/app'
import { getDatabase , ref , set, onValue, get, push, update, remove} from 'firebase/database'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification} from "firebase/auth";
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage"
import { ref as sRef } from 'firebase/storage';
import { SnapshotViewIOSComponent } from 'react-native';


const firebaseConfig = {
    apiKey: "AIzaSyALwG2hgd0lMfH91Qg6KNHWo81B-RCMqdQ",
    authDomain: "extrash-updated.firebaseapp.com",
    databaseURL: "https://extrash-updated-default-rtdb.firebaseio.com",
    projectId: "extrash-updated",
    storageBucket: "gs://extrash-updated.appspot.com",
    messagingSenderId: "496381398378",
    appId: "1:496381398378:web:fd694afb2bf1e2f12de913"
  };

  const firebaseApp = initializeApp(firebaseConfig)
  const db = getDatabase(firebaseApp);
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);


  export async function signUp(email,password) {
      try {
        const userData= await createUserWithEmailAndPassword(auth, email,password);
        const uid=userData.user.uid
        console.log('successfully signed up',userData.user,'uid is ',uid);
        return uid
      }
      catch(err) {
          console.log('failed to sign up', error.code,error.message);
      }
   
  }

  export async function verifyEmail() {
      try {
          const response = await sendEmailVerification(auth.currentUser)
          console.log('successfully send the verification email, response and currentUser :', response, auth.currentUser);
      } catch(err) {
          console.log('failed to send verification email', err);
      }
  }

  export async function forgotPassword(email) {
      try {
        const response = await sendPasswordResetEmail(auth, email)
        console.log('Successfully send password reset email', response);
      } catch (err) {
          console.log('failed to send password reset email',err);
      }
      
  }

  export async function hasUserType(uid, type) {  //users or drivers
    let hasChild=false;
    try {
        const snapshot = await get (ref(db, type));
        const child = await snapshot.child(uid).val();

        if (child) {
            hasChild=true;
            console.log('found',hasChild,child);
        } else {
            console.log('not found',hasChild,child,uid,type);
        }

    } catch(err) {
        hasChild=false;
        console.log('error',hasChild,err);
    }
    return hasChild;
  }
  //this is userdata.user

//   { 
//     "_redirectEventId": undefined, 
//     "apiKey": "AIzaSyALwG2hgd0lMfH91Qg6KNHWo81B-RCMqdQ", 
//     "appName": "[DEFAULT]", 
//     "createdAt": "1653490094618", 
//     "displayName": undefined, 
//     "email": "mitch.malvinn@gmail.com", 
//     "emailVerified": false, 
//     "isAnonymous": false, 
//     "lastLoginAt": "1653490094618", 
//     "phoneNumber": undefined, 
//     "photoURL": undefined,
//     "providerData": [[Object]], 
//     "stsTokenManager": { 
//        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmOGUxY2IxNTY0MTQ2M2M2ZGYwZjMzMzk0YjAzYzkyZmNjODg5YWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZXh0cmFzaC11cGRhdGVkIiwiYXVkIjoiZXh0cmFzaC11cGRhdGVkIiwiYXV0aF90aW1lIjoxNjUzNDkwMDk0LCJ1c2VyX2lkIjoibnlKdW1JdEU4U2NqMUY2aEkxZG55MlBsc1FJMyIsInN1YiI6Im55SnVtSXRFOFNjajFGNmhJMWRueTJQbHNRSTMiLCJpYXQiOjE2NTM0OTAwOTQsImV4cCI6MTY1MzQ5MzY5NCwiZW1haWwiOiJtaXRjaC5tYWx2aW5uQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtaXRjaC5tYWx2aW5uQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.LwoZvJbIL6rR9LR6xnjEgMTBG_vqed26482wfPhej8F4_bYsra6X-4FBUu6kznTXQnfb1OalYaD0btt5cm2PRXyHLa-ZA8yw_P85FVPruij1ac859ApQckilGwvtDh8UbH_ong-N4WxcqTVJJTYykZzEyLiQBk7gN3FCFewTcA3QG46pnrvO9V-yhIgtLDENOtV4jnFRz8b5TpRWnjhcDNkxwYAptAbP8WfZerOlXqC3xFMeeFXx4oPxI_ZbU5HIQGiQwFAka2L5gYtccHKet9usqvi2RbDFIjbStgwpz7jFzMyw1Bk0bIdU3mX0KedmiB4R4ODTVHUipVXmPwqU4w",
//        "expirationTime": 1653493694927, 
//        "refreshToken": "AIwUaOkjsYvtqJ8m8783n9yoMOp-BomO-m595bEsMyxbqgZmbtLe3MvksBZHVJF_jSOggQMWkZrPr06TKqPIdBTp0Wc0fewMI8w6JPLPpEZNJDx9qtSUR0TSnF_gHkzmQFLgZqugK1sOkdqYu_3eRAP3VxTAhErD1-DUEjEMR0QFCvclkh4EjE_y0ATmDUDZXEbk-y71-Gf-Jjx1ZcIj4Ho-c_csx2Sx1A" 
//     }, 
//     "tenantId": undefined, 
//     "uid": "nyJumItE8Scj1F6hI1dny2PlsQI3"
//  }

  export async function signIn(email,password,mode) {
      try {
        const userProfile = await signInWithEmailAndPassword(auth,email,password);
        console.log('Successfully signed in', userProfile.user);
        const correctType= await hasUserType(userProfile.user.uid,mode);
        console.log('correc type',correctType);
        if (correctType) {
            console.log('correct',userProfile.user.uid);
            return userProfile.user.uid;
        } else {
            console.log('wrong');
            signOutHandler();
            return null;
        }
        
      } catch (err) {
          console.log('Sign in error',err.code,err.message);
      }
  }

export async function signOutHandler() {
    try {
        const response = await signOut(auth);
        console.log('successfully signed out', response);
    } catch (err) {
        console.log('failed to sign out',err);
    }
}

  export async function createProfile(uid, userType, email, password, username, phoneNumber, dob) {
  //userType is either users or drivers
    try {
        const response= await set(ref(db, `${userType}s/${uid}`), {
            username: username,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            dob: dob,
            points:0,
            title:'Beginner Recycler'
        })
        console.log('created profile at database', response);
        return response;
    } 
    catch (err) {
        console.log(err);
    }
  
  }   
  
  export async function getProfile(uid, userType) {
   const snapshot = await get (ref(db, userType+ 's/' + uid));
   const user=snapshot.val();
   console.log('profile retrieved', user);
   return user
  }

  export async function createRequest(uid,infoObj) {
    const reqRef = ref(db,`users/${uid}/pending`);
    const newReqRef = push(reqRef);
    try {
        const response = await set(newReqRef,{
            ...infoObj,
            uid:uid,
        });
        console.log('successfully made req',response);
        return newReqRef.key;
    } catch(err) {
        console.log('failed to make req',err);
    }
  }

  export async function createGlobalRequest(bookingId,infoObj, type) {
    try {
        const response = await set(ref(db,`requests/${type}/${bookingId}`), {
            ...infoObj,
            status : type
        });
        console.log('successfully created global requests',response);
    } catch(err) {
        console.log('failed to create global req',err);
    }
    
  }

  export async function getLocalRequests(userType,uid,type) {

   try {
        const snapshot = await get (ref(db, `${userType}/${uid}/${type}`));
        let reqArr= null;
        if (snapshot.exists())
        {
             reqArr = Object.keys(snapshot.val()).map((key) => {  //convert object data retrieved from firebase into array
                return {
                  [key]: snapshot.val()[key]
                }
              });
        }
       
        console.log('sucessfully reterived all local pending requests',reqArr);
        return reqArr;
   } 
   catch(err) {
       console.log('failed to reterieve all pending local requests',err,userType,uid,type);
   }

  }

  export async function getGlobalRequests(type) {
      try {
        const snapshot = await get (ref(db, `requests/${type}`));
        let arr = null;
        if (snapshot.exists()) {
        arr = Object.keys(snapshot.val()).map((key) => {  //convert object data retrieved from firebase into array
            return {
              [key]: snapshot.val()[key]
            }
          });
        }
        console.log('sucessfully reterived all global pending requests',arr);
        return arr;
      } catch (err) {
          console.log('failed to retrieve global pending req',err);
      }
  }

  export async function onAcceptRequest(bookingNo, driverUid) {

   try {
       //retrieve the request data
    const snapshot = await get (ref(db, `requests/pending/${bookingNo}`));
    const reqData= snapshot.val();
    console.log('sucessfully reterived the local pending request',reqData);
    const userUid = reqData.uid;

   
 //add req data to driver database
 const reqRef = ref(db,`drivers/${driverUid}/scheduled/${bookingNo}`);
 const response = await set(reqRef,{
     ...reqData,
     driverUid: driverUid,
     status : 'scheduled',
 });
 console.log('successfully added to driver req',response);

 //delete global pending req and later move to scheduled req
 const globalPendingRef = ref(db, `requests/pending/${bookingNo}`)
 remove(globalPendingRef);
 console.log('removed from global pendign req');

 //add to scheduled req to the global req
 createGlobalRequest(bookingNo, {
     ...reqData,
     driverUid: driverUid
 },'scheduled')
 console.log('added lo global scheduled');

 //delete local pending req and later move to local scheduled req
 remove(ref(db,`users/${userUid}/pending/${bookingNo}`))
 console.log('remove local pending req');

 //add to local scheduled req
const localScheduledRef = ref(db, `users/${userUid}/scheduled/${bookingNo}`)
const scheduledResponse = await set(localScheduledRef, {
    ...reqData,
    driverUid: driverUid

})
console.log('added lo lcoal scheduled req');





    return reqData;
   } 
   catch(err) {
   console.log('failed to reterieve the pending local requests',err);
}   
  }

  export async function onCompleteRequest(reqData, driverUid, uid, bookingNo, totalPoints) {
   console.log(reqData, driverUid,uid,bookingNo,totalPoints);
    try {
        //update local profile total points
        const snapshot = await get (ref(db,`users/${uid}`));
        console.log(snapshot.val());
        update(ref(db,`users/${uid}`), {
            ...snapshot.val(),
           points: snapshot.val().points + totalPoints
        }) 
        console.log('updated profile points');

      //remove local user scheduled req and move to local completed req
      remove(ref(db,`users/${uid}/scheduled/${bookingNo}`))
      console.log('remove local user scheduled req');

      const localScheduledRef = ref(db, `users/${uid}/completed/${bookingNo}`)
      const scheduledResponse = await set(localScheduledRef, reqData)
      console.log('added to user completed req');


      //remove local driver scheduled req and move to driver completed req
      remove(ref(db,`drivers/${driverUid}/scheduled/${bookingNo}`))
      console.log('remove local driver scheduled req');

      const localScheduledRef2 = ref(db, `drivers/${driverUid}/completed/${bookingNo}`)
      const scheduledResponse2 = await set(localScheduledRef2, {
          ...reqData,
          status:'completed',
      })
      console.log('added to driver completed req');


      //remove global scheduled req and move to global completed req

      remove(ref(db,`requests/scheduled/${bookingNo}`))
      console.log('remove global scheduled req');

      const localScheduledRef3 = ref(db, `requests/completed/${bookingNo}`)
      const scheduledResponse3 = await set(localScheduledRef3, reqData)
      console.log('added to global completed req');
    
    
    } catch(err) {
          console.log(err,'aiyo');
        }
  }
  export async function removeMissedReq(driverUid,uid,bookingNo)  {
      //remove local driver scheduled req 
      remove(ref(db,`drivers/${driverUid}/scheduled/${bookingNo}`))
      console.log('remove local driver scheduled req');

        //remove local user scheduled req 
      remove(ref(db,`users/${uid}/scheduled/${bookingNo}`))
      console.log('remove local driver scheduled req');

        //remove global scheduled req and move to global completed req
        remove(ref(db,`requests/scheduled/${bookingNo}`))
        console.log('remove global scheduled req');

  }

  export async function uploadImage(imageUri, bookingNo) {
      try {
        const uploadUrl = await uploadImageAsync(imageUri, bookingNo);
        console.log('got uplaod url', uploadUrl);
        return uploadUrl;
      } catch(err) {
          console.log('failed to get uplaod url', err);
      }

  }

  async function uploadImageAsync(imageUri, bookingNo) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", imageUri, true);
        xhr.send(null);
      });
    
      const fileRef = sRef(storage, `images/pending/${bookingNo}`);

      try {
        const result = await uploadBytes(fileRef, blob);
        console.log('successfully uplaodded blob', result);
      } catch(err) {
          console.log('failed to uplaod blob',err);
      }
     
    
      // We're done with the blob, close and release it
      blob.close();
    
      return await getDownloadURL(fileRef);
  }


  export async function updateReq(uid,bookingId, url) {
      try {
        const snapshot = await get (ref(db,`users/${uid}/pending/${bookingId}`));
        update(ref(db,`users/${uid}/pending/${bookingId}`), {
            ...snapshot.val,
            image: url
        })
        console.log('successfully updated');

      } catch(err) {
          console.log(err,'failed to update');
      }
  }
/*
 //add req data to driver database
 const reqRef = ref(db,`drivers/${driverUid}/scheduled/${bookingNo}`);
 const response = await set(reqRef,{
     ...reqData,
     driverUid: driverUid
 });
 console.log('successfully added to driver req',response);

 //delete global pending req and later move to scheduled req
 const globalPendingRef = ref(db, `requests/pending/${bookingNo}`)
 remove(globalPendingRef);
 console.log('removed from global pendign req');

 //add to scheduled req to the global req
 createGlobalRequest(bookingNo, {
     ...reqData,
     driverUid: driverUid
 },'scheduled')

 //delete local pending req and later move to local scheduled req
 remove(ref(db,`users/${userUid}/pending/${bookingNo}`))
 console.log('remove local pending req');

 //add to local scheduled req
const localScheduledRef = ref(db, `users/${userUid}/scheduled/${bookingNo}`)
const scheduledResponse = await set(localScheduledRef, {
    ...reqData,
    driverUid: driverUid

})
*/












//   function save() {
//     var email = document.getElementById('email').value
//     var password = document.getElementById('password').value
//     var username = document.getElementById('username').value
//     var say_something = document.getElementById('say_something').value
//     var favourite_food = document.getElementById('favourite_food').value
  
//     database.ref('users/' + username).set({
//       email : email,
//       password : password,
//       username : username,
//       say_something : say_something,
//       favourite_food : favourite_food
//     })
  
//     alert('Saved')
//   }
  
//   function get() {
//     var username = document.getElementById('username').value
  
//     var user_ref = database.ref('users/' + username)
//     user_ref.on('value', function(snapshot) {
//       var data = snapshot.val()
  
//       alert(data.email)
  
//     })
  
//   }
  
//   function update() {
//     var username = document.getElementById('username').value
//     var email = document.getElementById('email').value
//     var password = document.getElementById('password').value
  
//     var updates = {
//       email : email,
//       password : password
//     }
  
//     database.ref('users/' + username).update(updates)
  
//     alert('updated')
//   }
  
//   function remove() {
//     var username = document.getElementById('username').value
  
//     database.ref('users/' + username).remove()
  
//     alert('deleted')
//   }









// import axios from 'axios';

// const API_KEY = 'AIzaSyBnmLuhbcWvV1WEURfmgq1fZN7cpHxuL_E';
// const BACKEND_URL = 'https://extrash-50874-default-rtdb.firebaseio.com/'

// async function authenticate(mode, email, password) {
//     const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

//     try {
//         const response = await axios.post(url, {
//             email: email,
//             password: password,
//             returnSecureToken: true,
//         });
//         // console.log(response);
//         const token = response.data.idToken;
//         return token;
//     } catch (err) {
//         console.log(123,err);
//     }
// }

// export function createUser(email, password) {
//     return authenticate('signUp', email, password);
// }

// export function login(email, password) {
//     return authenticate('signInWithPassword', email, password);
// }

// export async function createProfile(uid, email, password, username, phoneNumber, dob) {
//     const userProfile = {
//         username: username,
//         uid: uid,
//         email: email,
//         password: password,
//         phoneNumber: phoneNumber,
//         dob: dob
//     }
//     try {
//         const response = await axios.post(BACKEND_URL + `/users/${uid}.json`, userProfile); //create a users node or folder or collection
//         const id = response.data.name;
//         return id;
//     }
//     catch (err) {
//         console.log(345,err);
//     }
 
// }
// Your web app's Firebase configuration

  