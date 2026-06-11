import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "daily-expense-tracker-1e543.firebaseapp.com",
    projectId: "daily-expense-tracker-1e543",
    storageBucket: "daily-expense-tracker-1e543.firebasestorage.app",
    messagingSenderId: "43449985568",
    appId: "1:43449985568:web:b7e267a61d434d7048aa45"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Test Write */
window.testFirebase = async function () {

    try {

        await addDoc(
            collection(db, "expenses"),
            {
                reason: "Test Entry",
                amount: 100,
                received: 500,
                balance: 400,
                bill: "YES",
                createdAt: new Date()
            }
        );

        alert("Firebase Connected Successfully!");

    } catch (error) {

        console.error(error);
        alert("Firebase Connection Failed");
    }
};

/* Load All Entries */
window.loadFirebaseData = async function () {

    const querySnapshot =
        await getDocs(collection(db, "expenses"));

    querySnapshot.forEach(doc => {

        console.log(
            doc.id,
            doc.data()
        );

    });
};