const getAllCatImages: string =
  "SELECT * FROM cat_images";
const getCatImageById: string =
  "SELECT * FROM cat_images WHERE id = $1";
const uploadImage: string = "INSERT INTO cat_images (name, image, size, created_at) VALUES ($1, $2, $3, now()) RETURNING *";
const deleteImage: string =
  "UPDATE cat_images SET deleted_at = now(), updated_at = now() WHERE id = $1 RETURNING *";
const updateImage: string =
  "UPDATE cat_images SET  name = $2, image = $3, size = $4, updated_at = now() WHERE id = $1 RETURNING *";

export {
  getAllCatImages,
  getCatImageById,
  uploadImage,
  deleteImage,
  updateImage
};
