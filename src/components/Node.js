import React, { useState } from 'react';
import '../styles/Node.css';

export default function Node(props) {
    const { isStart, isFinish } = props;

    const extraClassName = isStart ? 'node-start' : isFinish ? 'node-finish' : '';

    return (
        <div className={`Node, ${extraClassName}`}></div>
    )
}
