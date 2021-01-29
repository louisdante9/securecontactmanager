import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SigninRequest } from "../../actions";
import swal from "sweetalert";

import { validateInput } from "../../utils/Validator";
const Signin = (props) => {
  const [password, setPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    password.trim() ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [password]);

  const onSubmit = (event) => {
    event.preventDefault();
    const { errors } = validateInput({ password });
    if (errors.password) {
      let errorMessage = { icon: "warning" };
      errorMessage.title = errors.invalidEmail;
      swal(errorMessage);
    }

    let obj = { password };
    props
      .SigninRequest(obj)
      .then(() => {
        props.history.push("/dashboard");
      })
      .catch((err) => {
        swal({
          title: "Oops!, sorry password is wrong",
          icon: "warning",
        });
        return err;
      });
  };
  return (
    <>
      <div className="container">
        <div className="home-intro"></div>
        <div className="auth-section">
          <form>
            <div>
              <h2>Welcome to Secret Service</h2>
              <h3>signin</h3>
            </div>
           
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button onClick={onSubmit} disabled={btnDisabled}>
                Get Started
              </button>
            </div>
            <div>
              <p>
                dont have an account <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default connect(null, { SigninRequest })(withRouter(Signin));
