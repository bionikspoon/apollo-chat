import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css' // tslint:disable-line ordered-imports
import '@blueprintjs/core/lib/css/blueprint.css' // tslint:disable-line ordered-imports
import './index.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
