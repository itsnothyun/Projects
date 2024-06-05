document.getElementById('login-btn').addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('logemail').value;
  const password = document.getElementById('logpass').value;

  const response = await fetch('login.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });

  if (response.ok) {
      window.location.href = 'index.html';
  } else {
      alert('Login failed. Please check your credentials.');
  }
});

document.getElementById('signup-btn').addEventListener('click', async (e) => {
  e.preventDefault();
  const name = document.getElementById('logname').value;
  const email = document.getElementById('regemail').value;
  const password = document.getElementById('regpass').value;

  const response = await fetch('signup.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
  });

  if (response.ok) {
      alert('Signup successful. Please log in.');
      document.getElementById('reg-log').checked = false;
  } else {
      alert('Signup failed. Please try again.');
  }
});
