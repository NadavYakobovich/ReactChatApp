import React, {useRef} from 'react';
import "./SearchBox.css"

function SearchBox({setSearchQuery}) {
    //contain the value of the search text
    const searchText = useRef()

    //Each time the user types a letter the function receives the text typed so far
    //and determines the search value
    function search() {
        setSearchQuery(searchText.current.value)
    }

    return (
        <span className="searchBackGround">
        <div className="overSearchBox">
            <div className="searchBox d-flex ">
                <input ref={searchText} type="text" onKeyUp={search} className="w-100 border-0 SearchTextArea"
                       placeholder="Search Chats"/> <span
                className="bi bi-search ">  </span>
            </div>
        </div>
        </span>
    );

}

export default SearchBox;