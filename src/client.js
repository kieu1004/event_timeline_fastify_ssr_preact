import { hydrate } from 'preact'
import Router from './components/Router'

hydrate(Router(), document.querySelector('#root'))