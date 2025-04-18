import axios from 'axios';
import http from '../config/axios';
import { Image } from '../model/image.model';

export const getImages = async (): Promise<Image[]> => {
    const response = await axios.get('https://api.ai-cats.net/v1/cat/similar/669de24a-1da1-4fcd-84b1-9e55a43a0e0e')
    return response.data
}