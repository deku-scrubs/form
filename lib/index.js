/**
 * Imports
 */

import element from 'virtual-element'

/**
 * Default props
 */
const defaultProps = {
  loading: false,
  valid: true
}

/**
 * Render
 */

function render ({props}) {
  const {onSubmit, onSuccess, onFailure, valid, loading} = props

  return (
    <form onSubmit={handleSubmit}>
      {props.children}
    </form>
  )

  function handleSubmit (e) {
    e.preventDefault()

    // Don't allow multiple concurrent submissions
    // or submissions while the form is invalid
    if (loading || !valid) {
      return
    }

    if (onSubmit) {
      const result = onSubmit()

      if (result && result.then) {
        result.then(onSuccess, onFailure)
      }
    }
  }
}

/**
 * Exports
 */

export default {render, defaultProps}
