import React from "react";

export default function BadgePreview(props) {
    return (
        <div className={props.isSelected}  onClick={props.onBadgeClick}>
            <h3 className="">{props.badge}</h3>
        </div>
    )
}