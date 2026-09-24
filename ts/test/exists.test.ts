
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenElevationSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = OpenElevationSDK.test()
    equal(testsdk instanceof OpenElevationSDK, true,
      'OpenElevationSDK.test() must return a client synchronously')
  })

})
