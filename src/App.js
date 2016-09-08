import React, { Component } from 'react';
import AceEditor from 'react-ace';
import ReplitClient from 'replit-client';
import $ from 'jquery';

import 'brace/mode/python';
import 'brace/theme/github';
import './App.css';

const LANGUAGE = 'python';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: "#Type your code in here, and press RUN",
	  stdout: ""
    };
    $.get('https://nampnq.ribi.io/repl/token').then(function(data){
      this.repl = new ReplitClient('api.repl.it', 80, LANGUAGE, data);
      this.repl.connect().then(
        function() { console.log('connected'); },
        function() { console.log('failed to connect'); }
      );
    }.bind(this));
  }

  excuteCode(){
    this.repl.evaluate(this.state.code, {stdout: (out)=>this.setState({'stdout': this.state.stdout + "\n $ " + out})}).then(function(result) {
       console.log('error', result.error);
       console.log('result', result.data);
    });
  }

  onCodeChange(newValue){
    this.setState({'code': newValue});
  }

  render() {
    return (
      <div className="repl">
        <div className="replEditor">
            <button onClick={this.excuteCode.bind(this)}>Run </button>

            <AceEditor
                mode={LANGUAGE}
                theme="github"
                value={this.state.code}
				onChange={this.onCodeChange.bind(this)}
                editorProps={{$blockScrolling: true}}
            />
        </div>
        <div className="replResult">
            <span>Your code result:</span>
            <pre>{this.state.stdout}</pre>
        </div>
      </div>
    );
  }
}

export default App;
