// **************** GESTION DE CONNECTION *************//

// Ici j'ai développé un système de gestion de connexion. Les utilisateurs peuvent se connecter
// avec leur e-mail et mot de passe. Le code interagit avec l'API du serveur pour vérifier
// les informations d'identification et gérer les erreurs. En cas de succès, l'utilisateur est redirigé
// vers la page d'accueil et un token d'authentification est stocké, et en cas d'erreur un message
// indiquant la cause est affiché.

const form = document.querySelector("#form");
const errorMessage = document.querySelector("#error-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error("Utilisateur non trouvé.");
      } else if (response.status === 401) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
      } else {
        throw new Error("Une erreur s'est produite lors de la connexion.");
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      errorMessage.innerText = error.message;
    });
});
