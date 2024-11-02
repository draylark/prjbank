import React from 'react'
import { ScaleLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <ScaleLoader color='#0179fe'/>
    </div>
  )
}

export default Loading