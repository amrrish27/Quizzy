import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAJSPHlIv5JWDqpyr3dCGTMjgJpb1rhApk",
  authDomain: "quizzy-dc584.firebaseapp.com",
  projectId: "quizzy-dc584",
  storageBucket: "quizzy-dc584.firebasestorage.app",
  messagingSenderId: "163939538200",
  appId: "1:163939538200:web:7ba1703f08baec0dd67a6d",
  measurementId: "G-N2ZD9F59G4",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const googleProvider =
  new GoogleAuthProvider()