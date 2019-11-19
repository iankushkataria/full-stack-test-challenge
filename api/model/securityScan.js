const mongoose = require('mongoose')

const findingsModelSchema = mongoose.Schema({
  type: String,
  ruleId: String,
  location: {
    path: String,
    positions: {
      begin: {
        line: Number
      }
    }
  },
  metadata: {
    description: String,
    severity: String
  }
})

const securityScanModelSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['queued', 'in-progress', 'success', 'failure'],
      default: 'queued',
      required: true
    },
    repositoryName: {
      type: String,
      require: true
    },
    findings: [findingsModelSchema],
    queuedAt: {
      type: Date,
      default: Date.now
    },
    scanningAt: {
      type: Date,
      default: Date.now
    },
    finishedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

const SecurityScan = mongoose.model('SecurityScan', securityScanModelSchema)

module.exports = SecurityScan
