interface Wallpaper {
  meta: {
    colorType: 'P3' | 'SRGB';
    hdRes?: '4K' | '5K' | '6K';
  };
  title: string;
  resolution: string;
  screenType: 'XDR' | 'iMacPro' | 'MacBookPro' | 'Desktop';
}

export interface WallpaperGroup {
  wallpapers: Wallpaper[];
  slug: string;
  wallpaperSlug: string;
  title: string;
  tags?: string[];
}

const wallpapers: WallpaperGroup[] = [
  {
    title: 'Spring Skies',
    slug: 'spring-skies',
    wallpaperSlug: 'SpringSkies',
    tags: ['spring', 'sky'],
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
    wallpaperSlug: 'PeachBlossom',
    tags: ['nature', 'flowers', 'spring'],
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
    wallpaperSlug: 'FumushiInari',
    tags: ['japan', 'torii', 'shrine', 'sunset'],
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
    wallpaperSlug: 'GreatWall',
    tags: ['china'],
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
    title: 'Himeji Castle',
    slug: 'himeji-castle-1',
    wallpaperSlug: 'HimejiCastle',
    tags: ['japan', 'castles'],
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
    title: 'Mt Takao 1',
    slug: 'mt-takao-1',
    wallpaperSlug: 'MtTakao',
    tags: ['japan', 'mountains', 'nature'],
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
    title: 'Hakone Ropeway',
    slug: 'hakone-ropeway-1',
    wallpaperSlug: 'HakoneRopeway',
    tags: ['japan', 'mountains', 'nature'],
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
    title: 'Japan Airlines B787 at Haneda Airport',
    slug: 'japan-airlines-b787-1',
    wallpaperSlug: 'JapanAirlinesB787',
    tags: ['japan', 'jal', 'b787'],
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
  ,
  {
    title: 'Deer of Nara',
    slug: 'deer-of-nara-1',
    wallpaperSlug: 'DeerNara',
    tags: ['deer', 'nara', 'japan', 'nature', 'animals'],
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
