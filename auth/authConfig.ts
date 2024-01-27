import admin from "firebase-admin";
import * as dotenv from "dotenv";
import * as _ from "lodash";

dotenv.config({ path: '../.env' });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "brello-79fe4.firebaseapp.com",
  projectId: "brello-79fe4",
  storageBucket: "brello-79fe4.appspot.com",
  messagingSenderId: "349529458075",
  appId: "1:349529458075:web:f7fcbafb6b2cbb33e2cd3e",
  serviceAccount: "firebase-adminsdk-jolw9@brello-79fe4.iam.gserviceaccount.com"
};


const firebaseApp = _.once(() => admin.initializeApp(firebaseConfig, 'brello'));
export const authAdminClient = _.once(() => firebaseApp().auth());