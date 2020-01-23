import React from "react";

export default function BadgePreview(props) {
const isSelected = props.isSelected+"card-border props.isSelected"
    return (
        <div className=" badge-card"  onClick={props.onBadgeClick}>
            <h3 className="">{props.badge}</h3>
        </div>
    )
}