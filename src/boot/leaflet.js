import { boot } from "quasar/wrappers";

import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default boot(async ({ app }) => {
  app.component("l-map", LMap);
  app.component("l-tile-layer", LTileLayer);
  app.component("l-marker", LMarker);
  app.component("l-icon", LIcon);
  app.component("l-control-layers", LControlLayers);
  app.component("l-tool-tip", LTooltip);
  app.component("l-popup", LPopup);
  app.component("l-polyline", LPolyline);
  app.component("l-polygon", LPolygon);
  app.component("l-reatangle", LRectangle);
});
