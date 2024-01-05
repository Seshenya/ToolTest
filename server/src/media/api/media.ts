import {
    getMedia,
    createMedia,
    alterMedia,
    searchMedia,
    getMediaCategories,
    createCategory,
    getMediaTypes,
    alterCategory,
} from '../services'
import formidable from 'express-formidable'

async function fetchMedia(req: any, res: any) {
    getMedia(req.params.id)
        .then((media) => {
            res.send(media)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

async function addMedia(req: any, res: any) {
    formidable({ multiples: true })(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed.' })
        }

        const mediaData = {
            fields: req.fields,
            fileMedia: req.files.media,
            filePreviews: Array.isArray(req.files.previews)
                ? req.files.previews
                : [req.files.previews],
            fileThumbnail: req.files.thumbnail,
        }

        try {
            const media = await createMedia(mediaData)
            res.send(media)
        } catch (error) {
            res.status(500).send({ message: 'Error creating media.' })
        }
    })
}

async function updateMedia(req: any, res: any) {
    formidable({ multiples: true })(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed.' })
        }

        const mediaData = {
            fields: req?.fields || {},
            fileMedia: req?.files?.media || undefined,
            filePreviews: Array.isArray(req.files.previews)
                ? req?.files?.previews
                : req?.files?.previews
                    ? [req.files.previews]
                    : undefined,
            fileThumbnail: req?.files?.thumbnail,
        }

        await alterMedia(req.params.id, mediaData)
            .then((media) => {
                res.send(media)
            })
            .catch((error) => {
                res.status(400).send({ message: error })
            })
    })
}

async function fetchSearchedMedia(req: any, res: any) {
    const { page, size, category, media_type, query, status, owner_id } = req.query // get search parameters
    searchMedia(page, size, category, media_type, query, status, owner_id)
        .then(({ media, totalCount }) => {
            res.send({ media, totalCount })
        })
        .catch((error) => {
            res.status(400).send({ message: error.message })
        })
}

async function fetchMediaCategories(req: any, res: any) {
    getMediaCategories()
        .then((mediaCategories) => {
            res.send(mediaCategories)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

async function addMediaCategory(req: any, res: any) {
    createCategory(req.body)
        .then((category) => {
            res.send(category)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

async function updateMediaCategory(req: any, res: any) {
    alterCategory(req.params.id, req.body.type)
        .then((category) => {
            res.send(category)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

async function fetchMediaTypes(req: any, res: any) {
    getMediaTypes()
        .then((mediaTypes) => {
            res.send(mediaTypes)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

export {
    fetchMedia,
    addMedia,
    updateMedia,
    fetchSearchedMedia,
    fetchMediaCategories,
    addMediaCategory,
    fetchMediaTypes,
    updateMediaCategory
}
