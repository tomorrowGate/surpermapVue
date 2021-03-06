/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(['./when-a55a8a4c', './Check-bc1d37d9', './Math-edfe2d1c', './Cartesian2-f0158650', './BoundingSphere-02d3af5e', './RuntimeError-7c184ac0', './WebGLConstants-4c11ee5f', './ComponentDatatype-919a7463', './GeometryAttribute-de0e4f68', './PrimitiveType-97893bc7', './FeatureDetection-bac17d71', './Transforms-a6232c91', './GeometryAttributes-1c7ce91d', './VertexFormat-7f136973', './Plane-a550aa8c', './FrustumGeometry-5ddc98d9'], function (when, Check, _Math, Cartesian2, BoundingSphere, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, FeatureDetection, Transforms, GeometryAttributes, VertexFormat, Plane, FrustumGeometry) { 'use strict';

    function createFrustumGeometry(frustumGeometry, offset) {
        if (when.defined(offset)) {
            frustumGeometry = FrustumGeometry.FrustumGeometry.unpack(frustumGeometry, offset);
        }
        return FrustumGeometry.FrustumGeometry.createGeometry(frustumGeometry);
    }

    return createFrustumGeometry;

});
