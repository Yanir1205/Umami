import React from "react";

export default function LocationPreview(props) {
    return (
        <div className="cuisine-card " onClick={() => props.onLocationClick(props.location)}>
            <h3>{props.location}</h3>
        </div>
    )
}