declare module 'react-leaflet-heatmap-layer-v3' {
  import { FC } from 'react';
  import { LayerGroupProps } from 'react-leaflet';

  export interface HeatmapLayerProps extends LayerGroupProps {
    points: any[];
    longitudeExtractor: (m: any) => number;
    latitudeExtractor: (m: any) => number;
    intensityExtractor: (m: any) => number;
    radius?: number;
    max?: number;
    minOpacity?: number;
    blur?: number;
    gradient?: { [key: number]: string };
    fitBoundsOnLoad?: boolean;
    fitBoundsOnUpdate?: boolean;
  }

  export const HeatmapLayer: FC<HeatmapLayerProps>;
}
