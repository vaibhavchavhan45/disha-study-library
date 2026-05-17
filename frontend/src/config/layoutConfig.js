// Layout configuration for facilities cards (10 cards total)
// Each array represents rows with number of cards in each row
// Total should equal 10 facilities

export const cardLayouts = {
  mobile: {
    cols: 2,
    rows: [2, 1, 1, 2, 2, 2]  
  },
  tablet: {
    cols: 3,
    rows: [3, 3, 1, 3] 
  },
  desktop: {
    cols: 4,
    rows: [4, 1, 1, 4] 
  }
};

// Utility function to get row slices from facilities array
export const getRowSlices = (layout, facilities) => {
  let slices = [];
  let start = 0;
  
  layout.forEach(count => {
    slices.push(facilities.slice(start, start + count));
    start += count;
  });
  
  return slices;
};

// Get grid columns className based on layout
export const getGridColsClass = (cols) => {
  const colMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  };
  return colMap[cols] || 'grid-cols-3';
};

// Get card span class for full width
export const getCardSpanClass = (cols) => {
  const spanMap = {
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4'
  };
  return spanMap[cols] || 'col-span-3';
};