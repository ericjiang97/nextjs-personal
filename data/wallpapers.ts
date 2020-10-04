interface Wallpaper {
  meta: {
    colorType: 'P3' | 'SRGB';
    hdRes?: '4K' | '5K' | '6K';
  };
  title: string;
  resolution: string;
  screenType: 'XDR' | 'iMacPro' | 'MacBookPro' | 'Desktop';
}

interface WallpaperGroup {
  wallpapers: Wallpaper[];
  slug: string;
  wallpaperSlug: string;
  title: string;
  previewUrl: string;
}

const wallpapers: WallpaperGroup[] = [
  {
    title: 'Spring Skies',
    slug: 'spring-skies',
    previewUrl: '/downloads/wallpapers/spring-skies/SpringSkies_preview.webp',
    wallpaperSlug: 'SpringSkies',
    wallpapers: [
      {
        title: 'XDR',
        meta: {
          colorType: 'P3',
          hdRes: '6K',
        },
        resolution: '6016x3384',
        screenType: 'XDR',
      },
      {
        title: 'XDR',
        meta: {
          colorType: 'SRGB',
          hdRes: '6K',
        },
        resolution: '6016x3384',
        screenType: 'XDR',
      },
      {
        title: 'iMac',
        meta: {
          colorType: 'P3',
          hdRes: '5K',
        },
        resolution: '5120x2880',
        screenType: 'iMacPro',
      },
      {
        title: 'MacBook Pro',
        meta: {
          colorType: 'P3',
        },
        resolution: '2560x1600',
        screenType: 'MacBookPro',
      },
      {
        title: '4K Display',
        meta: {
          colorType: 'SRGB',
          hdRes: '4K',
        },
        resolution: '3840x2160',
        screenType: 'Desktop',
      },
      {
        title: '1440p Display',
        meta: {
          colorType: 'SRGB',
        },
        resolution: '2560x1440',
        screenType: 'Desktop',
      },
      {
        title: '1080p Display',
        meta: {
          colorType: 'SRGB',
        },
        resolution: '1920x1080',
        screenType: 'Desktop',
      },
    ],
  },
  {
    title: 'Peach Blossom 1',
    slug: 'peach-blossom-1',
    previewUrl: '/downloads/wallpapers/peach-blossom-1/preview.webp',
    wallpaperSlug: 'PeachBlossom',
    wallpapers: [
      {
        title: 'XDR',
        meta: {
          colorType: 'P3',
          hdRes: '6K',
        },
        resolution: '6016x3384',
        screenType: 'XDR',
      },
      {
        title: 'iMac',
        meta: {
          colorType: 'P3',
          hdRes: '5K',
        },
        resolution: '5120x2880',
        screenType: 'iMacPro',
      },
      {
        title: 'MacBook Pro',
        meta: {
          colorType: 'P3',
        },
        resolution: '2560x1600',
        screenType: 'MacBookPro',
      },
      {
        title: '4K Display',
        meta: {
          colorType: 'SRGB',
          hdRes: '4K',
        },
        resolution: '3840x2160',
        screenType: 'Desktop',
      },
      {
        title: '1440p Display',
        meta: {
          colorType: 'SRGB',
        },
        resolution: '2560x1440',
        screenType: 'Desktop',
      },
      {
        title: '1080p Display',
        meta: {
          colorType: 'SRGB',
        },
        resolution: '1920x1080',
        screenType: 'Desktop',
      },
    ],
  },
  {
    title: 'Fumushi Inari',
    slug: 'fumushi-inari-1',
    previewUrl: '/downloads/wallpapers/fumushi-inari-1/preview.webp',
    wallpaperSlug: 'FumushiInari',
    wallpapers: [
      {
        title: 'XDR',
        meta: {
          colorType: 'P3',
          hdRes: '6K',
        },
        resolution: '6016x3384',
        screenType: 'XDR',
      },
      {
        title: 'iMac',
        meta: {
          colorType: 'P3',
          hdRes: '5K',
        },
        resolution: '5120x2880',
        screenType: 'iMacPro',
      },
      {
        title: 'MacBook Pro',
        meta: {
          colorType: 'P3',
        },
        resolution: '2560x1600',
        screenType: 'MacBookPro',
      },
      {
        title: '4K Display',
        meta: {
          colorType: 'SRGB',
          hdRes: '4K',
        },
        resolution: '3840x2160',
        screenType: 'Desktop',
      },
      {
        title: '1440p Display',
        meta: {
          colorType: 'SRGB',
        },
        resolution: '2560x1440',
        screenType: 'Desktop',
      },
      {
        title: '1080p Display',
        meta: {
          colorType: 'SRGB',
        },
        resolution: '1920x1080',
        screenType: 'Desktop',
      },
    ],
  },
  {
    title: 'Great Wall',
    slug: 'great-wall-1',
    previewUrl: '/downloads/wallpapers/great-wall-1/preview.webp',
    wallpaperSlug: 'GreatWall',
    wallpapers: [
      {
        title: 'XDR',
        meta: {
          colorType: 'P3',
          hdRes: '6K',
        },
        resolution: '6016x3384',
        screenType: 'XDR',
      },
      {
        title: 'iMac',
        meta: {
          colorType: 'P3',
          hdRes: '5K',
        },
        resolution: '5120x2880',
        screenType: 'iMacPro',
      },
      {
        title: 'MacBook Pro',
        meta: {
          colorType: 'P3',
        },
        resolution: '2560x1600',
        screenType: 'MacBookPro',
      },
      {
        title: '4K Display',
        meta: {
          colorType: 'SRGB',
          hdRes: '4K',
        },
        resolution: '3840x2160',
        screenType: 'Desktop',
      },
      {
        title: '1440p Display',
        meta: {
          colorType: 'SRGB',
        },
        resolution: '2560x1440',
        screenType: 'Desktop',
      },
      {
        title: '1080p Display',
        meta: {
          colorType: 'SRGB',
        },
        resolution: '1920x1080',
        screenType: 'Desktop',
      },
    ],
  },
];

export default wallpapers;
