// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0PNoet5VYlzGmq9hFUAOlmeZJE-L_SmQ",
  authDomain: "newproject-4dcf2.firebaseapp.com",
  projectId: "newproject-4dcf2",
  storageBucket: "newproject-4dcf2.appspot.com",
  messagingSenderId: "15138848134",
  appId: "1:15138848134:web:118a7aa1458e237f030007",
  measurementId: "G-93NELRG7RE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get elements
const signupEmail = document.getElementById('signup_email');
const signupPassword = document.getElementById('signup_password');
const signupBtn = document.getElementById('signup_btn');

const signinEmail = document.getElementById('signin_email');
const signinPassword = document.getElementById('signin_password');
const signinBtn = document.getElementById('signin_btn');

const authContainer = document.getElementById('auth_container');
const infoContainer = document.getElementById('info_container');
const userEmail = document.getElementById('user_email');
const logoutBtn = document.getElementById('logout_btn');
const infoForm = document.getElementById('info_form');
const infoDisplay = document.getElementById('info_display');

// Event listeners
signupBtn.addEventListener('click', createUserAccount);
signinBtn.addEventListener('click', signIn);
logoutBtn.addEventListener('click', logOut);

// Auth state change listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in");
    authContainer.style.display = "none";
    infoContainer.style.display = "block";
    userEmail.innerText = user.email;
  } else {
    console.log("User is not logged in");
    authContainer.style.display = "block";
    infoContainer.style.display = "none";
  }
});

// Functions
function createUserAccount() {
  createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed up:', user);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function signIn() {
  signInWithEmailAndPassword(auth, signinEmail.value, signinPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function logOut() {
  signOut(auth).then(() => {
    console.log("User signed out");
  }).catch((error) => {
    alert(error.message);
  });
}

infoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const fullName = document.getElementById('full_name').value;
  const address = document.getElementById('address').value;
  const phoneNumber = document.getElementById('phone_number').value;
  const yourImage = document.getElementById('your_image').files[0];
  
  const reader = new FileReader();
  reader.onload = function(event) {
    const imageUrl = event.target.result;
    displayInfo(fullName, address, phoneNumber, imageUrl);
  };
  reader.readAsDataURL(yourImage);
  
  // Reset form
  infoForm.reset();
});

function displayInfo(name, address, phone, imageUrl) {
  const infoCard = document.createElement('div');
  infoCard.classList.add('info_card');
  
  infoCard.innerHTML = `
    <img src="${imageUrl}" alt="${name}">
    <div>
      <h4>${name}</h4>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Phone:</strong> ${phone}</p>
    </div>
  `;
  
  infoDisplay.appendChild(infoCard);
}
