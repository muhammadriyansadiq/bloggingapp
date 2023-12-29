




// ================firebase authentication==============
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
let saveimg = document.querySelector(".saveimg")
let inseertimages = document.querySelector(".inseertimages")
let storeimgurl ="";


// saveimg.addEventListener("click",function(){

  // const input = document.getElementById('fileInput');
  
  // if (input.files && input.files[0]) {
  //     const reader = new FileReader();

  //     reader.onload = function (readerEvent) {
  //         const imageUrl = readerEvent.target.result;

  //         // Save imageUrl to local storage
  //         localStorage.setItem('userImage', imageUrl);


  //         // You can also use imageUrl as needed (e.g., display in UI)
  //         console.log('Image URL:', imageUrl);
  //     };

  //     reader.readAsDataURL(input.files[0]);
  // }
// location.reload()
// })
// storeimgurl = localStorage.getItem('userImage');

// inseertimages.innerHTML = `<img src="${storeimgurl}" alt="Image Preview">`;


// ============signup================
let submit = document.querySelector(".form");
let user;
if(submit){

submit.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("signup");

  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let name = document.querySelector("#name").value;

  console.log(email,password,name);
  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
     user = userCredential.user.uid;
console.log(user);

try {


    const docRef = await addDoc(collection(db, "users"), {
      name:name,
      email: email,
      password: password,
      id:user
    });
    console.log("Document written with ID: ", docRef.id);
window.location.href = "login.html"

  } 
  
  catch (e) {


    console.error("Error adding document: ", e);


  }

  })

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
  });

});
}



// ========signin=================


let insubmit = document.querySelector(".formlogin");
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
    console.log(errorCode,errorMessage);
  });
  
});

}



// ===============home=================

let insertdata =""
let storedUserString;
let storedUserObject;
let lastuser = document.querySelector("#lastuseremail")
storedlastuserdata = localStorage.getItem('lastuseremail');
let blogsalldata = document.querySelector(".blogsalldata")
// console.log('Stored User:', storedlastuserdata);

let putingdata = ""

if(storedlastuserdata){
// console.log("lastuseremail",storedlastuserdata);
  lastuser.innerHTML = `Welcome ${storedlastuserdata}`;
}

else{
  window.location.href = "login.html"
}


let logout = document.querySelector("#logout")
logout.addEventListener("click",function(){

localStorage.removeItem('lastuseremail');

window.location.href = "login.html"


})




let publish = document.querySelector("#blogdataform")

let timenow = new Date()
let time = timenow.toDateString()

// console.log(timenow);
// console.log();

if(publish){
  publish.addEventListener("submit", async function  (event) {
let title = document.querySelector("#title").value
let description = document.querySelector("#description").value
 storeimgurl =  document.querySelector("#fileInput").value
event.preventDefault();
 insertdata =""
let selectlengthoftextarea = 100;

if(description.length < selectlengthoftextarea){

  alert("description is short")
}
else {
// ===imageinsertion functionality===================


  alert("description is good");
console.log(title,description);

// ==================insert img function=============
const input = document.getElementById('fileInput');




// =====insertdata to be saved===================

try {
  const docRef = await addDoc(collection(db, "blogsdata"), {
    title: title,
    description: description,
    times: time,
    img:storeimgurl,
    name:storedlastuserdata
  });

  console.log("Document written with ID: ", docRef.id);

  const washingtonRef = doc(db, "blogsdata",docRef.id );
  //for target unique id
  await updateDoc(washingtonRef, {

   id:docRef.id 
   
  });
location.reload()
} 

catch (e) {
  console.error("Error adding document: ", e);
}



let querySnapshot = await getDocs(collection(db, "blogsdata"));
querySnapshot.forEach((doc) => {
let details = doc.data().description
var firstPart = details.substring(0, 30);
var secondPart = details.substring(30,100);
console.log(firstPart,secondPart);
  // insertdata from database
  insertdata += `<div id = ${doc.data().id} class="blogsinnercartdata">
  <div class="imageanddata">
      <div><img src=${doc.data().img} alt="">
     </div>
      <div class="emailinserted" >
         <p >${doc.data().title}</p>
         <p class="emailinserted">${doc.data().name}</p>
         <p>${doc.data().times}</p>
     </div>
 </div>
 <div class="descriptiondata">${firstPart} <span class="readmoredata">${secondPart}</span> <span class="expanddata">Read more data</span> </div>
 <div class="buttons"><button class="delbtn">Delete</button><button class="editbtn">Edit</button></div>
 </div>`
});
}
blogsalldata.innerHTML = insertdata
  })
}
blogsalldata.addEventListener("click", async function(e){

if(e.target.classList[0] === "expanddata"){

  let idget = e.target.parentNode.parentNode.id
  console.log("ok",idget);// yaha sai continue karna hai

  var parent = e.target.closest(".blogsinnercartdata");
  var readMoreData = parent.querySelector(".readmoredata");
  var expandtoreadmoredata = parent.querySelector(".expanddata");

  let querySnapshot = await getDocs(collection(db, "blogsdata"));
querySnapshot.forEach((doc) => {
if(doc.data().id === idget){



  let userObject = doc.data()
  
  // Convert the object to a JSON string and store it in localStorage
  localStorage.setItem('userblogdescription', JSON.stringify(userObject));
console.log(doc.data());

}
})
window.location.href = "description.html"
}

})
// =====================delete==================

blogsalldata.addEventListener("click", async function(e){

  if(e.target.classList[0] === "delbtn"){
  console.log(e.target);
    let idget = e.target.parentNode.parentNode.id
    console.log("ok",idget);// yaha sai continue karna hai
    let selectedcart =e.target.parentNode.parentNode;
    let text = selectedcart.querySelector(".emailinserted").textContent; 
    let storedlastuserdata = localStorage.getItem('lastuseremail');
    console.log(text,storedlastuserdata);

if(text === storedlastuserdata){
    await deleteDoc(doc(db, "blogsdata",idget ));
// console.log("deleted");
location.reload()
}
else{
  alert("you did not create this post")
}
  }
  
  })



  // =================edit========================

  


  blogsalldata.addEventListener("click", async function(e){

    if(e.target.classList[0] === "editbtn"){

    // console.log(e.target);
      let idget = e.target.parentNode.parentNode.id
      console.log("ok",idget);// yaha sai continue karna hai
let selectedcart =e.target.parentNode.parentNode;
let text = selectedcart.querySelector(".emailinserted").textContent; 
let storedlastuserdata = localStorage.getItem('lastuseremail');

if(text === storedlastuserdata ){

console.log("aayeen");

    let description = prompt("edit your description")
    console.log(description);
let checklengthofdescription = description.length
let selectedlength = 100;

    let img = prompt("edit img url")
    console.log(img);

    let tim = new Date()
    let times = tim.toDateString()
    console.log(times);

    let title = prompt("edit your title")
    console.log(title);



    if(checklengthofdescription < selectedlength){
      alert("description should be atleast 100 characters")
    }
    else{

    
      const frankDocRef = doc(db, "blogsdata", idget);
      await updateDoc(frankDocRef, {
     
        "times": times,
        "age": title,
        "description": description,
        "img":img
        
    });
      location.reload();
  }
  
}

else{
  alert("you did not create this post")
}
  
    }
    
    })









window.onload = async function() {

  let querySnapshot = await getDocs(collection(db, "blogsdata"));
  querySnapshot.forEach((doc) => {
  let details = doc.data().description
  var firstPart = details.substring(0, 30);
  var secondPart = details.substring(30,100);
  // console.log(firstPart,secondPart);
    // insertdata from database
    insertdata += `<div id = ${doc.data().id} class="blogsinnercartdata">
    <div class="imageanddata">
   
   
        <div><img src=${doc.data().img} alt="">
       </div>
        <div class="titlenameanddate">

           <p>${doc.data().title}</p>
         
           <p class="emailinserted">${doc.data().name}</p>  
           <p>${doc.data().times}</p>
       </div>
       
   </div>
   
   <div class="descriptiondata">${firstPart} <span class="readmoredata">${secondPart}</span> <span class="expanddata">Read more data</span> </div>
   <div class="buttons"><button class="delbtn">Delete</button><button class="editbtn">Edit</button></div>
   </div>`
    // console.log(doc.data().title,doc.data().description,doc.data().times,doc.data().name);  
  });

  blogsalldata.innerHTML = insertdata



};


  // ================imageinsert==================
//   let bottom = document.querySelector(".bottom")

//   let a;
//   document.getElementById('fileInput').addEventListener('change', function (e) {

//     const file = e.target.files[0];

//     if (file) {
//         const reader = new FileReader();

//         reader.onload = function (readerEvent) {
//             const imagePreview = document.getElementById('imagePreview');
//             a= readerEvent.target.result
//             // console.log();
//             imagePreview.innerHTML = `<img src="${readerEvent.target.result}" alt="Image Preview">`;
//         };

//         reader.readAsDataURL(file);
//     }
// });

