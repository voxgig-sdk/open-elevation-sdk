
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenElevationSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await OpenElevationSDK.test()
    equal(null !== testsdk, true)
  })

})
