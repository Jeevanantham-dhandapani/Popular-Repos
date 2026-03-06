import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getReposDetails()
  }

  updateActiveLanguageId = activeLanguageId => {
    this.setState({activeLanguageId}, this.getReposDetails)
  }

  getReposDetails = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachData => ({
        name: eachData.name,
        id: eachData.id,
        issuesCount: eachData.issues_count,
        forksCount: eachData.forks_count,
        starsCount: eachData.stars_count,
        avatarUrl: eachData.avatar_url,
      }))

      this.setState({
        reposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderedError = () => (
    <li className="err-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="err-heading">Something Went Wrong</h1>
    </li>
  )

  renderedReposItem = () => {
    const {reposList} = this.state

    return reposList.map(eachRepo => (
      <RepositoryItem key={eachRepo.id} repoData={eachRepo} />
    ))
  }

  renderedRepos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
      case apiStatusConstants.success:
        return this.renderedReposItem()
      case apiStatusConstants.failure:
        return this.renderedError()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="main-bg">
        <h1 className="heading">Popular</h1>
        <ul className="btns-container">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              key={eachData.id}
              languageData={eachData}
              updateActiveLanguageId={this.updateActiveLanguageId}
              activeLanguageId={activeLanguageId}
            />
          ))}
        </ul>
        <ul className="repos-container">{this.renderedRepos()}</ul>
      </div>
    )
  }
}

export default GithubPopularRepos
