import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material'
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton'
import MDTypography from 'components/MDTypography'
import React, { useState } from 'react'

const AddEditProductModal = ({
    openModal,
    onClose,
    onReset,
    onSubmit,
    setValue,
    register,
}) => {
    const [isDragging, setIsDragging] = useState(false)

    const handleDragEnter = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)

        const files = e.dataTransfer.files
        console.log('Dropped files:', files)
    }

    return (
        <Dialog
            open={openModal}
            onClose={onClose}
            fullScreen
            onClick={(e) => e.stopPropagation()}
        >
            <DialogTitle id="update-status-title">Add New Item</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <TextField
                        {...register('title')}
                        label="Title"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        {...register('price')}
                        label="Price"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        {...register('description')}
                        label="Description"
                        multiline
                        fullWidth
                        rows={6}
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        {...register('media_type')}
                        select
                        label="Media Type"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        SelectProps={{
                            native: true,
                        }}
                        sx={{ marginBottom: 2 }}
                    >
                        <option value="1">Social Media</option>
                        <option value="2">Tech</option>
                        <option value="3">Flowers</option>
                    </TextField>
                    {/* Drag and Drop for Files */}
                    <MDBox
                        border={
                            isDragging ? '2px dashed #aaa' : '2px dashed #ccc'
                        }
                        borderRadius="5px"
                        padding="20px"
                        marginBottom="20px"
                        textAlign="center"
                        onDragOver={(e) => handleDragEnter(e)}
                        onDragEnter={(e) => handleDragEnter(e)}
                        onDragLeave={(e) => handleDragLeave(e)}
                        onDrop={(e) => handleDrop(e)}
                    >
                        <MDTypography
                            variant="body1"
                            color="textSecondary"
                            gutterBottom
                        >
                            {isDragging
                                ? 'Drop your file here'
                                : 'Drag and drop your file here'}
                        </MDTypography>
                        <MDTypography
                            variant="body1"
                            color="textSecondary"
                            gutterBottom
                        >
                            OR
                        </MDTypography>
                        <MDButton
                            variant="outlined"
                            component="label"
                            color="primary"
                        >
                            Upload File
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0]
                                    setValue('file', file)
                                }}
                                hidden
                            />
                        </MDButton>
                    </MDBox>
                    <TextField
                        {...register('tags')}
                        label="Tags"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        {...register('category')}
                        select
                        label="Category"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        SelectProps={{
                            native: true,
                        }}
                        sx={{ marginBottom: 2 }}
                    >
                        <option value="Image">Image</option>
                        <option value="Video">Video</option>
                        <option value="Audio">Audio</option>
                    </TextField>
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
                                onReset(e)
                            }}
                            color="secondary"
                        >
                            Reset
                        </MDButton>
                        <MDButton
                            onClick={(e) => {
                                e.stopPropagation()
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
