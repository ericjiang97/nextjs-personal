export interface Wallpapers {
  slug: string;
  wallpaperSlug: string;
  title: string;
  tags?: string[];
}

const wallpapers: Wallpapers[] = [
  {
    title: "Spring Skies",
    slug: "spring-skies",
    wallpaperSlug: "SpringSkies",
    tags: ["spring", "sky"],
  },
  {
    title: "Peach Blossom 1",
    slug: "peach-blossom-1",
    wallpaperSlug: "PeachBlossom",
    tags: ["nature", "flowers", "spring"],
  },
  {
    title: "Fumushi Inari",
    slug: "fumushi-inari-1",
    wallpaperSlug: "FumushiInari",
    tags: ["japan", "torii", "shrine", "sunset"],
  },
  {
    title: "Great Wall",
    slug: "great-wall-1",
    wallpaperSlug: "GreatWall",
    tags: ["china"],
  },
  {
    title: "Imperial Guardian Lion",
    slug: "guardian-lion-1",
    wallpaperSlug: "ImperialGuardianLion",
    tags: ["china", "forbidden city"],
  },
  {
    title: "Himeji Castle",
    slug: "himeji-castle-1",
    wallpaperSlug: "HimejiCastle",
    tags: ["japan", "castles"],
  },
  {
    title: "Mt Takao 1",
    slug: "mt-takao-1",
    wallpaperSlug: "MtTakao",
    tags: ["japan", "mountains", "nature"],
  },
  {
    title: "Hakone Ropeway",
    slug: "hakone-ropeway-1",
    wallpaperSlug: "HakoneRopeway",
    tags: ["japan", "mountains", "nature"],
  },
  {
    title: "Japan Airlines B787 at Haneda Airport",
    slug: "japan-airlines-b787-1",
    wallpaperSlug: "JapanAirlinesB787",
    tags: ["japan", "jal", "b787"],
  },
  {
    title: "Deer of Nara",
    slug: "deer-of-nara-1",
    wallpaperSlug: "DeerNara",
    tags: ["deer", "nara", "japan", "nature", "animals"],
  },
];

export default wallpapers;
