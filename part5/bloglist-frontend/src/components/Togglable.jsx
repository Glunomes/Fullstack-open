import { useState, useImperativeHandle } from "react"

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenWisible = { display: visible ? 'none' : '' }
  const showWhenWisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return {toggleVisibility}
  })
  
  return (
    <div>
      <div style={hideWhenWisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenWisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Toggable