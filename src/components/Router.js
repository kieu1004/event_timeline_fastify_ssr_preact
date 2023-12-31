import { h } from  'preact'
import { Router as PreactRouter } from 'preact-router'

import pages from '../pages/index'

const Router = () => {
    return <PreactRouter>{pages.map(page => <page.component path={page.route} />)}</PreactRouter>
}

export default Router
