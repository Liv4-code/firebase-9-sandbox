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
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
} from "firebase/auth";

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
const auth = getAuth();

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

// signing users up
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log("user created:", cred.user);
            signupForm.reset();
        })
        .catch((err) => {
            console.log(err.message);
        });
});

// logging in and out
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("user signed out");
        })
        .catch((err) => {
            console.log(err.message);
        });
});

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log("user logged in:", cred.user);
            loginForm.reset();
        })
        .catch((err) => {
            console.log(err.message);
        });
});
