import axios from "axios";

// Function to upload image and receive the URL of the uploaded image
async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('avatar', file);
  console.log('Uploading image:', file.name); // Logging the file name for clarity

  try {
    // Make the POST request to upload the image
    const response = await axios.post('http://localhost:3001/api/v1/products/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to 'multipart/form-data'
      },
    });

    // Assuming the URL is returned in the response under `data.imageUrl`
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
