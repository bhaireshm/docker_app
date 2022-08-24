import React, { useState } from "react";
import "./index.css";

function App() {
  const [resdata, setResdata] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const uname = event?.target[0]?.value;
    const pass = event?.target[1]?.value;
    // console.log({ uname, pass });

    if (uname && pass) {
      const requestOptions = {
        method: 'POST',
        headers: new Headers().append("Content-Type", "application/json"),
        body: JSON.stringify({
          "userName": uname,
          "password": pass
        }),
        // redirect: 'follow'
      };

      fetch("http://3.214.111.56:4000/login", requestOptions)
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(result => {
          if (result) setResdata(result)
          console.log(result)
        })
        .catch(error => console.log('error', error));
    };
  }

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {resdata ?
          resdata.error ? <div className="error">{resdata.error}</div>
            : <div className="success">{resdata.message}</div>
          : renderForm}
      </div>
    </div>
  );
}

export default App;