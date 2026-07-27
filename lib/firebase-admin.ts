import 'server-only';

import {
  cert,
  getApp,
  getApps,
  initializeApp
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  ?.replace(/["',]/g, '')
  .trim();
console.log(
  "Firebase project ID:",
  JSON.stringify(process.env.FIREBASE_ADMIN_PROJECT_ID)
);
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
  /\\n/g,
  '\n'
);
console.log('Admin projectId raw:', JSON.stringify(projectId));
console.log("Admin projectId:", projectId);

if (!projectId || !clientEmail || !privateKey) {
  throw new Error('Missing Firebase Admin environment variables');
}

const adminApp = getApps().length
  ? getApp()
  : initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey
      }),
      projectId,
    });
console.log(adminApp.options.projectId)

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);