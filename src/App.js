import React, {Component} from 'react';
import './App.css';

const emailRegex= RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^-{|}~`_']+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid = ({formErrors, ...rest}) => {
  let valid= true;
  Object.values(formErrors).forEach(val => {
      val.length>0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
      val===null && (valid = false);
    });
  return valid;
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    if(formValid(this.state)){
      console.log(`
        --SUBMITING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `)
    } else {
      console.log('FORM INVALID - DISPLAY ERROR MESSAGE');
    }
  }

  handleChange = e => {
    e.preventDefault();
    const {name, value}=e.target;
    let formErrors= {...this.state.formErrors};
    

    switch(name){
      case "firstName":
        formErrors.firstName=
          value.length<3 ? "minimum 3 characters required" : "";
        break;
      case "lastName":
        formErrors.lastName=
          value.length<3 ? "minimum 3 characters required" : "";
        break;
      case "email":
        formErrors.email= emailRegex.test(value)
          ? "" 
          : "Invalid Email Address";
        break;
      case "password":
        formErrors.password=
          value.length< 6 ? "minimum 6 characters required" : "";
        break;
      default:
        break;
    }
    this.setState({formErrors,[name]:value}, () => console.log(this.state));
  };

  handleInputChange = (e)=> {
    e.preventDefault();
    this.setState({
      [e.target.name]: null
    })
  }
  render() { 
    const {formErrors} = this.state;
    return ( 
      <React.Fragment>
      <div className="wrapper">
        <div className="form-wrapper"> 
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input type="text" 
                noValidate
                name="firstName"
                placeholder="First Name"
                className={formErrors.firstName.length>0 ? "error" : null}
                onChange= {this.handleChange}
              />
              {formErrors.firstName.length>0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" 
                noValidate
                name="lastName"
                placeholder="Last Name"
                className={formErrors.lastName.length > 0 ? "error" : null}
                onChange= {this.handleChange}
              />
              {formErrors.lastName.length>0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input type="email" 
                noValidate
                name="email"
                placeholder="Email"
                className={formErrors.email.length > 0 ? "error" : null}
                onChange= {this.handleChange}
              />
              {formErrors.email.length>0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" 
                noValidate
                name="password"
                placeholder="Password"
                className={formErrors.password.length > 0 ? "error" : null}
                onChange= {this.handleChange}
              />
              {formErrors.password.length>0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account</small>
              <button type="reset" >Reset </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
     );
  }
}
export default App;
