import React from 'react';
import { createPortal } from 'react-dom';

import './Portal.scss';

export interface PortalProps {
    children?: React.ReactNode;
}

const Portal: React.FC = (props) => {
    const { children } = props;
    return createPortal(children, document.body);
}

export default Portal;