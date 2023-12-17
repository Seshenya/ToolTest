// react-router-dom components
import { Link, useNavigate } from 'react-router-dom'

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Icon from '@mui/material/Icon'
import Tooltip from '@mui/material/Tooltip'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDButton from 'components/MDButton'
import MDInput from 'components/MDInput'
import { IconButton } from '@mui/material'
import MDBadge from 'components/MDBadge'
import { statusColors } from 'constants/DummyProducts'
import AddEditProductModal from 'layouts/sell/components/AddEditProductModal'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import imageFallback from 'assets/images/fallback/image_fallback.jpg'
import videoFallback from 'assets/images/fallback/video_fallback.jpg'
import audioFallback from 'assets/images/fallback/audio_fallback.png'

function ProductCard({
    image,
    title,
    description,
    price,
    media_type,
    tags,
    category,
    action,
    deleteBtn,
    discountCode,
    editBtn,
    status,
    collabBtn,
    productId,
    product,
}) {
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [discountOpen, setDiscountOpen] = useState(false)
    const navigate = useNavigate()

    const fallbackImages = {
        1: imageFallback,
        2: audioFallback,
        3: videoFallback,
        4: imageFallback,
    }

    const [openModal, setOpenModal] = useState(false)
    const { register, handleSubmit, reset, setValue } = useForm()

    const handleModalOpen = () => {
        setOpenModal(true)
    }

    const handleModalClose = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        reset({
            title,
            price,
            description,
            media_type,
            tags,
            category,
        })
    }, [])

    // const renderAuthors = authors.map(({ image: media, name }) => (
    //   <Tooltip key={name} title={name} placement="bottom">
    //     <MDAvatar
    //       src={media}
    //       alt={name}
    //       size="xs"
    //       sx={({ borders: { borderWidth }, palette: { white } }) => ({
    //         border: `${borderWidth[2]} solid ${white.main}`,
    //         cursor: "pointer",
    //         position: "relative",
    //         ml: -1.25,
    //         "&:hover, &:focus": {
    //           zIndex: "10",
    //         },
    //       })}
    //     />
    //   </Tooltip>
    // ));

    const handleClick = () => {
        navigate(`/shop/${productId}`)
    }

    const handleImageLoadError = (e) => {
        const mediaType = product.media_type || 4;
        e.target.src = fallbackImages[mediaType];
    }

    const onSubmit = (data) => {}

    const handleFormReset = () => {
        reset()
    }

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'transparent',
                // boxShadow: 'none',
                overflow: 'visible',
                cursor: 'pointer',
                boxShadow: '0 0 20px 3px #5e5e5e0f',
                ':hover': {
                    boxShadow: '0px 10px 20px 3px #0000000f',
                },
            }}
            onClick={handleClick}
        >
            <MDBox position="relative" width="100.25%" borderRadius="xl">
                <CardMedia
                    src={image}
                    component="img"
                    onError={handleImageLoadError}
                    title={title}
                    sx={{
                        width: '100%',
                        height: '20vh',
                        margin: 0,
                        // boxShadow: ({ boxShadows: { md } }) => md,
                        objectFit: 'cover',
                        objectPosition: 'center',
                        textAlign: 'center',
                        borderRadius: '0.75rem 0.75rem 0 0',
                    }}
                />
            </MDBox>
            <MDBox mt={1} mx={0.5} padding={2}>
                <MDBox mb={1}>
                    {action ? (
                        action.type === 'internal' ? (
                            <MDTypography
                                component={Link}
                                to={action.route}
                                variant="h5"
                                textTransform="capitalize"
                            >
                                {title}
                            </MDTypography>
                        ) : (
                            <MDTypography
                                component="a"
                                href={action.route}
                                target="_blank"
                                rel="noreferrer"
                                variant="h5"
                                textTransform="capitalize"
                            >
                                {title}
                            </MDTypography>
                        )
                    ) : null}
                </MDBox>
                <MDBox mb={3} lineHeight={0}>
                    <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="text"
                    >
                        {description}
                    </MDTypography>
                </MDBox>
                <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {status ? (
                        <MDBadge
                            badgeContent={status}
                            color={statusColors[status]}
                            variant="gradient"
                            size="sm"
                        />
                    ) : null}
                    {action ? (
                        action.type === 'internal' ? (
                            <MDButton
                                component={Link}
                                to={action.route}
                                variant="outlined"
                                size="small"
                                color={action.color}
                            >
                                {action.label}
                            </MDButton>
                        ) : (
                            <MDButton
                                component="a"
                                href={action.route}
                                target="_blank"
                                rel="noreferrer"
                                variant="outlined"
                                size="small"
                                color={action.color}
                            >
                                {action.label}
                            </MDButton>
                        )
                    ) : null}
                    {/* <MDBox display="flex">{renderAuthors}</MDBox> */}
                    <MDBox display="flex" justifyContent="space-evenly" gap={2}>
                        {editBtn ? (
                            <Tooltip
                                key={'edit'}
                                title={'Edit'}
                                placement="bottom"
                            >
                                <IconButton
                                    size={'small'}
                                    color={'info'}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleModalOpen()
                                    }}
                                >
                                    <Icon>edit</Icon>
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        {deleteBtn ? (
                            <Tooltip
                                key={'delete'}
                                title={'Delete'}
                                placement="bottom"
                            >
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setDeleteOpen(true)
                                    }}
                                    size={'small'}
                                    color={'error'}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        <Dialog
                            open={deleteOpen}
                            onClose={() => setDeleteOpen(false)}
                            aria-labelledby="delete-title"
                            aria-describedby="delete-description"
                        >
                            <DialogTitle id="delete-title">
                                Are you sure ?
                            </DialogTitle>
                            <DialogActions>
                                <MDButton onClick={() => setDeleteOpen(false)}>
                                    Yes
                                </MDButton>
                                <MDButton onClick={() => setDeleteOpen(false)}>
                                    No
                                </MDButton>
                            </DialogActions>
                        </Dialog>
                        {discountCode ? (
                            <Tooltip
                                key={'discount'}
                                title={'Generate Discount Code'}
                                placement="bottom"
                            >
                                <IconButton
                                    onClick={() => setDiscountOpen(true)}
                                    size={'small'}
                                    color={'info'}
                                >
                                    <Icon>discount</Icon>
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        {collabBtn ? (
                            <Tooltip
                                key={'collabSpace'}
                                title={'Open Collab Space'}
                                placement="bottom"
                            >
                                <Icon>folder_shared</Icon>
                            </Tooltip>
                        ) : null}
                        <Dialog
                            open={discountOpen}
                            onClose={() => setDiscountOpen(false)}
                            aria-labelledby="delete-title"
                            aria-describedby="delete-description"
                        >
                            <DialogTitle id="delete-title">
                                Generate Discount Code
                            </DialogTitle>
                            <DialogContent>
                                <MDInput
                                    startDecorator={'A'}
                                    type="number"
                                    sx={{ width: '100%', marginTop: 2 }}
                                    label={'Amount'}
                                />
                                <MDBox display="flex">
                                    <MDTypography variant={'title'} mt={1}>
                                        AJHSG12312
                                    </MDTypography>
                                    <Icon
                                        sx={{ marginTop: 1.5, marginLeft: 1 }}
                                    >
                                        copy
                                    </Icon>
                                </MDBox>
                            </DialogContent>
                            <DialogActions>
                                <MDButton
                                    sx={{ width: '100%' }}
                                    color="primary"
                                    variant="gradient"
                                    onClick={() => setDiscountOpen(false)}
                                >
                                    Generate
                                </MDButton>
                            </DialogActions>
                        </Dialog>
                    </MDBox>
                </MDBox>
            </MDBox>
            <AddEditProductModal
                openModal={openModal}
                onClose={handleModalClose}
                onReset={handleFormReset}
                onSubmit={handleSubmit(onSubmit)}
                setValue={setValue}
                register={register}
            />
        </Card>
    )
}

// Setting default values for the props of ProductCard
ProductCard.defaultProps = {
    authors: [],
}

// Typechecking props for the ProductCard
ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    action: PropTypes.shape({
        type: PropTypes.oneOf(['external', 'internal']),
        route: PropTypes.string.isRequired,
        color: PropTypes.oneOf([
            'primary',
            'secondary',
            'info',
            'success',
            'warning',
            'error',
            'light',
            'dark',
            'white',
        ]).isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    authors: PropTypes.arrayOf(PropTypes.object),
}

export default ProductCard;
