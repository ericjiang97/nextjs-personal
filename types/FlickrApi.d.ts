export interface FlickrPhotoset {
  photoset: {
    id: string;
    primary: string;
    owner: string;
    ownername: string;
    photo: FlickrPhoto[];
    page: number;
    per_page: number;
    perpage: number;
    pages: number;
    title: string;
    total: number;
  };
  stat: 'ok';
}

export interface FlickrPhoto {
  id: string;
  dateupload: string;
  farm: number;
  height_m: number;
  height_o: number;
  pathalias: string;
  secret: string;
  server: string;
  tags: string;
  title: string;
  url_m: string;
  url_o: string;
  width_m: number;
  width_o: number;
}
