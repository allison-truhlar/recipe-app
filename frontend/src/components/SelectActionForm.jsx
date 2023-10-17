import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
// import { MenuExpandContext } from "../context/MenuExpandContext"

export default function SelectActionForm(props) {
    const { user } = useContext(AuthContext)
    const [isExpanded, setIsExpanded] = useState(true)

    // const {expanded, setExpanded, toggleExpand} = useContext(MenuExpandContext)

    // if(props.action != ""){
    //     setExpanded(false)
    // }
    const toggleExpandBtn = () => {
        setIsExpanded(prevIsExpanded => !prevIsExpanded)
    }


    return (
        <div className="card select-action-card">
            {user && (
                <>
                    <div className="flex">
                        <h3>What's cooking, {user.username}? </h3>
                        {!props.isWideScreen ? (
                            <button
                                className="btn btn-outlined icon-btn expand-btn"
                                onClick={toggleExpandBtn}
                            >
                                {isExpanded ? (
                                    <span className="material-symbols-outlined">expand_less</span>) : (
                                    <span className="material-symbols-outlined">expand_more</span>
                                )}
                            </button>
                        ) :
                            null}
                    </div>
                </>
            )}

            {(isExpanded || props.isWideScreen) && (
                <div className="select-action-btn-container">
                    <button className="btn select-action-btn" onClick={() => props.handleSelect('view')}>
                        Browse my recipes
                    </button>


                    <button className="btn select-action-btn" onClick={() => props.handleSelect('search')}>
                        Search my recipes
                    </button>


                    <button className="btn select-action-btn" onClick={() => props.handleSelect('addUrl')}>
                        Add a recipe with URL
                    </button>

                    <button className="btn select-action-btn" onClick={() => props.handleSelect('addManual')}>
                        Add a recipe manually
                    </button>
                </div>
            )}

            {props.error && <div className="error">{props.error}</div>}
        </div>
    );
};
