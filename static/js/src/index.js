import React from 'react';
import ReactDOM from "react-dom";
import {AppContainer} from './components';

const mountPoint = document.getElementById('app-mount');
const baseApiUrl = mountPoint.attributes['data-base-api-url'].value;

ReactDOM.render(<AppContainer baseApiUrl={baseApiUrl} userPk={1}/>, mountPoint);
