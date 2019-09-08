import React, { useState } from 'react';

const ModernStandard= () =>{
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button type="button" onClick={() => setCount(count + 1)}>
          Click me
            </button>
        </div>
    );
}
export default ModernStandard;
