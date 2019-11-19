const securityScanController = require('../controller/securityScanController')

const securityScanResult = router => {
  router.post('/api/security-scan', securityScanController.addScanResult)
  router.get('/api/security-scan', securityScanController.fetchScanResult)
}

module.exports = securityScanResult
