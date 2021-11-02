import { boot } from "quasar/wrappers";

import {
  LMap,
  LIcon,
  LTileLayer,
  LControl,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle,
  LFeatureGroup,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default boot(async ({ app }) => {
  app.component("l-map", LMap);
  app.component("l-control", LControl);
  app.component("l-Feature-group", LFeatureGroup);
  app.component("l-tile-layer", LTileLayer);
  app.component("l-marker", LMarker);
  app.component("l-icon", LIcon);
  app.component("l-control-layers", LControlLayers);
  app.component("l-tooltip", LTooltip);
  app.component("l-popup", LPopup);
  app.component("l-polyline", LPolyline);
  app.component("l-polygon", LPolygon);
  app.component("l-reatangle", LRectangle);
});
