from sklearn.cluster import DBSCAN
import numpy as np
import uuid

def detect_risk_zones(reports_list):
    """
    Groups reports by GPS coordinates to identify hotspots.
    Flags zones with 3+ reports within a ~5km radius as high-risk.
    """
    if len(reports_list) < 3:
        return []

    # Extract coordinates as numpy array
    coords = np.array([[r["lat"], r["lng"]] for r in reports_list])
    
    # eps=0.045 is approximately 5km mapping degrees (1 degree ~ 111km)
    db = DBSCAN(eps=0.045, min_samples=3).fit(coords)
    labels = db.labels_

    # Find the unique clusters (ignoring noise outlirs which are labeled -1)
    unique_labels = set(labels)
    clusters = []

    for k in unique_labels:
        if k == -1:
            continue
            
        class_member_mask = (labels == k)
        cluster_coords = coords[class_member_mask]
        
        # Calculate cluster center or polygon bounding box
        lat_min, lat_max = np.min(cluster_coords[:, 0]), np.max(cluster_coords[:, 0])
        lng_min, lng_max = np.min(cluster_coords[:, 1]), np.max(cluster_coords[:, 1])

        # Define polygon manually by corners
        polygon = [
            {"lat": float(lat_min), "lng": float(lng_min)},
            {"lat": float(lat_max), "lng": float(lng_min)},
            {"lat": float(lat_max), "lng": float(lng_max)},
            {"lat": float(lat_min), "lng": float(lng_max)},
        ]

        # Alternatively just calculate center
        center_lat = np.mean(cluster_coords[:, 0])
        center_lng = np.mean(cluster_coords[:, 1])
        
        clusters.append({
            "id": str(uuid.uuid4()),
            "region": f"Hotspot near {center_lat:.4f}, {center_lng:.4f}",
            "risk_level": "high",
            "predicted_by_ai": True,
            "center": {"lat": float(center_lat), "lng": float(center_lng)},
            "polygon": polygon,
            "report_count": len(cluster_coords)
        })

    return clusters
