import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { Skill } from "@/types/skill";

const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

export default defineEventHandler(async (event) => {
  const db = getFirestore();
  const skillsSnap = await db
    .collection("skills")
    .doc(event.context.params.id)
    .get();

  const skillsData = {
    id: skillsSnap.id,
    ...skillsSnap.data(),
  };

  return skillsData as Skill;
});
