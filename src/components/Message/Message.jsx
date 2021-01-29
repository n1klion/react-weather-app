import classes from './Message.module.css'
import { Toast } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteMessage } from '../../store/notifyReducer'

function Message({ msg, title, variant, id }) {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if(!show){
      dispatch(deleteMessage(id))
    }
  }, [dispatch, id, show])

  return (
    <Toast
      className={classes[variant]}
      onClose={() => setShow(false)}
      show={show}
      autohide
      delay={3000}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{msg}</Toast.Body>
    </Toast>
  )
}

export default Message
