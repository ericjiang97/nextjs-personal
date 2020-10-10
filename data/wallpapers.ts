interface Wallpaper {
  title: string;
  resolution: string;
  screenType: 'XDR' | 'iMacPro' | 'MacBookPro' | 'Desktop';
}

interface DeviceGroup {
  groupName: 'Apple Devices' | 'Other Devices';
  colorSpace: 'P3' | 'SRGB';
  wallpapers: Wallpaper[];
}

export interface WallpaperGroup {
  wallpapers: DeviceGroup[];
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
        groupName: 'Apple Devices',
        colorSpace: 'P3',
        wallpapers: [
          {
            title: 'XDR',
            resolution: '6016x3384',
            screenType: 'XDR',
          },
          {
            title: 'iMac',
            resolution: '5120x2880',
            screenType: 'iMacPro',
          },
          {
            title: 'MacBook Pro',
            resolution: '2560x1600',
            screenType: 'MacBookPro',
          },
        ],
      },
      {
        groupName: 'Other Devices',
        colorSpace: 'SRGB',
        wallpapers: [
          {
            title: '4K',
            resolution: '3840x2160',
            screenType: 'Desktop',
          },
          {
            title: '1440p',
            resolution: '2560x1440',
            screenType: 'Desktop',
          },
          {
            title: '1080p',
            resolution: '1920x1080',
            screenType: 'Desktop',
          },
        ],
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
        groupName: 'Apple Devices',
        colorSpace: 'P3',
        wallpapers: [
          {
            title: 'XDR',
            resolution: '6016x3384',
            screenType: 'XDR',
          },
          {
            title: 'iMac',
            resolution: '5120x2880',
            screenType: 'iMacPro',
          },
          {
            title: 'MacBook Pro',
            resolution: '2560x1600',
            screenType: 'MacBookPro',
          },
        ],
      },
      {
        groupName: 'Other Devices',
        colorSpace: 'SRGB',
        wallpapers: [
          {
            title: '4K',
            resolution: '3840x2160',
            screenType: 'Desktop',
          },
          {
            title: '1440p',
            resolution: '2560x1440',
            screenType: 'Desktop',
          },
          {
            title: '1080p',
            resolution: '1920x1080',
            screenType: 'Desktop',
          },
        ],
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
        groupName: 'Apple Devices',
        colorSpace: 'P3',
        wallpapers: [
          {
            title: 'XDR',
            resolution: '6016x3384',
            screenType: 'XDR',
          },
          {
            title: 'iMac',
            resolution: '5120x2880',
            screenType: 'iMacPro',
          },
          {
            title: 'MacBook Pro',
            resolution: '2560x1600',
            screenType: 'MacBookPro',
          },
        ],
      },
      {
        groupName: 'Other Devices',
        colorSpace: 'SRGB',
        wallpapers: [
          {
            title: '4K',
            resolution: '3840x2160',
            screenType: 'Desktop',
          },
          {
            title: '1440p',
            resolution: '2560x1440',
            screenType: 'Desktop',
          },
          {
            title: '1080p',
            resolution: '1920x1080',
            screenType: 'Desktop',
          },
        ],
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
        groupName: 'Apple Devices',
        colorSpace: 'P3',
        wallpapers: [
          {
            title: 'XDR',
            resolution: '6016x3384',
            screenType: 'XDR',
          },
          {
            title: 'iMac',
            resolution: '5120x2880',
            screenType: 'iMacPro',
          },
          {
            title: 'MacBook Pro',
            resolution: '2560x1600',
            screenType: 'MacBookPro',
          },
        ],
      },
      {
        groupName: 'Other Devices',
        colorSpace: 'SRGB',
        wallpapers: [
          {
            title: '4K',
            resolution: '3840x2160',
            screenType: 'Desktop',
          },
          {
            title: '1440p',
            resolution: '2560x1440',
            screenType: 'Desktop',
          },
          {
            title: '1080p',
            resolution: '1920x1080',
            screenType: 'Desktop',
          },
        ],
      },
    ],
  },
  {
    title: 'Imperial Guardian Lion',
    slug: 'guardian-lion-1',
    wallpaperSlug: 'ImperialGuardianLion',
    tags: ['china', 'forbidden city'],
    wallpapers: [
      {
        groupName: 'Apple Devices',
        colorSpace: 'P3',
        wallpapers: [
          {
            title: 'XDR',
            resolution: '6016x3384',
            screenType: 'XDR',
          },
          {
            title: 'iMac',
            resolution: '5120x2880',
            screenType: 'iMacPro',
          },
          {
            title: 'MacBook Pro',
            resolution: '2560x1600',
            screenType: 'MacBookPro',
          },
        ],
      },
      {
        groupName: 'Other Devices',
        colorSpace: 'SRGB',
        wallpapers: [
          {
            title: '4K',
            resolution: '3840x2160',
            screenType: 'Desktop',
          },
          {
            title: '1440p',
            resolution: '2560x1440',
            screenType: 'Desktop',
          },
          {
            title: '1080p',
            resolution: '1920x1080',
            screenType: 'Desktop',
          },
        ],
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
        groupName: 'Apple Devices',
        colorSpace: 'P3',
        wallpapers: [
          {
            title: 'XDR',
            resolution: '6016x3384',
            screenType: 'XDR',
          },
          {
            title: 'iMac',
            resolution: '5120x2880',
            screenType: 'iMacPro',
          },
          {
            title: 'MacBook Pro',
            resolution: '2560x1600',
            screenType: 'MacBookPro',
          },
        ],
      },
      {
        groupName: 'Other Devices',
        colorSpace: 'P3',
        wallpapers: [
          {
            title: '4K',
            resolution: '3840x2160',
            screenType: 'Desktop',
          },
          {
            title: '1440p',
            resolution: '2560x1440',
            screenType: 'Desktop',
          },
          {
            title: '1080p',
            resolution: '1920x1080',
            screenType: 'Desktop',
          },
        ],
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
        groupName: 'Apple Devices',
        colorSpace: 'P3',
        wallpapers: [
          {
            title: 'XDR',
            resolution: '6016x3384',
            screenType: 'XDR',
          },
          {
            title: 'iMac',
            resolution: '5120x2880',
            screenType: 'iMacPro',
          },
          {
            title: 'MacBook Pro',
            resolution: '2560x1600',
            screenType: 'MacBookPro',
          },
        ],
      },
      {
        groupName: 'Other Devices',
        colorSpace: 'SRGB',
        wallpapers: [
          {
            title: '4K',
            resolution: '3840x2160',
            screenType: 'Desktop',
          },
          {
            title: '1440p',
            resolution: '2560x1440',
            screenType: 'Desktop',
          },
          {
            title: '1080p',
            resolution: '1920x1080',
            screenType: 'Desktop',
          },
        ],
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
        groupName: 'Apple Devices',
        colorSpace: 'P3',
        wallpapers: [
          {
            title: 'XDR',
            resolution: '6016x3384',
            screenType: 'XDR',
          },
          {
            title: 'iMac',
            resolution: '5120x2880',
            screenType: 'iMacPro',
          },
          {
            title: 'MacBook Pro',
            resolution: '2560x1600',
            screenType: 'MacBookPro',
          },
        ],
      },
      {
        groupName: 'Other Devices',
        colorSpace: 'SRGB',
        wallpapers: [
          {
            title: '4K',
            resolution: '3840x2160',
            screenType: 'Desktop',
          },
          {
            title: '1440p',
            resolution: '2560x1440',
            screenType: 'Desktop',
          },
          {
            title: '1080p',
            resolution: '1920x1080',
            screenType: 'Desktop',
          },
        ],
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
        groupName: 'Apple Devices',
        colorSpace: 'P3',
        wallpapers: [
          {
            title: 'XDR',
            resolution: '6016x3384',
            screenType: 'XDR',
          },
          {
            title: 'iMac',
            resolution: '5120x2880',
            screenType: 'iMacPro',
          },
          {
            title: 'MacBook Pro',
            resolution: '2560x1600',
            screenType: 'MacBookPro',
          },
        ],
      },
      {
        groupName: 'Other Devices',
        colorSpace: 'SRGB',
        wallpapers: [
          {
            title: '4K',
            resolution: '3840x2160',
            screenType: 'Desktop',
          },
          {
            title: '1440p',
            resolution: '2560x1440',
            screenType: 'Desktop',
          },
          {
            title: '1080p',
            resolution: '1920x1080',
            screenType: 'Desktop',
          },
        ],
      },
    ],
  },
  {
    title: 'Deer of Nara',
    slug: 'deer-of-nara-1',
    wallpaperSlug: 'DeerNara',
    tags: ['deer', 'nara', 'japan', 'nature', 'animals'],
    wallpapers: [
      {
        groupName: 'Apple Devices',
        colorSpace: 'P3',
        wallpapers: [
          {
            title: 'XDR',
            resolution: '6016x3384',
            screenType: 'XDR',
          },
          {
            title: 'iMac',
            resolution: '5120x2880',
            screenType: 'iMacPro',
          },
          {
            title: 'MacBook Pro',
            resolution: '2560x1600',
            screenType: 'MacBookPro',
          },
        ],
      },
      {
        groupName: 'Other Devices',
        colorSpace: 'SRGB',
        wallpapers: [
          {
            title: '4K',
            resolution: '3840x2160',
            screenType: 'Desktop',
          },
          {
            title: '1440p',
            resolution: '2560x1440',
            screenType: 'Desktop',
          },
          {
            title: '1080p',
            resolution: '1920x1080',
            screenType: 'Desktop',
          },
        ],
      },
    ],
  },
];

export default wallpapers;
