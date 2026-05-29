import '../practice.css';

import React, { useState } from 'react'

const Practice = () => {
  const [count, setCount] = useState(0);
  return (
    <div className='container'>
        <p id = "para">You have Clicked {count} times</p>
        <button id = "btn" onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  )
}

export default Practice;