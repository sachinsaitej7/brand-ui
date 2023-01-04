// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";
import { getStorage, connectStorageEmulator } from "firebase/storage";

import {
  getFirestore,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence,
} from "firebase/firestore";

import {
  getAuth,
  connectAuthEmulator,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

import config from "./config";

function connectToEmulators({ app, auth, db, storage, appCheck }) {
  if (process.env.NODE_ENV === "development") {
    console.log("Connecting to emulators");
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(db, "localhost", 8080);
    connectStorageEmulator(storage, "localhost", 9199);
  }
  return { app, auth, db, storage, appCheck };
}

function enableOffline({ db, app, auth, storage, appCheck }) {
  enableMultiTabIndexedDbPersistence(db);
  return { db, app, auth, storage, appCheck };
}

window.FIREBASE_APPCHECK_DEBUG_TOKEN =
  process.env.NODE_ENV === "development" ? true : false;

const appCheckConfig = {
  provider: new ReCaptchaV3Provider("6LcfyswjAAAAAADeNjYPVGqhRE3O0XYIHtOmtHAF"),
  isTokenAutoRefreshEnabled: true,
};

// app-check
function initializeAppCheckApp(app) {
  const appCheck = initializeAppCheck(app, appCheckConfig);
  return appCheck;
}

// Initialize Firebase
export function initialize() {
  const app = initializeApp(config.firebase);
  const appCheck = initializeAppCheckApp(app);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app, "gs://clock-poc-11334.appspot.com");

  (async () => {
    await setPersistence(auth, browserLocalPersistence);
  })();

  return {
    app,
    analytics,
    db,
    auth,
    storage,
    appCheck,
  };
}

export function getFirebase() {
  const existingApp = getApps()?.at(0);
  if (existingApp) return initialize();
  const services = connectToEmulators(initialize());
  return enableOffline(services);
}
