interface RootObject {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Item[];
  }
  
  interface Item {
    external_urls: Externalurls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }
  
  interface Image {
    url: string;
    height: number;
    width: number;
  }
  
  interface Followers {
    href: string;
    total: number;
  }
  
  interface Externalurls {
    spotify: string;
  }