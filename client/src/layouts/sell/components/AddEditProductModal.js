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
    const [isDragging1, setIsDragging1] = useState(false);
    const [isDragging2, setIsDragging2] = useState(false);
    const [isDragging3, setIsDragging3] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm()
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()

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
        (editProduct ? onSubmitEdit : onSubmit)(data)
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
        const files = Array.from(e.target.files);
        setUploadedMedia([...uploadedMedia, ...files]);
        setValue('media', files);
    }

    const handleFileInputChange2 = (e) => {
        console.log('File Input Change:', e.target.files)
        const files = Array.from(e.target.files);
        setUploadedThumbnail([...uploadedThumbnail, ...files]);
        setValue('thumbnail', files);
    }

    const handleFileInputChange3 = (e) => {
        console.log('File Input Change:', e.target.files)
        const files = Array.from(e.target.files);
        setUploadedPreviews([...uploadedPreviews, ...files]);
        setValue('previews', files);
    }

    const handleMediaCreation = async (formData) => {
        try {
            const response = await axiosPrivate.post('/media/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.status === 200) {
                const data = response.data
                console.log('New media created:', data)
                setOpenModal(false)
                reset()
            } else {
                console.error('Failed to create media')
            }
        } catch (error) {
            console.error('Error creating media:', error)
        }
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
        formData.append('previews', data.previews[0]) // TODO: Change this to an array of files
        formData.append('thumbnail', data.thumbnail[0])
        formData.append('category', data.category)
        formData.append('media', data.media[0])

        formData.forEach((value, key) => {
            console.log(key + ' ' + value)
        });

        handleMediaCreation(formData)

        // setOpenModal(false)
        // handleResetFiles()
        // reset()
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
                    <TextField
                        {...register('title')}
                        label="Title"
                        defaultValue={product?.title}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        {...register('price')}
                        label="Price"
                        defaultValue={product?.price}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        {...register('description')}
                        label="Description"
                        defaultValue={product?.description}
                        multiline
                        fullWidth
                        rows={6}
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <FormControl sx={{ width: 120 }}>
                        <InputLabel id="media_type">Media Type</InputLabel>
                        <Select
                            {...register('media_type')}
                            sx={{ padding: 1.5 }}
                            fullWidth
                            defaultValue={product?.media_type}
                            labelId="media_type"
                            id="media_type"
                            label="Media Type"
                            required
                        >
                            {mediaTypes?.map((mediaType) => (
                                <MenuItem value={mediaType.id}>
                                    {mediaType.type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Drag and Drop for Files */}

                    {/* Drag and Drop for Media */}
                    <MDBox
                        border={isDragging1 ? '2px dashed #aaa' : '2px dashed #ccc'}
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
                        {uploadedMedia.map((file, index) => (
                            <MDBox key={index} marginTop="10px" padding="5px" border="1px solid #ccc">
                                <MDTypography variant="body1" color="secondary">
                                    {file.name}
                                </MDTypography>
                            </MDBox>
                        ))}
                    </MDBox>


                    {/* Drag and Drop for Thumbnail */}
                    <MDBox
                        border={isDragging2 ? '2px dashed #aaa' : '2px dashed #ccc'}
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
                        {uploadedThumbnail.map((file, index) => (
                            <MDBox key={index} marginTop="10px" padding="5px" border="1px solid #ccc">
                                <MDTypography variant="body1" color="secondary">
                                    {file.name}
                                </MDTypography>
                            </MDBox>
                        ))}
                    </MDBox>


                    {/* Drag and Drop for Previews */}
                    <MDBox
                        border={isDragging3 ? '2px dashed #aaa' : '2px dashed #ccc'}
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
                                Preview Images
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
                        {uploadedPreviews.map((file, index) => (
                            <MDBox key={index} marginTop="10px" padding="5px" border="1px solid #ccc">
                                <MDTypography variant="body1" color="secondary">
                                    {file.name}
                                </MDTypography>
                            </MDBox>
                        ))}
                    </MDBox>
                    <TextField
                        {...register('tags')}
                        label="Tags"
                        defaultValue={product?.tags}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <FormControl sx={{ width: 120 }}>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            {...register('category')}
                            sx={{ padding: 1.5 }}
                            fullWidth
                            labelId="category"
                            id="category"
                            label="Category"
                            defaultValue={product?.category}
                            required
                        >
                            {categories?.map((category) => (
                                <MenuItem value={category.id}>
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
                        >
                            Send for Approval
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
        </Dialog>
    )
}

export default AddEditProductModal
