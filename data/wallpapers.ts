export interface Wallpapers {
  slug: string;
  wallpaperSlug: string;
  title: string;
  tags?: string[];
  type: WallpaperType;
  extension?: "png" | "jpg",
  previewFileName?: string;
}

export type WallpaperType = "desktop" | "mobile";

const wallpapers: Wallpapers[] = [
  {
    title: "CKS Memorial Hall",
    slug: "cks-hall-taipei-1",
    wallpaperSlug: "CKS",
    tags: ["CKS", "taipei"],
    type: "desktop",
    extension: "png",
    previewFileName: "preview.png"
  },
  {
    title: "Kiyomizu-Dera Tower",
    slug: "kiyomizudera-1",
    wallpaperSlug: "kiyomizudera-1",
    tags: ["kiyomizudera", "mobile", "kyoto", "japan", "tower"],
    type: "mobile",
    extension: "jpg",
    previewFileName: "preview.png"
  },
  {
    title: "Spring Skies",
    slug: "spring-skies",
    wallpaperSlug: "SpringSkies",
    tags: ["spring", "sky"],
    type: "desktop"
  },
  {
    title: "Peach Blossom 1",
    slug: "peach-blossom-1",
    wallpaperSlug: "PeachBlossom",
    tags: ["nature", "flowers", "spring"],
    type: "desktop"
  },
  {
    title: "Fumushi Inari",
    slug: "fumushi-inari-1",
    wallpaperSlug: "FumushiInari",
    tags: ["japan", "torii", "shrine", "sunset"],
    type: "desktop"
  },
  {
    title: "Great Wall",
    slug: "great-wall-1",
    wallpaperSlug: "GreatWall",
    tags: ["china"],
    type: "desktop"
  },
  {
    title: "Imperial Guardian Lion",
    slug: "guardian-lion-1",
    wallpaperSlug: "ImperialGuardianLion",
    tags: ["china", "forbidden city"],
    type: "desktop"
  },
  {
    title: "Himeji Castle",
    slug: "himeji-castle-1",
    wallpaperSlug: "HimejiCastle",
    tags: ["japan", "castles"],
    type: "desktop"
  },
  {
    title: "Mt Takao 1",
    slug: "mt-takao-1",
    wallpaperSlug: "MtTakao",
    tags: ["japan", "mountains", "nature"],
    type: "desktop"
  },
  {
    title: "Hakone Ropeway",
    slug: "hakone-ropeway-1",
    wallpaperSlug: "HakoneRopeway",
    tags: ["japan", "mountains", "nature"],
    type: "desktop"
  },
  {
    title: "Japan Airlines B787 at Haneda Airport",
    slug: "japan-airlines-b787-1",
    wallpaperSlug: "JapanAirlinesB787",
    tags: ["japan", "jal", "b787"],
    type: "desktop"
  },
  {
    title: "Deer of Nara",
    slug: "deer-of-nara-1",
    wallpaperSlug: "DeerNara",
    tags: ["deer", "nara", "japan", "nature", "animals"],
    type: "desktop"
  },
];

export { wallpapers }
