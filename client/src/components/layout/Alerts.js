import React, {useContext} from 'react'
import AlertContext from '../../context/alert/AlertContext'

export default function Alerts(props) {
  const alertContext = useContext(AlertContext);

  const setAlerts = () => {
    if(alertContext.alerts.length > 0) {
      const listAlerts = alertContext.alerts.map(alert => {
        return (<div key={alert.id} className={`alert alert-${alert.type}`}>
                  <i className="fas fa-info-circle"/> {alert.msg}
                </div>)
      })

      return listAlerts;
    }
  }

  return (
    <div>
      {setAlerts()}
    </div>
  )
}
