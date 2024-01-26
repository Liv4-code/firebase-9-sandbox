import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    getDoc,
    updateDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";

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

// queries
const q = query(colRef, orderBy("createdAt"));

// realtime data collection
onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
});

// adding docs

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp(),
    }).then(() => {
        addBookForm.reset();
    });
});

// deleting docs

const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, "books", deleteBookForm.id.value);

    deleteDoc(docRef).then(() => {
        deleteBookForm.reset();
    });
});

// get single doc
const docRef = doc(db, "books", "6LN7BnntsGCLBLSAu8PF");

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id);
});

// update documents
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, "books", updateForm.id.value);
    updateDoc(docRef, {
        title: "updated title",
    })
        .then((doc) => {
            updateForm.reset();
        })
        .catch((err) => {
            console.log(err);
        });
});
