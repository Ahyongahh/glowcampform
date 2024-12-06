import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHQCfMgzg8biego4qFGWKThseoi580L9s",
  authDomain: "glowcampform-5161c.firebaseapp.com",
  projectId: "glowcampform-5161c",
  storageBucket: "glowcampform-5161c.firebasestorage.app",
  messagingSenderId: "567662011896",
  appId: "1:567662011896:web:6cb2de0ff0f63df5ae620d"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();
const colRef = collection(db, 'FormID');

// Function to get the base64-encoded image from the canvas
function getSignatureBase64() {
  const canvas = document.getElementById('signature-pad');
  return canvas.toDataURL(); // Converts the canvas content to a base64-encoded PNG string
}

// Form submission handler
const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Capture form data
  const formData = {
    EnglishName: document.getElementById('english-name').value,
    NOKName: document.getElementById('nok-name').value,
    RStoChild: document.getElementById('rs-to-child').value,
    Signature: getSignatureBase64(),
  };

  try {
    // Add the form data to Firestore
    await addDoc(colRef, formData);

    console.log('Document successfully written!');
    form.reset(); // Reset form fields
    document.getElementById('signature-pad').getContext('2d').clearRect(0, 0, 400, 200); // Clear the canvas

    // Redirect or provide success feedback
    // window.location.href = 'end.html'; // Uncomment this if there's a success page
  } catch (err) {
    console.error('Error adding document: ', err);
  }
});
