import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount () {
    this.getRepos();
  }

  search (term) {
    const app = this;

    $.post({
      url: 'http://localhost:1128/repos',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify({
        'user': term,
      }),
      success: data => {
        app.getRepos();
      }, 
      error: data => {
        console.log('post error!', data);
      }
    });

  }

  getRepos () {
    const app = this;

    $.get({
      url: 'http://localhost:1128/repos',
      headers: {
        'content-type': 'application/json'
      },
      success: data => {
        app.setState({repos : JSON.parse(data)});
      },
      error: data => {
        console.log('get error!', data)
      }
    });

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
