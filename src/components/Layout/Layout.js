import React from 'react';

import classes from './Layout.module.css';

import Hux from '../../hoc/Hux';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
  <Hux>
    <Toolbar/>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Hux>
);

export default layout;
