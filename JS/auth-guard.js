if (localStorage.getItem("loggedIn") !== "true") {
  location.href = "login.html?redirect=" + encodeURIComponent(location.href.split("/").pop());
}