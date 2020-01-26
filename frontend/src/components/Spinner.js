import React from 'react';
import ReactLoading from 'react-loading';
 
export default function Spinner({type, color}) {
    return <ReactLoading type={type} color={color} height={200} width={200} />
}