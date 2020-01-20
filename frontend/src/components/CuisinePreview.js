import React from "react";

export default function CuisinePreview(props) {
    return (
        <div className="cuisine-card " onClick={() => props.onCuisineClick(props.cuisineType)}>
            <h3>{props.cuisineType}</h3>
        </div>
    )
}