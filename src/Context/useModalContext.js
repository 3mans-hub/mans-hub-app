import React, {createContext, useContext, useState} from 'react';
import Modal from "../layout/Modal";



    const UseModalContext = createContext();

    export const ModalProvider = ({children}) => {

        const [isOpen, setIsOpen] = useState(false);
        const [modalData, setModalData] = useState(null);

            const openModal = (title, children) => {
                setModalData({
                    title,
                    children,
                });
                setIsOpen(true)
            };

            const closeModal = () => {
                setIsOpen(false);
                setModalData(null);
            };

            return (
                <UseModalContext.Provider value={{isOpen, openModal, closeModal}}>
                    {children}
                    {isOpen && (
                        <Modal
                            title={modalData.title}
                            children={modalData.children}
                        ></Modal>
                    )}
                </UseModalContext.Provider>
            );
        };

// useModal 훅 생성
    export const useModal = () => useContext(UseModalContext);

