/*
 * @Date: 2021-09-10 16:19:39
 * @LastEditors: Timothy
 * @LastEditTime: 2021-09-23 14:20:20
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
if (process.env.NODE_ENV !== 'development'){
  window.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

