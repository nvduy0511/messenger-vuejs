import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import * as firestoreService from '../database/firestore';
import {router} from '../main'

const base_url = import.meta.env.VITE_BASE_URL_VUE;
const NO_AVATAR_URL = 'https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png'
const firebaseConfig =
	import.meta.env.MODE === 'development'
		? JSON.parse(import.meta.env.VITE_APP_FIREBASE_CONFIG)
		: JSON.parse(import.meta.env.VITE_APP_FIREBASE_CONFIG_PUBLIC)

export const uiConfig = {
    signInFlow: 'popup',
    // signinSuccessUrl: '/login',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
            console.log({b:authResult.user.displayName,a :authResult.user.uid, c:authResult });
            //clear in local storage with key "user"
            const asyncFunc = async () => {
                localStorage.removeItem('user');
                const users = await firestoreService.getUserByUid(authResult.user.uid)
                if (users.data.length === 0) {
                    //save to database
                    const { id } = await firestoreService.addUser({
                        username: authResult.user.displayName,
                        avatar: authResult.user.photoURL??NO_AVATAR_URL, 
                        uid: authResult.user.uid
                    })
                    await firestoreService.updateUser(id, { _id: id })
                    const user  = await firestoreService.getUser(id);
                    console.log(user)
                    localStorage.setItem('user', JSON.stringify(user));
                }
                else{
                    console.log(users.data[0])
                    await firestoreService.updateUser(users.data[0].id, { avatar:  authResult.user.photoURL??NO_AVATAR_URL })
                    const user  = await firestoreService.getUser(users.data[0].id);
                    localStorage.setItem('user', JSON.stringify(user));
                }
                setTimeout( () => { console.log("time-out"), 2000})
                router.push("/")
            }
            asyncFunc();
            
            //so it doesn't refresh the page
            return false;
        },
        uiShown: function () {
            console.log('firebase UI mounted');
        },
    },
};

firebase.initializeApp(firebaseConfig);