const getAllCatImages: string =
  "SELECT * FROM cat_images";
const getCatImageById: string =
  "SELECT * FROM cat_images WHERE id = $1 AND user_id = $2";
const uploadImage: string = "INSERT INTO cat_images (name, image, size, created_at, user_id) VALUES ($1, $2, $3, now(), $4) RETURNING *";
const deleteImage: string =
  "UPDATE cat_images SET deleted_at = now(), updated_at = now() WHERE id = $1 AND user_id = $2 RETURNING *";
const updateImage: string =
  "UPDATE cat_images SET  name = $2, image = $3, size = $4, updated_at = now() WHERE id = $1 AND user_id = $5 RETURNING *";
const getUserByEmail: string =
  "SELECT * FROM cat_users WHERE email = $1";
const createUser: string =
  "INSERT INTO cat_users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";

export {
  getAllCatImages,
  getCatImageById,
  uploadImage,
  deleteImage,
  updateImage,
  getUserByEmail,
  createUser
};
