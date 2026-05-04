import selfPhoto   from '../../assets/self/self.webp';
import admin1Photo from '../../assets/admin/admin1.webp';
import admin2Photo from '../../assets/admin/admin2.webp';

const photoMap = {
  1: selfPhoto,
  2: admin1Photo,
  3: admin2Photo,
};

// Passing admin.id, it returns the hardcoded imported photo
export const getAdminPhoto = (adminId) => photoMap[adminId] ?? null;