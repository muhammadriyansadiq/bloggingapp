import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword ,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore ,collection, addDoc, getDocs,updateDoc,doc,deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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








let insubmit = document.querySelector(".formlogin");
let gotosignup = document.querySelector(".gotosignup")
let storedlastuserdata;
if(insubmit){
insubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("signin");
  let email = document.querySelector("#emaillogin").value;
  let password = document.querySelector("#passwordlogin").value;


  console.log(email);
  console.log(password);


  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const userr = userCredential.user;
    console.log(userr);


    onAuthStateChanged(auth, (userr) => {
        if (userr) {

          const uid = userr.email;
          console.log(`las user id`,uid);
          let  lastuseremail = uid;

localStorage.setItem('lastuseremail',lastuseremail );
          console.log(userr);
          window.location.href = "home.html"

        } 
       
      });

  })

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode,errorMessage,"sign up first");
  });
  
});

}


gotosignup.addEventListener("click",function(){
  window.location.href = "index.html"
})