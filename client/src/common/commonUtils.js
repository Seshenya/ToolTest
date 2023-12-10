const bytesToMb = size => {
  if (typeof size === 'string') {
    size = Number(size);
  }

  return size / 1024;
};

const getFileDescription = fileFormat => {
  const fileFormats = {
    pdf: 'PDF file (.pdf)',
    doc: 'Microsoft Word document (.doc)',
    docx: 'Microsoft Word document (.docx)',
    txt: 'Text file (.txt)',
    jpg: 'JPEG image (.jpg)',
    jpeg: 'JPEG image (.jpg)',
    png: 'PNG image (.png)',
    mp3: 'MP3 audio (.mp3)',
    mp4: 'MP4 video (.mp4)',
    xls: 'Microsoft Excel spreadsheet (.xls)',
    xlsx: 'Microsoft Excel spreadsheet (.xlsx)',
    zip: 'ZIP archive (.zip)',
    other: 'Unknown file format',
  };

  // Convert the file format to lowercase for case-insensitive matching
  const lowerCaseFileFormat = fileFormat.toLowerCase();

  // Return the corresponding file description or 'Unknown' if not found
  return fileFormats[lowerCaseFileFormat] || fileFormats['other'];
};

export { bytesToMb, getFileDescription };
