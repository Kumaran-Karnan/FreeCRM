module.exports = {
  default: {
    require: [
      'step-definitions/*.ts',
      'hooks/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'html:cucumber-report.html'
    ]
  }
};