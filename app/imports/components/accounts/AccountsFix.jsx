import { Accounts, STATES } from 'meteor/std:accounts-ui'

class Field extends Accounts.ui.Field {
  triggerUpdate () {
    const { onChange } = this.props
    if (this.input) {
      onChange({ target: { value: this.input.value } })
    }
  }
}

Accounts.ui.Field = Field

export { Accounts, STATES }
export default Accounts
