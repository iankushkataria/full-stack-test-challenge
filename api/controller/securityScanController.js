const SecurityScan = require('../model/securityScan')

const securityScanController = {
  addScanResult: async (req, res) => {
    const resp = {
      message: '',
      error: ''
    }
    try {
      const securityScan = new SecurityScan({ ...req.body })
      await securityScan.save()
      resp.message = 'Scan created successfully'
      res.status(200).json(resp)
    } catch (error) {
      console.log('Internal Server Error...', error)
      resp.message = 'Internal Server Error...'
      resp.error = error
      res.status(500).json(resp)
    }
  },
  fetchScanResult: async (req, res) => {
    const resp = {
      message: '',
      error: '',
      data: []
    }
    try {
      const scans = await SecurityScan.find({})
      resp.message = 'Scans fetched successfully'
      resp.data = scans
      res.status(200).json(resp)
    } catch (error) {
      console.log('Internal Server Error...', error)
      resp.message = 'Internal Server Error...'
      resp.error = error
      res.status(500).json(resp)
    }
  }
}

module.exports = securityScanController
