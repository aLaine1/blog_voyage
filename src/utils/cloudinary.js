export const cloudinaryConfig = {
  cloudName: 'mostlyblogpics'
};

export function getCloudinaryUrl(publicId, transformations = '') {
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformations}/${publicId}`;
}
