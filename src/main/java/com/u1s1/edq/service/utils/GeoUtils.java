package com.u1s1.edq.service.utils;

import com.u1s1.edq.entity.GeoPolygon;
import com.u1s1.edq.entity.GeoVertex;
import org.locationtech.jts.algorithm.match.HausdorffSimilarityMeasure;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Polygon;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class GeoUtils {

    private GeometryFactory geoFactory;
    private HausdorffSimilarityMeasure hausdorffMeasure;

    public GeoUtils() {
        this.geoFactory = new GeometryFactory();
        this.hausdorffMeasure = new HausdorffSimilarityMeasure();
    }

    public Polygon polygonBuilder(GeoPolygon geoPolygon) {
        Coordinate[] coordinates = new Coordinate[geoPolygon.getVertices().size()];
        for (int i = 0; i < coordinates.length; i++) {
            GeoVertex vertex = geoPolygon.getVertices().get(i);
            coordinates[i] = new Coordinate(vertex.getX_pos().doubleValue(), vertex.getY_pos().doubleValue());
        }

        return geoFactory.createPolygon(coordinates);
    }

    public double compareGeoPolygons(GeoPolygon g0, GeoPolygon g1) {
        Polygon p0 = polygonBuilder(g0);
        Polygon p1 = polygonBuilder(g1);

        return hausdorffMeasure.measure(p0, p1);
    }

    public Integer detectSimilarGeoPolygon(GeoPolygon self, Set<GeoPolygon> comparers) {
        Integer match = null;
        double similarity = 0;
        double compareResult = 0;
        for (GeoPolygon comparer : comparers) {
            compareResult = compareGeoPolygons(self, comparer);
            if (compareResult > similarity) {
                similarity = compareResult;
                match = comparer.getId();
            }
        }

        return match;
    }
}
