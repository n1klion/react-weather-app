import classes from './Loader.module.css'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

function Loader() {
  return (
    <div className={classes['loader-wrap']}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: '4rem' }} spin />} />
    </div>
  )
}

export default Loader
