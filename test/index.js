/**
 * Imports
 */

import test from 'tape'
import {tree, render} from 'deku'
import empty from 'component-empty'
import element from 'virtual-element'
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

