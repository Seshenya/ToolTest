import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material'
import MDButton from 'components/MDButton'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import useAxiosPrivate from 'hooks/useAxiosPrivate'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import useAuth from 'hooks/useAuth'
import MDSnackbar from 'components/MDSnackbar'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { useEffect } from 'react'

const AddEditProductModal = ({
    openModal,
    onClose,
    setOpenModal,
    categories,
    mediaTypes,
    editProduct,
    product,
    refreshSellPage
}) => {
    const [uploadedMedia, setUploadedMedia] = useState([])
    const [uploadedThumbnail, setUploadedThumbnail] = useState([])
    const [uploadedPreviews, setUploadedPreviews] = useState([])
    const [isDragging1, setIsDragging1] = useState(false)
    const [isDragging2, setIsDragging2] = useState(false)
    const [isDragging3, setIsDragging3] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedMediaType, setSelectedMediaType] = useState('1');
    const [selectedCategory, setSelectedCategory] = useState('1');
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()

    const [sb, setSb] = useState({
        open: false,
        color: '',
        icon: '',
        title: '',
        message: '',
    });

    const handleDrop1 = (e) => {
        e.preventDefault();
        setIsDragging1(false);
        const files = e.dataTransfer.files
        console.log('Dropped files:', files)
        setUploadedMedia([...uploadedMedia, ...files])
        setValue('media', files);
    }

    const handleDrop2 = (e) => {
        e.preventDefault();
        setIsDragging1(false);
        const files = e.dataTransfer.files
        console.log('Dropped files:', files)
        setUploadedThumbnail([...uploadedThumbnail, ...files])
        setValue('thumbnail', files);
    }

    const handleDrop3 = (e) => {
        e.preventDefault();
        setIsDragging1(false);
        const files = e.dataTransfer.files
        console.log('Dropped files:', files)
        setUploadedPreviews([...uploadedPreviews, ...files])
        setValue('previews', files);
    }

    const handleResetFiles = () => {
        setUploadedMedia([])
        setUploadedThumbnail([])
        setUploadedPreviews([])
    }

    const handleFormSubmit = (data) => {
        if (!isSubmitting) {
            setIsSubmitting(true)
            if (editProduct) {
                onSubmitEdit(data)
            } else {
                onSubmit(data)
            }
        }
    }

    const handleDragEnter1 = (e) => {
        e.preventDefault();
        setIsDragging1(true);
    };

    const handleDragLeave1 = (e) => {
        e.preventDefault();
        setIsDragging1(false);
    };

    const handleDragEnter2 = (e) => {
        e.preventDefault();
        setIsDragging2(true);
    };

    const handleDragLeave2 = (e) => {
        e.preventDefault();
        setIsDragging2(false);
    };

    const handleDragEnter3 = (e) => {
        e.preventDefault();
        setIsDragging3(true);
    };

    const handleDragLeave3 = (e) => {
        e.preventDefault();
        setIsDragging3(false);
    };

    const handleFileInputChange1 = (e) => {
        console.log('File Input Change:', e.target.files)
        const currentMedia = uploadedMedia
        for (const file of e.target.files) {
            currentMedia.push(file)
        }
        setUploadedMedia([...currentMedia]);
        setValue('media', currentMedia);
    }

    const handleFileInputChange2 = (e) => {
        console.log('File Input Change:', e.target.files)
        const files = Array.from(e.target.files);
        console.log(uploadedThumbnail)
        setUploadedThumbnail([...files.slice(0, 1)]);
        setValue('thumbnail', files.slice(0, 1));
    }

    const handleFileInputChange3 = (e) => {
        console.log('File Input Change:', e.target.files)
        const currentPreviews = uploadedPreviews
        for (const file of e.target.files) {
            currentPreviews.push(file)
        }
        setUploadedPreviews([...currentPreviews]);
        setValue('previews', currentPreviews);
    }

    const handleMediaCreation = async (formData) => {
        try {
            const response = await axiosPrivate.post('/media/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'maxcontentlength': 'Infinity',
                },
            })

            if (response.status === 200) {
                const data = response.data
                console.log('New media created:', data)
                refreshSellPage()
                setOpenModal(false)
                reset()
            } else {
                console.error('Failed to create media')
            }
        } catch (error) {
            console.error('Error creating media:', error)
        } finally {
            setIsSubmitting(false)
            setOpenModal(false)
            handleResetFiles()
            reset()
        }
    }

    const closeSb = () => {
        setSb({
            open: false,
            color: '',
            icon: '',
            title: '',
            message: '',
        })
    }
    const handleMediaEdit = async (formData) => {
        axiosPrivate.put(`/media/${product.product_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                if (response.status === 200) {
                    const data = response.data
                    console.log('Media updated:', data)
                    refreshSellPage()
                    setOpenModal(false)
                    reset()
                } else {
                    console.error('Failed to update media')
                }
            })

            .catch((error) => {
                console.error('Error updating media:', error)
            })
    }

    const onSubmit = (data) => {

        if (!data.media || data.media.length === 0) {
            setSb({
                open: true,
                color: 'error',
                icon: 'error',
                title: 'Error: Please add atleast one media file',
                message: '',
            });
            setIsSubmitting(false)
            return;
        }

        if (!data.thumbnail || data.thumbnail.length === 0 || data.thumbnail.length > 1) {
            setSb({
                open: true,
                color: 'error',
                icon: 'error',
                title: 'Error: Please add exactly one thumbnail file',
                message: '',
            });
            setIsSubmitting(false)
            return;
        }

        if (!data.previews || data.previews.length === 0) {
            setSb({
                open: true,
                color: 'error',
                icon: 'error',
                title: 'Error: Please add atleast one preview file',
                message: '',
            });
            setIsSubmitting(false)
            return;
        }

        if (!data.thumbnail[0].type.startsWith('image/')) {
            setSb({
                open: true,
                color: 'error',
                icon: 'error',
                title: 'Error: Please add only image files in thumbnail',
                message: '',
            });
            setIsSubmitting(false)
            return;
        }

        for (const preview of data.previews) {
            if (!preview.type.startsWith('image/') && !(!preview.type && preview?.name?.split('.')?.pop()?.toLowerCase() === 'glb')) {
                setSb({
                    open: true,
                    color: 'error',
                    icon: 'error',
                    title: 'Error: Please add only image files in previews',
                    message: '',
                });
                setIsSubmitting(false)
                return;
            }
        }

        console.log('On Submit:', data)

        const formData = new FormData()
        formData.append('media_type', data?.media_type)
        formData.append('owner', auth.user_id || '1')
        formData.append('price', data.price)
        formData.append('status', '1')
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('tags', data.tags)
        formData.append(
            'file_format',
            data.media[0]?.name.split('.').pop().toLowerCase()
        )

        for (const media of data.media) {
            console.log(1)
            formData.append('media', media)
        }

        for (const preview of data.previews) {
            formData.append('previews', preview)
        }

        formData.append('thumbnail', data.thumbnail[0]) // TODO only one allowed
        formData.append('category', data.category)

        formData.forEach((value, key) => {
            console.log(key + ' ' + value)
        });

        handleMediaCreation(formData)
    }

    const onSubmitEdit = (data) => {
        console.log('On Submit Edit:', data)

        const formData = new FormData()
        formData.append('media_type', data?.media_type)
        formData.append('price', data.price)
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('tags', data.tags)
        formData.append('status', '1')
        formData.append('category', data.category)
        if (data.media && data.media[0]) {
            formData.append('media', data.media[0])
            formData.append(
                'file_format',
                data.media[0]?.name.split('.').pop().toLowerCase()
            )
        }
        if (data.thumbnail && data.thumbnail[0]) {
            formData.append('thumbnail', data.thumbnail[0])
        }
        if (data.previews && data.previews[0]) {
            formData.append('previews', data.previews[0]) // TODO: Change this to an array of files
        }

        formData.forEach((value, key) => {
            console.log(key + ' ' + value)
        });

        handleMediaEdit(formData)

        // setOpenModal(false)
        // handleResetFiles()
        // reset()
    }

    const onReset = () => {
        reset()
    }

    const handleDeleteFileMedia = (index, fileType) => {
        let updatedFiles = [];
        if (fileType === 'media') {
            updatedFiles = uploadedMedia.filter((_, idx) => idx !== index);
            setUploadedMedia([...updatedFiles]);
            setValue('media', [...updatedFiles]);
        } else if (fileType === 'thumbnail') {
            updatedFiles = uploadedThumbnail.filter((_, idx) => idx !== index);
            setUploadedThumbnail([...updatedFiles]);
            setValue('thumbnail', [...updatedFiles]);
        } else if (fileType === 'previews') {
            updatedFiles = uploadedPreviews.filter((_, idx) => idx !== index);
            setUploadedPreviews([...updatedFiles]);
            setValue('previews', [...updatedFiles]);
        }
    };

    useEffect(() => {
        console.log('Uploaded Media:', uploadedMedia);
    }, [uploadedMedia]);

    return (
        <Dialog
            open={openModal}
            onClose={onClose}
            fullScreen
            onClick={(e) => e.stopPropagation()}
        >
            <DialogTitle id="update-status-title">
                {editProduct ? "Edit Product" : "Add New Item"}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    {errors.title && (
                        <span role="alert" style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.8rem', display: 'block' }} >
                            {errors.title.message}
                        </span>
                    )}
                    <TextField
                        {...register('title', { required: 'Title is required' })}
                        label="Title"
                        defaultValue={product?.title}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    {errors.price && (
                        <span role="alert" style={{ color: 'red', fontSize: '0.8rem', marginBottom: '0.8rem', display: 'block' }} >
                            {errors.price.message}
                        </span>
                    )}
                    <TextField
                        {...register('price', { required: 'Price is required' })}
                        label="Price"
                        defaultValue={product?.price}
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    {errors.description && (
                        <span role="alert" style={{ color: 'red', fontSize: '0.8rem', marginBottom: '0.8rem', display: 'block' }} >
                            {errors.description.message}
                        </span>
                    )}
                    <TextField
                        {...register('description', { required: 'Description is required' })}
                        {...register('description')}
                        label="Description"
                        defaultValue={product?.description}
                        multiline
                        fullWidth
                        rows={6}
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="media_type">Media Type</InputLabel>
                        <Select
                            {...register('media_type')}
                            sx={{ padding: 1.5, marginBottom: 2 }}
                            variant="outlined"
                            labelId="media_type"
                            id="media_type"
                            label="Media Type"
                            required
                            value={selectedMediaType}
                            onChange={(e) => setSelectedMediaType(e.target.value)}
                        >
                            {mediaTypes?.map((mediaType) => (
                                <MenuItem value={mediaType.id} key={mediaType.id}>
                                    {mediaType.type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Drag and Drop for Files */}

                    {/* Drag and Drop for Media */}
                    {!editProduct && (
                    <MDBox
                        border={(isDragging1 || uploadedMedia.length === 0) ? '2px dashed #aaa' : '2px dashed #ccc'}
                        borderRadius="5px"
                        padding="20px"
                        marginBottom="20px"
                        textAlign="center"
                        onDragOver={(e) => handleDragEnter1(e)}
                        onDragEnter={(e) => handleDragEnter1(e)}
                        onDragLeave={(e) => handleDragLeave1(e)}
                        onDrop={(e) => handleDrop1(e)}
                    >
                        {
                            <MDTypography variant="h3" color="primary" gutterBottom>
                                Media File
                            </MDTypography>
                        }
                        <MDTypography variant="body1" color="secondary" gutterBottom>
                            {isDragging1 ? 'Drop your file here' : 'Drag and drop your file here'}
                        </MDTypography>
                        <MDTypography variant="body1" color="secondary" gutterBottom>
                            OR
                        </MDTypography>
                        <MDButton variant="outlined" component="label" color="primary">
                            Upload File
                            <input
                                type="file"
                                onChange={handleFileInputChange1}
                                hidden
                            />
                        </MDButton>
                        {(uploadedMedia.length === 0) && (
                            <span role="alert" style={{ color: 'primary', fontSize: '0.8rem', marginTop: '0.8rem', display: 'block' }} >
                                Please add atleast one file
                            </span>
                        )}
                        {uploadedMedia.map((file, index) => (
                            <MDBox key={index} display="flex" alignItems="center" marginTop="10px" padding="5px" border="1px solid #ccc">
                                <MDTypography variant="body1" color="secondary" sx={{ flex: '1 1 auto' }}>
                                    {file.name}
                                </MDTypography>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteFileMedia(index, 'media')}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </MDBox>
                        ))}
                    </MDBox>
                    )}

                    {/* Drag and Drop for Thumbnail */}
                    {!editProduct && (
                    <MDBox
                        border={(isDragging2 || uploadedThumbnail.length === 0) ? '2px dashed #aaa' : '2px dashed #ccc'}
                        borderRadius="5px"
                        padding="20px"
                        marginBottom="20px"
                        textAlign="center"
                        onDragOver={(e) => handleDragEnter2(e)}
                        onDragEnter={(e) => handleDragEnter2(e)}
                        onDragLeave={(e) => handleDragLeave2(e)}
                        onDrop={(e) => handleDrop2(e)}
                    >
                        {
                            <MDTypography variant="h3" color="primary" gutterBottom>
                                Thumbnail Image
                            </MDTypography>
                        }
                        <MDTypography variant="body1" color="secondary" gutterBottom>
                            {isDragging2 ? 'Drop your file here' : 'Drag and drop your file here'}
                        </MDTypography>
                        <MDTypography variant="body1" color="secondary" gutterBottom>
                            OR
                        </MDTypography>
                        <MDButton variant="outlined" component="label" color="primary">
                            Upload File
                            <input
                                type="file"
                                onChange={handleFileInputChange2}
                                hidden
                            />
                        </MDButton>
                        {(uploadedThumbnail.length === 0) && (
                            <span role="alert" style={{ color: 'primary', fontSize: '0.8rem', marginTop: '0.8rem', display: 'block' }} >
                                Please add one file
                            </span>
                        )}
                        {uploadedThumbnail.map((file, index) => (
                            <MDBox key={index} display="flex" alignItems="center" marginTop="10px" padding="5px" border="1px solid #ccc">
                                <MDTypography variant="body1" color="secondary" sx={{ flex: '1 1 auto' }}>
                                    {file.name}
                                </MDTypography>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteFileMedia(index, 'thumbnail')}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </MDBox>
                        ))}
                    </MDBox>
                    )}

                    {/* Drag and Drop for Previews */}
                    {!editProduct && (
                    <MDBox
                        border={(isDragging3 || uploadedPreviews.length === 0) ? '2px dashed #aaa' : '2px dashed #ccc'}
                        borderRadius="5px"
                        padding="20px"
                        marginBottom="20px"
                        textAlign="center"
                        onDragOver={(e) => handleDragEnter3(e)}
                        onDragEnter={(e) => handleDragEnter3(e)}
                        onDragLeave={(e) => handleDragLeave3(e)}
                        onDrop={(e) => handleDrop3(e)}
                    >
                        {
                            <MDTypography variant="h3" color="primary" gutterBottom>
                                Preview Files
                            </MDTypography>
                        }
                        <MDTypography variant="body1" color="secondary" gutterBottom>
                            {isDragging3 ? 'Drop your file here' : 'Drag and drop your file here'}
                        </MDTypography>
                        <MDTypography variant="body1" color="secondary" gutterBottom>
                            OR
                        </MDTypography>
                        <MDButton variant="outlined" component="label" color="primary">
                            Upload File
                            <input
                                type="file"
                                onChange={handleFileInputChange3}
                                multiple
                                hidden
                            />
                        </MDButton>
                        {(uploadedPreviews.length === 0) && (
                            <span role="alert" style={{ color: 'primary', fontSize: '0.8rem', marginTop: '0.8rem', display: 'block' }} >
                                Please add atleast one file
                            </span>
                        )}
                        {uploadedPreviews.map((file, index) => (
                            <MDBox key={index} display="flex" alignItems="center" marginTop="10px" padding="5px" border="1px solid #ccc">
                                <MDTypography variant="body1" color="secondary" sx={{ flex: '1 1 auto' }}>
                                    {file.name}
                                </MDTypography>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteFileMedia(index, 'previews')}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </MDBox>
                        ))}
                    </MDBox>
                    )}
                    {errors.tags && (
                        <span role="alert" style={{ color: 'red', fontSize: '0.8rem', marginBottom: '0.8rem', display: 'block' }} >
                            {errors.tags.message}
                        </span>
                    )}
                    <TextField
                        {...register('tags', { required: 'Tags are required' })}
                        label="Tags"
                        defaultValue={product?.tags}
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            {...register('category')}
                            sx={{ padding: 1.5 }}
                            labelId="category"
                            id="category"
                            label="Category"
                            defaultValue={product?.category}
                            required
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories?.map((category) => (
                                <MenuItem value={category.id} key={category.id}>
                                    {category.type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <MDButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginRight: 2 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Send for Approval'}
                        </MDButton>
                        <MDButton
                            onClick={(e) => {
                                e.stopPropagation()
                                handleResetFiles()
                                onReset(e)
                            }}
                            color="secondary"
                        >
                            Reset
                        </MDButton>
                        <MDButton
                            onClick={(e) => {
                                e.stopPropagation()
                                handleResetFiles()
                                onReset(e)
                                onClose(e)
                            }}
                        >
                            Cancel
                        </MDButton>
                    </DialogActions>
                </form>
            </DialogContent>
            <MDSnackbar
                color={sb.color}
                icon={sb.icon}
                title={sb.title}
                content={sb.message}
                open={sb.open}
                onClose={closeSb}
                close={closeSb}
                bgWhite
            />
        </Dialog>
    )
}

export default AddEditProductModal
