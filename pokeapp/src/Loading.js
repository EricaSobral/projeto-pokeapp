import React from 'react'

const LoadingScreen = () => {
  return (
    <>
      <div className='loading-gif' align="center">
        <img
          className='gif'
          src='https://cdn.dribbble.com/users/946764/screenshots/2844436/pokeball.gif'
          alt='Loading Image'
        />
      </div>
    </>
  )
}

export default LoadingScreen;