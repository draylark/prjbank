import React from 'react'

const HeaderBoxError = ({ title, subtext }: HeaderBoxErrorProps ) => {
  return (
    <div className='header-box'>
        <h1 className='header-box-error-title'>
            {title}
        </h1>
        <p className='header-box-error-subtext'>{subtext}</p>
    </div>
  )
}

export default HeaderBoxError