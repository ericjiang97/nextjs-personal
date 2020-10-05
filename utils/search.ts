import { WallpaperGroup } from '../data/wallpapers';

export const wallpaperSearch = (searchTerm: string, items: WallpaperGroup[]) => {
  if (searchTerm === '') {
    return items;
  }
  const results = [...items].filter((element) => {
    if (element.tags?.includes(searchTerm)) {
      return true;
    }
    return element.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return results;
};
