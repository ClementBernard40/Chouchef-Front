import axios from "axios";
// Créez une instance Axios avec une configuration de base
const axiosInstance = axios.create({
  baseURL: "http://10.120.135.87:3001",
  headers: {
    "Content-Type": "application/json",
  }, // URL de base de votre API
});

// Ajoutez un intercepteur pour ajouter l'en-tête "Authorization" à chaque requête sortante
// axiosInstance.interceptors.request.use(
//   config => {
//     // Récupérez le jeton d'authentification depuis le stockage local ou de session
//     const token = sessionStorage.getItem('authorization'); // Ou localStorage.getItem('token') si vous stockez le token localement
//     // Si un jeton existe, ajoutez-le à l'en-tête "Authorization" de la requête
//     if (token) {
//       config.headers.Authorization = `${token}`;
//     }

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
