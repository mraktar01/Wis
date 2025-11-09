const REAL_PASSWORD = process.env.SITE_PASSWORD;

exports.handler = async (event) => {
  
  const { password } = JSON.parse(event.body);

  if (password === REAL_PASSWORD) {
    // Correct: Send success and a cookie
    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'is-logged-in=true; Path=/; HttpOnly; Max-Age=3600',
      },
      body: JSON.stringify({ message: 'Login successful' }),
    };
  } else {
    // Wrong: Send error
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid password' }),
    };
  }
};