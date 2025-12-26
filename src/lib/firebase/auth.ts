import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInAnonymously,
  type User,
  type ConfirmationResult,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './client';
import type { SignUpData, UserProfile } from '../types';

export async function signUp(data: SignUpData): Promise<void> {
  const { email, password, name, mobile, classLevel, gender, userType } = data;

  const userCredential = await createUserWithEmailAndPassword(auth, email, password!);
  const user = userCredential.user;

  await sendEmailVerification(user);

  const profileData: UserProfile = {
    uid: user.uid,
    email: user.email!,
    name,
    userType,
  };

  if (mobile) profileData.mobile = mobile;

  if (userType === 'student') {
    profileData.classLevel = classLevel;
    profileData.gender = gender;
  }

  await setDoc(doc(db, 'users', user.uid), profileData);

  await signOut(auth);
}

export async function signIn(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  if (!userCredential.user.emailVerified) {
    await signOut(auth);
    throw new Error(
      "Please verify your email before logging in. A verification link was sent to your inbox. Don't forget to check the spam folder!"
    );
  }

  return userCredential.user;
}

export function logOut(): Promise<void> {
  return signOut(auth);
}

export function onAuthStateChangeWrapper(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  } else {
    return null;
  }
}

export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  await setDoc(doc(db, 'users', userId), data, { merge: true });
}

export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

// --- Phone Auth ---

export function setupRecaptcha(elementId: string): RecaptchaVerifier {
  return new RecaptchaVerifier(auth, elementId, {
    size: 'invisible',
  });
}

export async function startPhoneLogin(
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> {
  return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
}

export async function completePhoneLogin(
  confirmationResult: ConfirmationResult,
  otp: string
): Promise<User> {
  const result = await confirmationResult.confirm(otp);
  return result.user;
}

// --- Google Auth (NOW ANONYMOUS) 🔥

export async function signInWithGoogle(): Promise<User> {
  const result = await signInAnonymously(auth);
  return result.user;
}
