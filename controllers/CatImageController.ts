import pool from '../db/dbconnector';
import fs from 'fs';
import { getCatImageById,
  getAllCatImages,
  uploadImage,
  deleteImage,
  updateImage
} from '../db/queries';

class CatImageController {

  public async getAll(req, res) {
    try {
      const client = await pool.connect();
      const { rows }  = await client.query(getAllCatImages);
      const [ image ] = rows;

      client.release();

      res.status(200).json({ request: {
              type: 'GET',
              url: `http://localhost:4000/cats`
          },
          data: image
        });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
  public async getById(req, res) {
    try {
      const client = await pool.connect();
      const { id } = req.params;
      const { user_id } = req.user;
      const { rows }  = await client.query(getCatImageById, [id, user_id]);
      const [ image ] = rows;
      client.release();

      if (image) {
        res.status(200).json({
          request: {
              type: 'GET',
              url: `http://localhost:4000/cats/${id}`
          },
          data: image
        })
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }


    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  public async uploadImage(req, res) {
    try {

      const { name } = req.body;
      const { user_id } = req.user;
      const { originalname, size } = req.file;
      const client = await pool.connect();
      const { rows }  = await client.query(uploadImage, [name, originalname, size, user_id]);
      const [ image ] = rows;

      client.release();

      res.status(200).json({
        request: {
          type: 'POST',
          url: 'http://localhost:4000/cats'
        },
        message: 'Image added',
        data: image
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }

  }
  public async updateImage(req, res) {
    try {

      const { name } = req.body;
      const { id } = req.params;
      const { user_id } = req.user;
      const { originalname, size } = req.file;
      const client = await pool.connect();

      const { rows: existingImage }  = await client.query(getCatImageById, [id, user_id]);
      const [ oldImage ] = existingImage;

      fs.unlinkSync(`./images/${oldImage.image}`)

      const { rows }  = await client.query(updateImage, [id, name, originalname, size, user_id]);
      const [ image ] = rows;

      client.release();

      res.status(200).json({
        request: {
          type: 'PUT',
          url: `http://localhost:4000/cats/${id}`
        },
        message: 'Image updated',
        data: image
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  public async deleteImage(req, res) {
    try {
      const { id } = req.params;
      const { user_id } = req.user;
      const client = await pool.connect();
      const { rows }  = await client.query(getCatImageById, [id, user_id]);
      const [ image ] = rows;

      if (image) {
        fs.unlinkSync(`./images/${image.image}`)
        await client.query(deleteImage, [id, user_id]);
        client.release();

        res.status(204).json({
          request: {
            type: 'DELETE',
            url: `http://localhost:4000/cats/${id}`
          },
          message: 'Image removed'
        });
      } else {
        res
        .status(404)
        .json({ message: "No valid entry found for provided ID" });
      }


    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

export default CatImageController;
