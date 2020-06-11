import axios from 'axios';
import { BadRequest } from '@exceptions';

async function get(url: string) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch ({ message }) {
        throw BadRequest(message);
    }
}

export default {
    get
};
