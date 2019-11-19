import React, { useState } from 'react'
import Api from '../helpers/api'
import Snackbar from '@material-ui/core/Snackbar'
import SecurityScanForm from './SecurityScanForm'
import SnackBarWrapper from './SnackBarWrapper'

const Dashboard = () => {
  const [status, setStatus] = useState('queued')
  const [repositoryName, setRepositoryName] = useState('https://')
  const [open, setOpen] = useState(false)
  const [snack, setMessage] = useState({ message: '', type: 'success' })

  const onChange = event => {
    switch (event.target.name) {
      case 'repository_name':
        setRepositoryName(event.target.value)
        break
      case 'status':
        setStatus(event.target.value)
        break
      default:
    }
  }

  const onSubmit = async event => {
    event.preventDefault()
    const response = await Api.add('/api/security-scan', {
      status,
      repositoryName
    })
    setOpen(true)
    setMessage({
      message: response.data.message,
      type: response.status === 200 ? 'success' : 'error'
    })
  }

  const onNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <>
      <SecurityScanForm
        handleChange={onChange}
        status={status}
        repositoryName={repositoryName}
        handleSubmit={onSubmit}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={onNotificationClose}
      >
        <SnackBarWrapper
          onClose={onNotificationClose}
          variant={snack.type}
          message={snack.message}
        />
      </Snackbar>
    </>
  )
}

export default Dashboard
