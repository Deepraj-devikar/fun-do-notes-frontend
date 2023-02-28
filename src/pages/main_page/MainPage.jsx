import './MainPage.css';
import Note_1 from "../../components/notes/Note_1";
import Note_2 from "../../components/notes/Note_2";
import Note_3 from '../../components/notes/Note_3';
import Header from '../../components/header/Header';
import { useState, useEffect } from 'react';
import { ArchiveNoteApi, CreateNoteApi, GetAllNotesApi, ColorNoteApi, UpdateNoteApi, TrashNoteApi } from '../../services/NoteService';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SideMenuButton from '../../components/header/SideMenuButton';

export default function MainPage(){
    const [state, setState] = useState({
        showNote1: true,
        notes: [],
        updateNotes: 1,
        activeMenu: 'Notes'
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

    const note3CloseOnClick = (noteID, data) => {
        UpdateNoteApi(noteID, data)
        .then(response => {
            if(response.status == 202){
                console.log("Note updated successfully", response);
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

    const note3Archive = (noteID) => {
        ArchiveNoteApi(noteID)
        .then(response => {
            if(response.status == 202){
                console.log("Note archive successfully", response);
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

    const note3Trash = (noteID) => {
        TrashNoteApi(noteID)
        .then(response => {
            if(response.status == 202){
                console.log("Note trash successfully", response);
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

    const onMenuClick = (menuName) => {
        setState(prevState => ({
            ...prevState,
            activeMenu: menuName
        }));
    }

    return (
        <div className='main-page-screen'>
            <Header />
            <div className='main-page-work-area'>
                    <div className='main-page-side-menu'>
                        <SideMenuButton active={state.activeMenu == 'Notes'} menuName='Notes' onMenuClick={onMenuClick}>
                            <LightbulbOutlinedIcon />
                            Notes
                        </SideMenuButton>
                        <SideMenuButton active={state.activeMenu == 'Archive'} menuName='Archive' onMenuClick={onMenuClick}>
                            <ArchiveOutlinedIcon />
                            Archive
                        </SideMenuButton>
                        <SideMenuButton active={state.activeMenu == 'Trash'} menuName='Trash' onMenuClick={onMenuClick}>
                            <DeleteOutlineOutlinedIcon />
                            Trash
                        </SideMenuButton>
                    </div>
                <div className='main-page-main-content'>
                    <div className='main-page-create-note'>
                        {state.showNote1 ? <Note_1 note1OnClick={note1OnClick}/> : <Note_2 note2CloseOnClick={note2CloseOnClick}/>}
                    </div>
                    <div className='main-page-created-notes'>
                        {
                            state.activeMenu == 'Notes' ? 
                                state.notes.map(note => (
                                    <Note_3 
                                        key={note._id} 
                                        note={note}
                                        note3Archive={note3Archive} 
                                        noteColor={noteColor}
                                        note3CloseOnClick={note3CloseOnClick}
                                        note3Trash={note3Trash}
                                    />
                                )) 
                            : (state.activeMenu == 'Archive' ? 
                                state.notes.filter(note => note.isArchive).map(note => (
                                    <Note_3 
                                        key={note._id} 
                                        note={note}
                                        note3Archive={note3Archive} 
                                        noteColor={noteColor}
                                        note3CloseOnClick={note3CloseOnClick}
                                        note3Trash={note3Trash}
                                    />
                                ))
                            : (state.activeMenu == 'Trash' ?
                                state.notes.filter(note => note.isTrash).map(note => (
                                    <Note_3 
                                        key={note._id} 
                                        note={note}
                                        note3Archive={note3Archive} 
                                        noteColor={noteColor}
                                        note3CloseOnClick={note3CloseOnClick}
                                        note3Trash={note3Trash}
                                    />
                                )) : ''
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}