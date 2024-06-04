/*import React, { Component } from "react";

class PromptInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: "",
    };
  }

  async sendPrompt() {
    try {
      const res = await fetch('http://localhost:8000/api/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: this.state.prompt })
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      console.log('Response:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="type a message"
          onChange={(e) => this.setState({ prompt: e.target.value })}
        />
        <button onClick={() => this.sendPrompt()}>Submit</button>
      </div>
    );
  }
}

export default PromptInput;
/*
STATICFILES_DIRS = [
  os.path.join(BASE_DIR, '/Users/nathancassells/Documents/Code/JSweb/fullapp/frontend/build/static' ),
]
*/