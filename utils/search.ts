import { WallpaperGroup } from '../data/wallpapers';

export const wallpaperSearch = (searchTerm: string, items: WallpaperGroup[]) => {
  const searchTarget = searchTerm.toLowerCase();
  if (searchTarget === '') {
    return items;
  }
  const results = items.filter((element) => {
    if (element.tags?.includes(searchTarget)) {
      return true;
    }
    return element.title.toLowerCase().includes(searchTarget);
  });
  return results;
};
