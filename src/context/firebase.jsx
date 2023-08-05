import { createContext ,useContext,useState,useEffect} from "react";
import { initializeApp } from 'firebase/app';
import { getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import {  signInWithPopup, GoogleAuthProvider ,onAuthStateChanged} from "firebase/auth";
import {getFirestore,collection,addDoc} from "firebase/firestore";
import { getStorage ,ref,uploadBytes} from "firebase/storage";


const FirebaseContext=createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyAk2u2JvwzhxR-kswgbKcTsbxf79SzfOP0",
    authDomain: "book-library-d1049.firebaseapp.com",
    projectId: "book-library-d1049",
    storageBucket: "book-library-d1049.appspot.com",
    messagingSenderId: "576869683758",
    appId: "1:576869683758:web:e896cf534565a0da5185bf"
  };
  const firebaseApp=initializeApp(firebaseConfig);
  const firebaseAuth=getAuth(firebaseApp);
  const googleProvider=new GoogleAuthProvider();
  const firestore=getFirestore(firebaseApp);
  const storage=getStorage(firebaseApp);


 export const useFirebase =()=>useContext(FirebaseContext);

export const FirebaseProvider=(props)=>{
    const[user,setUser]=useState(null);
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,user=>{
            if(user) setUser(user);
            else setUser(null); 
        })
    },[])
      
const signupUser=(email,password)=>{
     createUserWithEmailAndPassword(firebaseAuth,email,password).then(value=>alert("Successfully account created"));

}
const signinUser=(email,password)=>{
    signInWithEmailAndPassword(firebaseAuth,email,password)

}
const signinwithGoogle=()=>
    signInWithPopup(firebaseAuth,googleProvider);

    const handlecreatelisting=async(name,isbn,price,coverPic)=>{
        const imageref=ref(storage,'uploads/images/${Date.now()}-{coverPic.name}');
  const uploadresult=await uploadBytes(imageref,coverPic);
   return await addDoc(collection(firestore,"books"),{
    name,
    isbn,
    price,
    imageURL: uploadresult.ref.fullPath,
  userID:user.uid,
  userEmail :user.displayName,
  photoURL:user.photoURL



  }
  )
}
    const isloggedin=user?true:false;


    return(
        <FirebaseContext.Provider value={{signupUser,signinUser,signinwithGoogle,isloggedin,
        handlecreatelisting}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
