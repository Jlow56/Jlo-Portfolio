function Login() {
  return (
    <form action="" method="post" className="admin-login-form">
      <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" required autoFocus />
      <input type="password" name="password" id="password" placeholder="Mot de passe" required />
      <button type="submit" className="btn-log-admin"> Se connecter </button>
    </form>
  );
}

export default Login;