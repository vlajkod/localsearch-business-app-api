import axios from 'axios';

async function get(url: string) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        throw new Error(`Url: ${url}, ${e.message}`);
    }
}

export default {
    get
};
