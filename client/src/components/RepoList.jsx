import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    { props.repos.map ( repo => (
      <div key={repo.repoId} className='repos'>
        <a className ='repoNames' href={repo.url}>{repo.repoName}</a>
        <div className='users'>{repo.ownerName}</div>
      </div>
    ))}
  </div>
)

export default RepoList;
