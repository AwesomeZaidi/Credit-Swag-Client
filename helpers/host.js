// reactotron.js
import Reactotron from 'reactotron-react-native'

import host from './host'

Reactotron.configure({ host }).useReactNative().connect();