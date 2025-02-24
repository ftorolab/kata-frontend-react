import React, { useState, useEffect, createRef, useRef} from "react";
import { Link } from "react-router-dom";
import { serverFetchPost } from '../../services/request';

import "./Salas.css";

function ModalSalas({onClose, modalData}) {
    let dataCompleted = {};
    const [formData, setFormData] = useState({
        name: '',
        capacity: '',
        seats: {"G1": true,"G2": true,"G3": true}
      });
    const modalDetails = createRef();
    const formDataRef = useRef(formData);
    useEffect(() => {
        formDataRef.current = formData;
    }, [formData]);

    const handleInputEvent = (e) => {
        const { name, value } = e.detail;
        console.log('first', value)
        setFormData((prevData) => ({
          ...prevData,
          [name]: name !== 'capacity' ? value : parseInt(value),
        }));
      };
      const componentIds = [
        '#inputName',
        '#inputCapacity',
        '#inputSeats',
      ];

    const openModal = () => {
        if (
          modalDetails.current &&
          typeof modalDetails.current.openDrawer === 'function'
        ) {
          modalDetails.current.openDrawer();
        } else {
          console.error('Error in open modal');
        }
    };

    const cleanObject = (data) => {
        return Object.fromEntries(
            Object.entries(data).filter(
                ([key, value]) => value !== '' && value !== null && value !== undefined,
            ),
        );
      };

    const handleClick = async () => {
        const dataBefore = modalData ? modalData.data : {};
        const dataUpdated = cleanObject(formDataRef.current)
        dataCompleted = (modalData
        ? {...dataBefore, ...dataUpdated }
        : {...formDataRef.current});
        
        console.log('dataCompleted', dataCompleted)
        try {
            const response = await serverFetchPost({ url: 'http://localhost:3002/api/rooms', data: dataCompleted });
            console.log('Room added:', response);
        } catch (error) {
            console.error("Error adding room:", error);
        }
        window.location.href = '/salas';
    };
    
      useEffect(() => {
        openModal();
        const componentModal = document.querySelector('bdb-ml-drawer');
        if (componentModal) {
          componentModal.addEventListener('eCloseDrawer', (e) => {
            onClose();
          });
        }
        const buttonSaveBeneficiarie = document.getElementById(
          'buttonSaveBeneficiarie'
        );
        const buttonExit = document.getElementById(
          'buttonExit'
        );
        if (buttonSaveBeneficiarie) {
          buttonSaveBeneficiarie.addEventListener('click', (e) => {
            handleClick();
            onClose(false);
          });
        }
        if (buttonExit) {
          buttonExit.addEventListener('click', (e) => {
            onClose(false);
          });
        }
      }, []);

      useEffect(() => {
        componentIds.forEach((id) => {
          const component = document.querySelector(id);
          if (component) {
            const listener = (e) => handleInputEvent(e);
            component.addEventListener('atInputChanged', listener);
          }
        });
        const dropdownTypeDocument = document.getElementById('dropRoom');
        if (dropdownTypeDocument) {
          dropdownTypeDocument.addEventListener('elementSelectedAtom', (e) => {
            setFormData((prevData) => ({
              ...prevData,
              [e.detail.name]: parseInt(e.detail.value),
            }));
          });
        }
      }, [])
    
    return (
        <>
            <div className='containerModal' id='containerModal'>
            <bdb-ml-drawer
            ref={modalDetails}
            size-drawer='lg'
            title-drawer={modalData ? 'Editar sala': 'Agregar sala'}
            hide-close={true}
            >
            <div slot='bodyDrawer'>
                <div className='inputTxt'>
                <bdb-at-input
                    id='inputName'
                    name='name'
                    label='Nombre sala'
                    placeholder='Ej: Sala 1'
                    type='TEXT'
                    status='ENABLED'
                    required='true'
                    view-mode
                    value={modalData ? modalData.data.name : ''}
                ></bdb-at-input>
                </div>
                <div className='inputTxt'>
                <bdb-at-input
                    id='inputCapacity'
                    name='capacity'
                    label='Capacidad'
                    placeholder='Ej: 30'
                    type='NUMBER'
                    required='true'
                    view-mode
                    value={modalData ? modalData.data.capacity : ''}
                ></bdb-at-input>
                </div>
                <div className='containerButtons'>
                <div className='containerButton1'>
                    <button
                    id='buttonSaveBeneficiarie'
                    className='bdb-at-btn bdb-at-btn--primary bdb-at-btn--lg'
                    >
                    Guardar y salir
                    </button>
                </div>
                <div className='containerButton2'>
                    <button
                    className='bdb-at-btn  bdb-at-btn--secondary bdb-at-btn--lg'
                    id='buttonExit'
                    >
                    Salir sin guardar
                    </button>
                </div>
                </div>
            </div>
            </bdb-ml-drawer>
            </div>
        </>
    );
}

export default ModalSalas;