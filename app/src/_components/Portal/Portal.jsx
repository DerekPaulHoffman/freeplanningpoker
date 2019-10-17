import { createPortal } from 'react-dom';

import './Portal.scss';

const Portal = (props) => {
    const { children } = props;
    return createPortal(children, document.body);
}

export default Portal;