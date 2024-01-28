import admin, { AppOptions } from "firebase-admin";
import * as dotenv from "dotenv";
import * as _ from "lodash";

dotenv.config({ path: '../.env' });

const firebaseConfig: AppOptions = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  })
};

export const authAdminClient = admin.apps.length ? admin.app().auth() : admin.initializeApp(firebaseConfig).auth();