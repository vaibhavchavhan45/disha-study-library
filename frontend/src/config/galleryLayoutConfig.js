export const galleryRowPattern = [2, 1, 3, 2, 1, 3, 2, 1, 2, 1];
export const mobileGalleryPattern = [1,2,2,1,1,2,1,2,2,1,1,2];

export const getGalleryRowSlices = (images, isMobile = false) => {
  const pattern = isMobile ? mobileGalleryPattern : galleryRowPattern;

  let slices = [];
  let start = 0;

  pattern.forEach(count => {
    if (start >= images.length) return;
    slices.push(images.slice(start, start + count));
    start += count;
  });

  return slices;
};

export const getGalleryGridColsClass = (count) => {
  const colMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
  };
  return colMap[count] || 'grid-cols-2';
};