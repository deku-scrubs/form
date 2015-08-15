/**
 * Imports
 */

import element from 'magic-virtual-element'
import isPromise from 'is-promise'
import serialize from 'form-serialize'

/**
 * Default props
 */

const defaultProps = {
  loading: false
}

/**
 * Render
 */

function render ({props}) {
  const {loading, children, onSubmit, onSuccess, onFailure, transformError} = props

  return (
    <form noValidate onSubmit={handleSubmit}>
      {children}
    </form>
  )

  function handleSubmit (e) {
    e.preventDefault()

    // Don't allow multiple concurrent submissions
    if (loading || !onSubmit) {
      return
    }

    const form = e.target

    if (form.checkValidity()) {
      const q = onSubmit(serialize(form))

      if (isPromise(q)) {
        q.then(handleSuccess, handleFailure)
      }
    }
  }

  /**
   * Call the success handler with the result
   */

  function handleSuccess (value) {
    if (onSuccess) {
      onSuccess(value)
    }
  }

  /**
   * Invalidate any controls referenced in the error
   * and call the failure handler
   */

  function handleFailure (form) {
    return function (error) {
      if (transformError) {
        invalidate(form, transformError(error))
      }

      if (onFailure) {
        onFailure(error)
      }
    }
  }

  function invalidate (form, errors) {
    for (const name in errors) {
      const ctrl = form.namedItem(name)

      if (ctrl) {
        ctrl.setCustomValidity(errors[name])
        ctrl.checkValidity()
      }
    }
  }
}

/**
 * Exports
 */

export default {render, defaultProps}
