import selfPhoto   from '../../assets/self/self.png';
import admin1Photo from '../../assets/admin/admin1.png';
import admin2Photo from '../../assets/admin/admin2.png';

const photoMap = {
  1: selfPhoto,
  2: admin1Photo,
  3: admin2Photo,
};

// Pass admin.id — returns the hardcoded imported photo
export const getAdminPhoto = (adminId) => photoMap[adminId] ?? null;