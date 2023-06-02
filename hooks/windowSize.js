import { useEffect, useState } from 'react'

// create a function that return the window size
export const useWindowSize = () => {
  // initialize the width and height with the window size
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  // create a function that updates the window size
  const changeWindowSize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }

  // add an event listener to the window size
  useEffect(() => {
    window.addEventListener('resize', changeWindowSize)

    // remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', changeWindowSize)
    }
  }, [])

  // return the window size
  return windowSize
}
