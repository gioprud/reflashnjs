// import the function to be tested
export {};
// create a mock implementation for fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
)  as unknown as jest.MockedFunction<typeof fetch>;

describe('createNewAccount', () => {
  it('should create a new account', async () => {
    // set up the DOM elements
    document.body.innerHTML = `
      <input type="text" id="username" value="testuser">
      <input type="password" id="password" value="password123">
      <input type="text" id="firstname" value="Test">
      <input type="text" id="lastname" value="User">
      <input type="email" id="email" value="testuser@example.com">
    `;

    // call the function to be tested
    createNewAccount();

    // assert that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      }),
    });

    // assert that the success message is displayed
    expect(alert);
  });

  it('should display an error message if fields are null', () => {
    // set up the DOM elements with null values
    document.body.innerHTML = `
      <input type="text" id="username" value="">
      <input type="password" id="password" value="">
      <input type="text" id="firstname" value="">
      <input type="text" id="lastname" value="">
      <input type="email" id="email" value="">
    `;

    // call the function to be tested
    createNewAccount();

    // assert that the error message is displayed
    expect(alert);
  });

  it('should display an error message if the email is invalid', () => {
    // set up the DOM elements with an invalid email
    document.body.innerHTML = `
      <input type="text" id="username" value="testuser">
      <input type="password" id="password" value="password123">
      <input type="text" id="firstname" value="Test">
      <input type="text" id="lastname" value="User">
      <input type="email" id="email" value="invalid-email">
    `;

    // call the function to be tested
    createNewAccount();

    // assert that the error message is displayed
    expect(alert);
  });

  it('should display an error message if the password length is invalid', () => {
    // set up the DOM elements with an invalid password
    document.body.innerHTML = `
      <input type="text" id="username" value="testuser">
      <input type="password" id="password" value="password">
      <input type="text" id="firstname" value="Test">
      <input type="text" id="lastname" value="User">
      <input type="email" id="email" value="testuser@example.com">
    `;

    // call the function to be tested
    createNewAccount();

    // assert that the error message is displayed
    expect(alert);
  });

  it('should display an error message if the username is invalid', () => {
    // set up the DOM elements with an invalid username
    document.body.innerHTML = `
      <input type="text" id="username" value="test user">
      <input type="password" id="password" value="password123">
      <input type="text" id="firstname" value="Test">
      <input type="text" id="lastname" value="User">
      <input type="email" id="email" value="testuser@example.com">
    `;
    // call the function to be tested
    createNewAccount();

    // assert that the error message is displayed
    expect(alert);
  });
  
});


function createNewAccount() {
  
  let flag = true;

  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const firstNameInput = document.getElementById("firstname") as HTMLInputElement;
  const lastNameInput = document.getElementById("lastname") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;

  const username = usernameInput.value;
  const password = passwordInput.value;
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;

  if (username == null || password == null || firstName == null || lastName == null || email == null) {
    console.log("One or more fields are null");
    alert("One or more fields are null");
    flag = false;
    return false;
  }

  if (email == null || email == "" || email.indexOf("@") == -1 || email.indexOf(".") == -1) {
    console.log("Invalid email address");
    alert("Invalid email address");
    flag = false;
  }

  if (password.length < 7 || password.length > 20) {
    console.log("Password must be between 7 and 20 characters");
    alert("Password must be between 7 and 20 characters");
    flag = false;
  }



  console.log("username: " + username);
  console.log("password: " + password);
  console.log("firstName: " + firstName);
  console.log("lastName: " + lastName);
  console.log("email: " + email);



  if (flag == true) {
    //sends data to the backend
    const url = "/api/user/register";
    const data = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert("Account created successfully");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error creating account");
      });
  }
}

