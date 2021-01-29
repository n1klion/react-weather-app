import classes from './Loader.module.css'
import { Spinner } from 'react-bootstrap'

function Loader() {
  return (
    <div className={classes['loader-wrap']}>
      <Spinner animation="grow" style={{ width: '5rem', height: '5rem' }}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
