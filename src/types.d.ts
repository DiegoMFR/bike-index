export type BikeInfo = {
    date_stolen: number;
    description: string | null;
    frame_colors: string[];
    frame_model: string | null;
    id: number;
    is_stock_img: boolean;
    large_img: string;
    location_found: string | null;
    manufacturer_name: string;
    external_id: string | null;
    registry_name: string | null;
    registry_url: string | null;
    serial: string;
    status: string;
    stolen: boolean;
    stolen_coordinates: [number, number];
    stolen_location: string;
    thumb: string;
    title: string;
    url: string;
    year: number | null;
    propulsion_type_slug: string;
    cycle_type_slug: string;
  };

export interface BikeSearchResponse {
    bikes: BikeInfo[],
}

export interface SingleBikeResponse {
    bike: BikeInfo,
}

export interface BikeIndexSearchParams {
    page?: number,
    per_page?: number,
    location?: string,
    stolenness?: 'non' | 'stolen' | 'proximity',
    distance?: string,
  }