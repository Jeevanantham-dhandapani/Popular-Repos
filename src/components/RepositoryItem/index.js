import './index.css'

const RepositoryItem = props => {
  const {repoData} = props
  const {avatarUrl, name, issuesCount, forksCount, starsCount} = repoData

  return (
    <li className="list-repo-card">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="repo-name-heading">{name}</h1>
      <div className="text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="text-icons"
        />
        <p className="counts">{starsCount} stars</p>
      </div>
      <div className="text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="text-icons"
        />
        <p className="counts">{forksCount} forks</p>
      </div>
      <div className="text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="text-icons"
        />
        <p className="counts">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
