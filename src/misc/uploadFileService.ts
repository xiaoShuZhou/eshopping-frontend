import axios from "axios";
import { BASE_URL } from "./constants";

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const response = await axios.post(`${BASE_URL}/images/upload-avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });

    if (response.data && response.data.imageUrl) {
      return response.data.imageUrl;
    } else {
      throw new Error('Image URL not found in response');
    }
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw new Error('Failed to upload image');
  }
}

export { uploadImage };
