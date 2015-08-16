/**
 * Imports
 */

import element from 'virtual-element'
import serialize from 'form-serialize'
import identity from 'lodash.identity'

/**
 * Default props
 */

const defaultProps = {
  loading: false,
  cast: identity,
  onSubmit: identity,
  validate: function () {
    return {
      valid: true,
      errors: []
    }
  }
}

/**
 * Render
 */

function render ({props}) {
  const {loading, children, onSubmit, validate, cast} = props

  return (
    <form noValidate onSubmit={handleSubmit} onChange={handleChange}>
      {children}
    </form>
  )

  /**
   * Handle submit event
   */

  function handleSubmit (e) {
    e.preventDefault()

    const form = e.target
    const valid = checkValidity(form)

    // Don't allow:
    //  - multiple concurrent submissions
    //  - invalid submissions
    if (!loading && valid) {
      const model = cast(serialize(form))
      onSubmit(model, errors => invalidate(form, errors))
    }
  }

  function handleChange (e) {
    const {name, form} = e.target
    checkValidity(form, name)
  }

  /**
   * Check the validity of a form element
   * and call setCustomValidity on any invalid
   * controls.
   */

  function checkValidity (form, name) {
    const model = cast(serialize(form))
    const {valid, errors} = validate(model, name)

    if (! valid) {
      invalidate(form, errors, name)
    }

    return valid
  }

  /**
   * Invalidate controls (restricted to name if set)
   */

  function invalidate (form, errors, name) {
    errors.forEach(({field, message}) => {
      if (name && name !== field)
        return

      const ctrl = form.querySelector('[name="' + field + '"]')
      if (ctrl) {
        ctrl.setCustomValidity(message)
        ctrl.checkValidity()
      }
    })
  }
}

/**
 * Exports
 */

export default {render, defaultProps}
