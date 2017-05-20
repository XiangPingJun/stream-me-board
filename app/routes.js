// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import WelcomePage from 'containers/WelcomePage'
import NotFoundPage from 'containers/NotFoundPage'

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/Welcome',
      getComponent(nextState, cb) {
		cb(null, WelcomePage)
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        cb(null, WelcomePage)
      },
    },
  ];
}
