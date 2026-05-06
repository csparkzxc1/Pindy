import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import sigunguTopo from '../assets/geo/sigungu-topo.json';

export interface SigunguProps {
  code: string;       // "11010"
  name: string;       // "종로구"
  name_eng: string;   // "Jongno-gu"
  base_year: string;  // "2018"
}

// TopoJSON → GeoJSON 변환 (한 번만 실행, 모듈 로드 시)
const topology = sigunguTopo as any;
const objectKey = 'skorea_municipalities_2018_geo';

export const sigunguGeoJSON = feature(
  topology,
  topology.objects[objectKey]
) as unknown as FeatureCollection<Geometry, SigunguProps>;

export const sigunguList: Array<{
  code: string;
  name: string;
  name_eng: string;
}> = sigunguGeoJSON.features.map((f) => ({
  code: f.properties.code,
  name: f.properties.name,
  name_eng: f.properties.name_eng,
}));

export const SIGUNGU_TOTAL = sigunguList.length; // 250
