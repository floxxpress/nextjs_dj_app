import styles from '@/styles/Modal.module.css'
import {useState, useEffect} from "react";
import ReactDOM from 'react-dom'
import {FaTimes} from "react-icons/fa";

const Modal = ({show, onClose, children, title}) => {
    const [isBrowser, setBrowser] = useState(false)
    const handleClose = (e)=>{
        e.preventDefault()
        onClose()
    }
    useEffect(()=> setBrowser(true))

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href='#' onClick={handleClose}>
                        <FaTimes />
                    </a>
                </div>
                {title && <div>{title}</div>}
                <div className={styles.body}>
                    {children}
                </div>

            </div>

        </div>
    ) : null
    if(isBrowser){
        return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
    } else {
        return null
    }
};
{}
export default Modal;

//https://devrecipes.net/modal-component-with-next-js/
