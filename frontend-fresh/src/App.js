import React, { Component } from "react";
import UserStore from ".//stores/UserStore.js";
import LoginForm from ".//components/LoginForm.js";
import InputField from "./components/InputField.js";
import SubmitButton from ".//components/SubmitButton.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  async componentDidMount() {
    // Fetch user login status
    try {
      let res = await fetch('/isLoggedIn/', {
        method: 'POST',
        headers: {
          'Accept': "application/json",
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async fetchData() {
    // Fetch data from the API
    try {
      let res = await fetch('http://localhost:5400/api/vans');
      let json = await res.json();

      this.setState({
        isLoaded: true,
        items: json,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ isLoaded: false });
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">Loading please wait</div>
        </div>
      );
    }

    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading</div>;
    }

    return (
      <div className="App">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <p>{item.model}</p>
                <p>{item.make}</p>
                <p>{item.mileage}</p>
                <p>{item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
