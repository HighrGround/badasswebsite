import React, { Component } from 'react';
import AuthContext from '../context/AuthContext';

class PromptInput extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      prompt: "",
    };
  }

  async sendPrompt() {
    try {
      const { authTokens } = this.context;
      const res = await fetch('http://localhost:8000/api/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
          'text': this.state.prompt // Add the prompt value to the headers
        }
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











const HomePage = () => {
    //let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(()=> {
        //getNotes()
    }, [])


let sendPrompt = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/generate/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({ prompt: this.state.prompt })
    });

    let data = await response.json();

    if(response.status === 200){
        console.log(data);
    }else if(response.status === 401){
        logoutUser();
    }
}


    return (
              <div>
                <input
                  type="text"
                  placeholder="type a message"
                  
                />
                
                <button onClick={sendPrompt}>Submit</button>
              </div>
            );
          }
        
//<button onClick={() => this.sendPrompt()}>Submit</button>
//onChange={(e) => this.setState({ prompt: e.target.value })}

export default HomePage
*/