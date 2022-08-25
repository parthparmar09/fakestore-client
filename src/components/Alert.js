import React ,{useContext} from 'react'
import UserContext from '../UserContext'

export default function Alert() {
    const {alert} = useContext(UserContext)
  return (
    <div className="container fixed-bottom fw-bold" id='alert' style={{zIndex : 9999}}>
        <div className={`alert alert-${alert.type} text-center `}  role="alert">
  {alert.msg}
</div>
    </div>
  )
}
