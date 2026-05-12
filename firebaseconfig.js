// firebase-config.js
// Importation des modules Firebase nécessaires
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
 
// Ta configuration personnelle (récupérée à l'étape 5)
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "portfolio-awa-diop.firebaseapp.com",
    projectId: "portfolio-awa-diop",
    storageBucket: "portfolio-awa-diop.appspot.com",
 messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};
 
// Initialiser Firebase
const app = initializeApp(firebaseConfig);
 
// Récupérer une référence à la base Firestore
export const db = getFirestore(app);
