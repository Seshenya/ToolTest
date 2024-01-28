import {
    getMedia,
    createMedia,
    alterMedia,
    searchMedia,
    getMediaCategories,
    createCategory,
    getMediaTypes,
    alterCategory,
    get3DModels,
    create3DModel,
    searchImage
} from '../services'
import formidable from 'express-formidable'
import { similaritySearchFromAudio } from '../services/similarity-search-audio'

async function fetchMedia(req: any, res: any) {
    getMedia(req.params.id)
        .then((media) => {
            res.send(media)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

async function fetchImage(req: any, res: any) {
    formidable({ multiples: true })(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed.' })
        }

        const imageData = {
            fields: req?.fields || {},
            fileMedia: req?.files?.media || undefined,
        }

        await searchImage(imageData)
            .then(({ query }) => {
                res.send(query)
            })
            .catch((error) => {
                res.status(400).send({ message: error })
            })
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
    const { page, size, category, media_type, query, status, owner_id, user_id } = req.query // get search parameters
    searchMedia(page, size, category, media_type, query, status, owner_id, user_id)
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

async function fetch3DModels(req: any, res: any) {
    get3DModels()
        .then((models) => {
            res.send(models)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

async function add3DModel(req: any, res: any) {
    formidable()(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed.' })
        }

        const data = {
            fields: req.fields,
            file: req.files.model,
        }

        try {
            const model = await create3DModel(data)
            res.send(model)
        } catch (error) {
            res.status(500).send({ message: 'Error creating model.' })
        }
    })
}

async function fetchSimilaritySearchedMedia(req: any, res: any) {
    const { search_term } = req.query // get search term
    similaritySearchFromAudio(search_term)
        .then((model) => {
            res.send(model)
        })
        .catch((error) => {
            res.status(400).send({ message: error.message })
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
    updateMediaCategory,
    fetch3DModels,
    add3DModel,
    fetchImage,
    fetchSimilaritySearchedMedia
}
