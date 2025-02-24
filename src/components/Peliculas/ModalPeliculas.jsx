import React, { useState, useEffect, createRef, useRef} from "react";
import { Link } from "react-router-dom";
import { serverFetchPost } from '../../services/request';

import "./Peliculas.css";

function ModalPeliculas({onClose, modalData}) {
    let dataCompleted = {};
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        duration: '',
        rating: '',
        id_room: ''
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
          [name]: name !== 'duration' ? value : parseInt(value),
        }));
      };
      const componentIds = [
        '#inputTitle',
        '#inputGenre',
        '#inputDuration',
        '#inputRating',
        '#dropRoom',
      ];

    const optionsDropdown =`[
        {"text":"Sala 1","value":"1"}
      ]`;
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
            const response = await serverFetchPost({ url: 'http://localhost:3002/api/movies', data: dataCompleted });
            console.log('Movie added:', response);
        } catch (error) {
            console.error("Error adding movie:", error);
        }
        window.location.href = '/peliculas';
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
            title-drawer={modalData ? 'Editar pelicula': 'Agregar pelicula'}
            hide-close={true}
            >
            <div slot='bodyDrawer'>
                <div className='inputTxt'>
                <bdb-at-input
                    id='inputTitle'
                    name='title'
                    label='Título'
                    placeholder='Ej: La casa de papel'
                    type='TEXT'
                    status='ENABLED'
                    required='true'
                    view-mode
                    value={modalData ? modalData.data.title : ''}
                ></bdb-at-input>
                </div>
                <div className='inputTxt'>
                <bdb-at-input
                    id='inputGenre'
                    name='genre'
                    label='Género'
                    placeholder='Ej: Acción'
                    type='TEXT'
                    required='true'
                    view-mode
                    value={modalData ? modalData.data.genre : ''}
                ></bdb-at-input>
                </div>
                <div className='inputTxt'>
                <bdb-at-input
                    id='inputDuration'
                    name='duration'
                    label='Duración'
                    placeholder='Ej: 120'
                    type='NUMBER'
                    required='true'
                    view-mode
                    value={modalData ? modalData.data.duration : ''}
                ></bdb-at-input>
                </div>
                <div className='inputTxt'>
                <bdb-at-input
                    id='inputRating'
                    name='rating'
                    min-value={1}
                    max-value={100}
                    label='Rating'
                    placeholder='Ej: 5'
                    type='NUMBER'
                    required='true'
                    view-mode
                    value={modalData ? modalData.data.raiting : ''}
                ></bdb-at-input>
                </div>
                <div className='inputTxt'>
                <bdb-at-dropdown
                    id='dropRoom'
                    name='id_room'
                    label='Sala'
                    status='ENABLED'
                    placeholder='Seleccione'
                    options={optionsDropdown}
                    defaultvalue={modalData ? modalData.data.id_room : ''}
                ></bdb-at-dropdown>
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

export default ModalPeliculas;