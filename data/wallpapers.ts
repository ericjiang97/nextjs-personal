interface Wallpaper {
  meta: {
    colorType: 'P3' | 'sRGB';
    hdRes?: '4K' | '5K' | '6K';
  };
  title: string;
  downloadUrl: string;
  resolution: string;
}

interface WallpaperGroup {
  wallpapers: Wallpaper[];
  title: string;
  previewUrl: string;
}

const wallpapers: WallpaperGroup[] = [
  {
    title: 'Spring Skies',
    previewUrl: '/downloads/wallpapers/spring-skies/SpringSkies_preview.webp',
    wallpapers: [
      {
        title: 'XDR',
        meta: {
          colorType: 'P3',
          hdRes: '6K',
        },
        resolution: '6016 x 3384',
        downloadUrl: '/downloads/wallpapers/spring-skies/SpringSkies_ProXDR_P3_6016x3384.jpg',
      },
      {
        title: 'XDR',
        meta: {
          colorType: 'sRGB',
          hdRes: '6K',
        },
        resolution: '6016 x 3384',
        downloadUrl: '/downloads/wallpapers/spring-skies/SpringSkies_ProXDR_6016x3384.jpg',
      },
      {
        title: 'iMac',
        meta: {
          colorType: 'P3',
          hdRes: '5K',
        },
        resolution: '5120 x 2880',
        downloadUrl: '/downloads/wallpapers/spring-skies/SpringSkies_iMacPro_P3_5120x2880.jpg',
      },
      {
        title: 'MacBook Pro',
        meta: {
          colorType: 'P3',
        },
        resolution: '2560 x 1600',
        downloadUrl: '/downloads/wallpapers/spring-skies/SpringSkies_MacbookProAIr_P3_2560x1600.jpg',
      },
      {
        title: '4K Display',
        meta: {
          colorType: 'sRGB',
          hdRes: '4K',
        },
        resolution: '3840 x 2160',
        downloadUrl: '/downloads/wallpapers/spring-skies/SpringSkies_Desktop_4k_3840x2160.jpg',
      },
      {
        title: '1440p Display',
        meta: {
          colorType: 'sRGB',
        },
        resolution: '2560 x 1440',
        downloadUrl: '/downloads/wallpapers/spring-skies/SpringSkies_Desktop_SRGB_2560x1440.jpg',
      },
      {
        title: '1080p Display',
        meta: {
          colorType: 'sRGB',
        },
        resolution: '1920 x 1080',
        downloadUrl: '/downloads/wallpapers/spring-skies/SpringSkies_Desktop_SRGB_1920x1080.jpg',
      },
    ],
  },
  {
    title: 'Peach Blossom 1',
    previewUrl: '/downloads/wallpapers/peach-blossom-1/preview.webp',
    wallpapers: [
      {
        title: 'XDR',
        meta: {
          colorType: 'P3',
          hdRes: '6K',
        },
        resolution: '6016 x 3384',
        downloadUrl: '/downloads/wallpapers/peach-blossom-1/PeachBlossom_ProXDR_P3_6016x3384.jpg',
      },
      {
        title: 'iMac',
        meta: {
          colorType: 'P3',
          hdRes: '5K',
        },
        resolution: '5120 x 2880',
        downloadUrl: '/downloads/wallpapers/peach-blossom-1/PeachBlossom_iMacPro_P3_5120x2880.jpg',
      },
      {
        title: 'MacBook Pro',
        meta: {
          colorType: 'P3',
        },
        resolution: '2560 x 1600',
        downloadUrl: '/downloads/wallpapers/peach-blossom-1/PeachBlossom_MacbookProAIr_P3_2560x1600.jpg',
      },
      {
        title: '4K Display',
        meta: {
          colorType: 'sRGB',
          hdRes: '4K',
        },
        resolution: '3840 x 2160',
        downloadUrl: '/downloads/wallpapers/peach-blossom-1/PeachBlossom_Desktop_4k_3840x2160.jpg',
      },
      {
        title: '1440p Display',
        meta: {
          colorType: 'sRGB',
        },
        resolution: '2560 x 1440',
        downloadUrl: '/downloads/wallpapers/peach-blossom-1/PeachBlossom_Desktop_SRGB_2560x1440.jpg',
      },
      {
        title: '1080p Display',
        meta: {
          colorType: 'sRGB',
        },
        resolution: '1920 x 1080',
        downloadUrl: '/downloads/wallpapers/peach-blossom-1/PeachBlossom_Desktop_SRGB_1920x1080.jpg',
      },
    ],
  },
];

export default wallpapers;
