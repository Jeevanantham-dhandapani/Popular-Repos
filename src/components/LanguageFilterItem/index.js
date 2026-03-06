import './index.css'

const LanguageFilterItem = props => {
  const {languageData, updateActiveLanguageId, activeLanguageId} = props
  const {language, id} = languageData

  const onClickChangeActiveLanguageId = () => {
    updateActiveLanguageId(id)
  }

  const isActive = activeLanguageId === id
  const activeBtnStyle = isActive ? 'active-btn' : ''

  return (
    <li className="btn-list">
      <button
        type="button"
        className={`list-btn ${activeBtnStyle}`}
        onClick={onClickChangeActiveLanguageId}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
