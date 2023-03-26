import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { Attribute } from "@/types/attribute";

const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export default defineEventHandler(async (event) => {
  const db = getFirestore();
  const attributesSnap = await db.collection("attributes").get();
  const attributesData = attributesSnap.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }) as Attribute[];

  return attributesData.sort((a, b) => a.name.localeCompare(b.name));
});