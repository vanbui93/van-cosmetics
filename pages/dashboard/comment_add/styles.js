const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  tbHeadLeft: {
    width: '400px',
    background: '#f9f9f9',
    border: '1px solid #e5e5e5',
  },
  imgList: {
    display: 'flex',
  },
  thumbnail: {
    width: '120px',
    maxHeight: '120px'
  },
  imgListItemBlock: {
    display: 'block !important',
  },
  imgUpload: {
    alignItems: 'center',
    maxWidth: '128px',
    minHeight: '128px',
    border: '1px dashed #d0d5dd',
    borderRadius: '4px',
  },
  imgUploadText: {
    position: 'relative',
    width: '100%',
    height: '128px',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-1px',
      bottom: '-1px',
      left: '-1px',
      right: '-1px',
      border: '1px dashed #d0d5dd',
      zIndex: 1,
      borderRadius: '4px',
      cursor: 'pointer',
    }
  },
});

export default styles;