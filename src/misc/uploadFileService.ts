import axios from "axios";

type UploadResponse = {
  originalname: string;
  filename: string;
  location: string;
};

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post<UploadResponse>('https://api.escuelajs.co/api/v1/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.location;
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw new Error('Failed to upload image');
  }
}

const getImageUrl = (imageData: string) => {
  try {
    // Attempt to parse imageData as JSON. If it's a JSON string, this will succeed.
    const parsedData = JSON.parse(imageData);
    // Assuming the JSON structure is an array, return the first element.
    return parsedData[0];
  } catch (error) {
    // If JSON.parse() fails, it's likely a direct URL string, so return it as is.
    return imageData;
  }
};

export { uploadImage, getImageUrl };
