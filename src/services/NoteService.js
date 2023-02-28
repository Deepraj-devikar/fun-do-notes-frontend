import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:3000/api/v1/notes/`,
    timeout: 1000,
    headers: {'Authorization': 'Bearer '+localStorage.getItem('authentication_token')}
});

export const GetAllNotesApi = () => {
    return instance.get(``);
};

export const CreateNoteApi = (data) => {
    return instance.post(``, data);
};

export const UpdateNoteApi = (noteID, data) => {
    return instance.put(`${noteID}`, data);
}

export const ArchiveNoteApi = (noteID) => {
    return instance.put(`${noteID}/archive`);
};

export const TrashNoteApi = (noteID) => {
    return instance.put(`${noteID}/trash`);
};

export const ColorNoteApi = (noteID, color) => {
    return instance.put(`${noteID}/color`, {color: color});
};