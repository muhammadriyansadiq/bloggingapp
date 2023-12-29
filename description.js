import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword ,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore ,collection, addDoc, getDocs,updateDoc,doc,deleteDoc  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAokpY_Z2LDTRTGzdejAWHsshRWYUCsFGQ",
    authDomain: "blogginwebapp.firebaseapp.com",
    projectId: "blogginwebapp",
    storageBucket: "blogginwebapp.appspot.com",
    messagingSenderId: "1070508450799",
    appId: "1:1070508450799:web:5dc1a5a63906ac20eb8c1a"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);





let storedlastuserdata;
let descriptionboxofblogs = document.querySelector(".descriptionboxofblogs")
let storedUserString;
let putingdata;
let storedUserObject;
let lastperson = document.querySelector(".lastperson")
storedUserString = localStorage.getItem('userblogdescription');
if(storedUserString){
    storedlastuserdata = localStorage.getItem('lastuseremail');

  lastperson.innerHTML = `${storedlastuserdata}`

  storedUserObject = JSON.parse(storedUserString);
  console.log(storedUserObject);

  putingdata = 

    `<div id=${storedUserObject.id} class="left">
    <p>${storedUserObject.title}</p>
     <p>${storedUserObject.description}</p> 
     </div>
     <div class="right"><img src="${storedUserObject.img}" alt=""><p>${storedlastuserdata}</p><p>${storedUserObject.times}</p></div>`



  descriptionboxofblogs.innerHTML = putingdata
}








