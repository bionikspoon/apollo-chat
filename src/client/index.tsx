import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css' // tslint:disable-line ordered-imports
import '@blueprintjs/core/lib/css/blueprint.css' // tslint:disable-line ordered-imports
import './index.css'

import {
  Classes,
  FocusStyleManager,
  setHotkeysDialogProps,
} from '@blueprintjs/core'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

FocusStyleManager.onlyShowFocusOnTabs()
setHotkeysDialogProps({ className: Classes.DARK })

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
