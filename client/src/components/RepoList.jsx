import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    { props.repos.map ( repo => (
      <div>
       <a href={repo.url}>{repo.repoName}</a>
      </div>
    ))}
  </div>
)

export default RepoList;
