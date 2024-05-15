import React, { Component } from "react";
import { observer } from 'mobx-react';
import UserStore from ".//stores/UserStore";
import LoginForm from ".//components/LoginForm";
import SubmitButton from ".//components/SubmitButton";


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

    // Fetch data from the API
    this.fetchData();
  }

  async fetchData() {
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

  async doLogout() {
    try {
      let res = await fetch('/logout/', {
        method: 'POST',
        headers: {
          'Accept': "application/json",
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">
            Loading please wait
          </div>
        </div>
      );
    }

    if (UserStore.isLoggedIn) {
      return (
        <div className="app">
          <div className="container">
            Welcome {UserStore.username}
            <SubmitButton text={'LogOut'} disabled={false} onClick={() => this.doLogout()} />
            {this.renderVanList()}
          </div>
        </div>
      );
    }

    return (
      <div className="app">
        <div className="container">
        <SubmitButton text={'LogOut'} disabled={false} onClick={() => this.doLogout()} />
          <LoginForm />

        </div>
      </div>
    );
  }

  renderVanList() {
    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading</div>;
    }

    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>
              working
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
