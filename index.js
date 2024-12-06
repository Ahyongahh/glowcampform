import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs,
  addDoc
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAHQCfMgzg8biego4qFGWKThseoi580L9s",
  authDomain: "glowcampform-5161c.firebaseapp.com",
  projectId: "glowcampform-5161c",
  storageBucket: "glowcampform-5161c.firebasestorage.app",
  messagingSenderId: "567662011896",
  appId: "1:567662011896:web:6cb2de0ff0f63df5ae620d"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'FormID')

// Function to get the base64-encoded image from the canvas
function getSignatureBase64() {
  const canvas = document.getElementById('signatureCanvas');
  return canvas.toDataURL(); // Converts the canvas content to a base64-encoded PNG string
}

// Adding docs to Firestore
const addDetailsForm = document.querySelector('.add');
addDetailsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Create the formData object and capture the form input values
  const formData = {
    EnglishName: document.getElementById('EnglishName').value,
    ChineseName: document.getElementById('ChineseName').value,
    NRIC: document.getElementById('NRIC').value,
    Address: document.getElementById('Address').value,
    Unit: document.getElementById('Unit').value,
    Postal: parseInt(document.getElementById('Postal').value, 10),
    Birthdate: new Date(document.getElementById('Birthdate').value),
    Child: document.getElementById('Child').value,
    signature: getSignatureBase64(), // Get base64 string from canvas
    Allergies: document.getElementById('Allergies').value,
    PTFT: document.getElementById('PTFT').value,
    When: document.getElementById('When').value,
    NOKName: document.getElementById('NOKName').value,
    NOKNumber: parseInt(document.getElementById('NOKNumber').value, 10),
    Whatudoing: document.getElementById('Whatudoing').value,
    RStoChild: document.getElementById('RStoChild').value,
  };


  // Add the formData to Firestore
  addDoc(colRef, formData)
    .then(() => {
      console.log("Document successfully written!");

      addDetailsForm.reset(); // Reset the form after successful submission
      clearCanvas(); // Clear the canvas after submission

      // Redirect to end.html
    //  window.location.href = 'end.html';
    })
    .catch((err) => {
      console.error("Error adding document: ", err);
    });
});


