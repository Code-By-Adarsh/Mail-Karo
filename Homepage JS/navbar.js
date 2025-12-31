/*******************************
 * NAVBAR UI / MOBILE MENU
 *******************************/
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const navbar = document.querySelector(".navbar");

  // Toggle mobile menu
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const bars = menuBtn.querySelectorAll(".bar");
    bars[0].classList.toggle("rotate1");
    bars[1].classList.toggle("fade");
    bars[2].classList.toggle("rotate2");
  });

  // Scroll shrink effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.style.background = "var(--bg)";
      navbar.style.backdropFilter = "blur(8px)";
      navbar.style.padding = "12px 40px";
    } else {
      navbar.style.background = "var(--bg)";
      navbar.style.padding = "18px 40px";
    }
  });
});

// Hamburger animation styles
const style = document.createElement("style");
style.innerHTML = `
.bar.rotate1 { transform: translateY(7px) rotate(45deg); background-color: var(--accent); }
.bar.rotate2 { transform: translateY(-7px) rotate(-45deg); background-color: var(--accent); }
.bar.fade { opacity: 0; }
`;
document.head.appendChild(style);


/*******************************
 * GOOGLE LOGIN / PROFILE TOGGLE
 *******************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// ⚠️ paste YOUR Firebase config here
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiFaLUQ8kGmpk6ePwwa-a_sslNTNbQd6A",
  authDomain: "mail-karo-auth.firebaseapp.com",
  projectId: "mail-karo-auth",
  storageBucket: "mail-karo-auth.firebasestorage.app",
  messagingSenderId: "568465528566",
  appId: "1:568465528566:web:9c2b2757b6958ba98abed7",
  measurementId: "G-87MESWT37B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// elements
const loginBtn = document.getElementById("loginBtn");
const userProfileImg = document.getElementById("userProfileImg");

/*******************************
 * LOGIN BUTTON CLICK
 *******************************/
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Login OK:", result.user.displayName);
      })
      .catch((err) => console.log("Login error:", err));
  });
}

/*******************************
 * LOGOUT (future)
 *******************************/
window.logoutUser = function () {
  signOut(auth).then(() => console.log("Logged out"));
};

/*******************************
 * UI STATE CONTROL
 *******************************/
onAuthStateChanged(auth, (user) => {
  if (user) {
    // logged in
    loginBtn?.classList.add("hidden");
    userProfileImg.src = user.photoURL;
    userProfileImg.classList.remove("hidden");
  } else {
    // logged out
    loginBtn?.classList.remove("hidden");
    userProfileImg.classList.add("hidden");
  }

  /*******************************
 * PROFILE DROPDOWN + LOGOUT
 *******************************/
const dropdown = document.getElementById("userDropdown");
const logoutBtn = document.getElementById("logoutBtn");
const userNameHolder = document.getElementById("userName");

// toggle dropdown on profile click
userProfileImg?.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// click outside to close dropdown
document.addEventListener("click", e => {
  if (!dropdown.contains(e.target) && e.target !== userProfileImg) {
    dropdown.classList.add("hidden");
  }
});

// logout button action
logoutBtn?.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("Logged out");
    dropdown.classList.add("hidden");
  });
});

// show username when logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    userNameHolder.textContent = user.displayName;
  }
});

});
