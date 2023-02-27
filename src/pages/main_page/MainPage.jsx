import './MainPage.css';
import Note_1 from "../../components/notes/Note_1";
import Note_2 from "../../components/notes/Note_2";
import Note_3 from '../../components/notes/Note_3';
import Header from '../../components/header/Header';
import { useState, useEffect } from 'react';
import { ArchiveNoteApi, CreateNoteApi, GetAllNotesApi, ColorNoteApi } from '../../services/NoteService';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const SideMenuButton = styled(Button)({
    textTransform: 'none',
    backgroundColor: '#feefc3',
    color: '#202124',
    borderRadius: '0 25px 25px 0',
    height: '48px',
});

export default function MainPage(){
    const [state, setState] = useState({
        showNote1: true,
        notes: [],
        updateNotes: 1
    });

    const note1OnClick = () => {
        setState(prevState => ({...prevState, showNote1: false}));
    }

    const note2CloseOnClick = (data) => {
        if(data.title.trim() != '' && data.description.trim() != ''){
            CreateNoteApi(data)
            .then(response => {
                if(response.status == 201){
                    setState(prevState => ({
                        ...prevState,
                        showNote1: true,
                        updateNotes: prevState.updateNotes + 1
                    }));
                }
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            setState(prevState => ({
                ...prevState,
                showNote1: true
            }));
        }
    }

    const note3Archive = (noteID) => {
        ArchiveNoteApi(noteID)
        .then(response => {
            if(response.status == 202){
                // alert("Note archive successfully");
                console.log("Note archive successfully", response);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    const noteColor = (noteID, color) => {
        ColorNoteApi(noteID, color)
        .then(response => {
            console.log(response);
            if(response.status == 202){
                setState(prevState => ({
                    ...prevState,
                    updateNotes: prevState.updateNotes + 1
                }));
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(
        () => {
            GetAllNotesApi()
            .then(response => {
                console.log(response);
                if(response.status == 200){
                    setState(prevState => ({...prevState, notes: response.data.data}))
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        [state.updateNotes]
    );

    return (
        <div className='main-page-screen'>
            <Header />
            <div className='main-page-work-area'>
                <div className='main-page-side-menu'>
                    <SideMenuButton>
                        <div className='main-page-side-menu-button'>
                            <LightbulbOutlinedIcon />
                            Notes
                        </div>
                    </SideMenuButton>
                </div>
                <div className='main-page-main-content'>
                    <div className='main-page-create-note'>
                        {state.showNote1 ? <Note_1 note1OnClick={note1OnClick}/> : <Note_2 note2CloseOnClick={note2CloseOnClick}/>}
                    </div>
                    <div className='main-page-created-notes'>
                        {state.notes.map(note => (
                            <Note_3 
                                key={note._id} 
                                note={note}
                                note3Archive={note3Archive} 
                                noteColor={noteColor}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}