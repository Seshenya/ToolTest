import { getMedia, createMedia, alterMedia, searchMedia } from '../services'
import formidable from 'express-formidable';

async function fetchMedia(req: any, res: any) {
    const media = await getMedia(req.params.id)
    res.send(media)
}

async function addMedia(req: any, res: any) {
    formidable({multiples: true})(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ error: 'File upload failed.' });
        }

        const mediaData = {
            fields: req.fields,
            fileMedia: req.files.media,
            filePreviews: Array.isArray(req.files.previews) ? req.files.previews : [req.files.previews],
            fileThumbnail: req.files.thumbnail,
        }

        try {
            const media = await createMedia(mediaData);
            res.send(media);
        } catch (error) {
            res.status(500).send({ message: 'Error creating media.' });
        }
      });
}

async function updateMedia(req: any, res: any) {
    alterMedia(req.params.id, req.userId, req.body)
        .then((media) => {
            res.send(media)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

async function fetchSearchedMedia(req: any, res: any) {
    const { page, size, category, media_type, query } = req.query // get search parameters
    searchMedia(page, size, category, media_type, query)
        .then(({ media, totalCount }) => {
            res.send({ media, totalCount })
        })
        .catch((error) => {
            res.status(400).send({ message: error.message })
        })
}

export { fetchMedia, addMedia, updateMedia, fetchSearchedMedia }
