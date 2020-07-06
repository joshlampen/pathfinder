import React, { useState } from 'react';

export default function NavButton(props) {
  const { text } = props;

  const [state, setState] = useState({
    isHovered: false
  })

  const manageHover = (props) => {
    const isHovered = !state.isHovered;

    setState({ isHovered })
  }

  return (
    <li
      onMouseEnter={manageHover}
      onMouseLeave={manageHover}
    >
      <a href=''>
        {text}
      </a>
    </li>
  )
}