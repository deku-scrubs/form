/**
 * Imports
 */

import test from 'tape'
import {tree, render} from 'deku'
import empty from 'component-empty'
import element from 'virtual-element'
import {Promise} from 'es6-promise'
import Form from '..'

/**
 * Tests
 */

test('should call submit', function ({pass, end}) {
  const el = create(<Form onSubmit={onSubmit}><button type='submit'>submit</button></Form>)
  submit(el)
  end()

  function onSubmit () {
    pass()
  }
})

test('should not submit while loading', function ({fail, end}) {
  const el = create(<Form onSubmit={onSubmit} loading={true}><button type='submit'>submit</button></Form>)
  submit(el)
  end()

  function onSubmit () {
    fail()
  }
})

test('should call onSuccess/onFailure for promises', function ({equal, plan}) {
  const el1 = create(<Form onSubmit={succeed} onSuccess={onSuccess}><button type='submit'>submit</button></Form>)
  submit(el1)

  const el2 = create(<Form onSubmit={fail} onFailure={onFailure}><button type='submit'>submit</button></Form>)
  submit(el2)

  plan(2)

  function onSuccess (msg) {
    equal(msg, 'success')
  }

  function onFailure (msg) {
    equal(msg, 'failure')
  }
})

/**
 * Helpers
 */

function create (component) {
  empty(document.body)
  const container = document.body.appendChild(document.createElement('div'))
  render(tree(component), container)
  return container
}

function submit (el) {
  const btn = el.querySelector('button[type="submit"]')
  btn.click()
}

function succeed () {
  return (new Promise(resolve => resolve('success')))
}

function fail () {
  return (new Promise((resolve, reject) => reject('failure')))
}
