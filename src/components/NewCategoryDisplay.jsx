import React, { useState } from "react";

import crossImg from '../images/cross.png'

export default function NewCategoryDisplay (props){
    const [handleCategoryName, setHandleCategoryName] = useState('')

    return (
        <div className="newCategoryDisplay">
            <button onClick={() => props.close()}><img src={crossImg} alt="" /></button>
            <h1>New category</h1>

            <div>
                <input type="text" onChange={(e) => setHandleCategoryName(e.target.value)} placeholder="Category name" />
                <button onClick={() => props.createCategory(handleCategoryName)}>Create</button>
            </div>
        </div>
    )
}