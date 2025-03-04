import axios from 'axios';

const USER_BASE_URL = 'https://fundoonotes.incubation.bridgelabz.com/api/user'

export const loginApiCall = (payload) =>  {
    return axios.post(`${USER_BASE_URL}/login`,payload)
}

export const signUpApiCall = (payload) => {
    return axios.post(`${USER_BASE_URL}/userSignUp` , payload);
}
export const getNotesApiCall = () => {
    return axios.get('https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList', {
        headers:{
            "Authorization": localStorage.getItem("token")
        }
    });
}

export const addNoteApi = async(payload) => {
    try {
        return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes", payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in addNoteApi: ", error);
        throw error;
    }
}

export const archiveNoteApi = async (payload) => {
    try {
        return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes", payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in archiveNoteApi: ", error);
        throw error;
    }
};

export const trashNoteApi = async (payload) => {
    try {
        return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes", payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in trashNoteApi: ", error);
        throw error;
    }
};

export const deleteNoteForeverApi = async (payload) => {
    try {

        return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes", payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in trashNoteApi: ", error);
        throw error;
    }
};

export const editNoteApi = async (payload) => {
    try {

        return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes", payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in editNoteApi: ", error);
        throw error;
    }
};

export const colorAPI = async (payload) => {
    try {
        return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes", payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in editNoteApi: ", error);
        throw error;
    }
};
