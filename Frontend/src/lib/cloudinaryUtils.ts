export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'myshopke');
  formData.append('cloud_name', 'desjrmpcn');
  formData.append('api_key', '261357131737187');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/desjrmpcn/image/upload`,
      {
        method: 'POST',
        body: formData,
        // Add mode: 'cors' to explicitly request CORS
        mode: 'cors'
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};