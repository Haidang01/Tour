import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

const InputForm = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div>
      <TextField
        id=""
        label=""
        value={showPass}
        onChange={(e) => setShowPass(e.target.value)}

      />

    </div>
  )
}

export default InputForm