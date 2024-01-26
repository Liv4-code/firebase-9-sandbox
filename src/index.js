import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD2xO_a0xxYENTLq819Fi415wq3a-wyN3Q",
    authDomain: "fb9-sandbox-45f04.firebaseapp.com",
    projectId: "fb9-sandbox-45f04",
    storageBucket: "fb9-sandbox-45f04.appspot.com",
    messagingSenderId: "941676082360",
    appId: "1:941676082360:web:a4bf2d005950dc3ae6704d",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
        });

        console.log(books);
    })
    .catch((err) => console.log(err.message));
