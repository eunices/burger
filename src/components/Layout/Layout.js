import React from 'react';

import classes from './Layout.module.css';

import Hux from '../../hoc/Hux';

const layout = (props) => (
  <Hux>
    <div>Toolbar, Sidedrawer, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Hux>
);

export default layout;
