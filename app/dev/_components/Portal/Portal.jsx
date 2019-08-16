import { useEffect } from 'react';
import ReactDOM from 'react-dom';


const Portal = (props) => {
  const el = document.createElement('div');
  el.classList.add('overlay');
  const modalRoot = document.getElementById(props.root);
  
  useEffect(() => {
    modalRoot.appendChild(el);
    
    return () => {
      el.remove();
    }
  }, [])

  return ReactDOM.createPortal(
    props.children,
    el,
  );
};

export default Portal;