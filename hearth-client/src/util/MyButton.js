import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName}>
    <IconButton onClick={onClick} className={btnClassName} style={{ 
      backgroundColor: 'white',
      boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.08), 0 2.8px 2.2px rgba(0, 0, 0, 0.08), 0 0 2.2px 2px rgba(0, 0, 0, 0.04)'
    }}>
      {children}
    </IconButton>
  </Tooltip>
);

