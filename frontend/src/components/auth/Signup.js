import { useState, useEffect } from "react";
import HttpStatus from "http-status-codes";
import swal from "sweetalert";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { validateInput } from "../../utils/Validator";
import { SignupRequest } from "../../actions";

const Signup = (props) => {
  
  const [password, setPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [helperTexts, setHelperTexts] = useState([]);

  useEffect(() => {
    password.trim() ? setBtnDisabled(false) : setBtnDisabled(true);
   
  }, [ password]);

  const onSubmit = (event) => {
    event.preventDefault();
      const fields = {
        password,
      };
      const { errors, isValid } = validateInput(fields);

      if (isValid) {
        props.SignupRequest(fields, (res) => {
          if (res && res.status === HttpStatus.CREATED) {
            swal({
              title: "Welcome to contact book!",
              text: "Your account has been created successfully!",
              icon: "success",
              button: "Continue",
            });
            return props.history.push("/dashboard");
          } 
        })
      } else {
        setError(true);
        setHelperTexts(Object.values(errors));
      }
  };
  return (
    <>
      <div className="container">
        <div className="home-intro"></div>
        <div className="auth-section">
          <form>
            <div>
              <h2>Welcome to Secret Service</h2>
              <h3>signup</h3>
            </div>
        
            <div className="form-control">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div>
              <button onClick={onSubmit} disabled={btnDisabled}>
                Sign Up
              </button>
            </div>
          
            <div>
              <ul>
                {error
                  ? helperTexts.map((text) => (
                      <li style={{ color: "red" }}>{text}</li>
                    ))
                  : ""}
              </ul>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default connect(null, { SignupRequest })(withRouter(Signup));
