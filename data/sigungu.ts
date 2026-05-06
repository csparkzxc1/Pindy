import type { FeatureCollection, Geometry } from "geojson";
import sigunguMergedGeo from "../assets/geo/sigungu-merged.json";

export interface SigunguProps {
  code: string;
  name: string;
  name_eng: string;
  base_year: string;
}

export const sigunguGeoJSON = sigunguMergedGeo as unknown as FeatureCollection<Geometry, SigunguProps>;

export const sigunguList: Array<{ code: string; name: string; name_eng: string; }> = sigunguGeoJSON.features.map((f) => ({
  code: f.properties.code,
  name: f.properties.name,
  name_eng: f.properties.name_eng,
}));

export const SIGUNGU_TOTAL = sigunguList.length;
