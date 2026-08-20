import { useState } from "react"

export default function SelectActionForm(props) {
  const [isExpanded, setIsExpanded] = useState(true)
  const toggleExpandBtn = () => setIsExpanded((prev) => !prev)

  return (
    <div className="card select-action-card">
      <div className="flex">
        <h3>What's cooking?</h3>
        {!props.isWideScreen && (
          <button className="btn btn-outlined icon-btn expand-btn" onClick={toggleExpandBtn}>
            <span className="material-symbols-outlined">
              {isExpanded ? "expand_less" : "expand_more"}
            </span>
          </button>
        )}
      </div>

      {(isExpanded || props.isWideScreen) && (
        <div className="select-action-btn-container">
          <button className="btn select-action-btn" onClick={() => props.handleSelect('view')}>
            Browse my recipes
          </button>
          <button className="btn select-action-btn" onClick={() => props.handleSelect('addUrl')}>
            Add a recipe with URL
          </button>
          <button className="btn select-action-btn" onClick={() => props.handleSelect('addManual')}>
            Add a recipe manually
          </button>
        </div>
      )}
    </div>
  )
}
