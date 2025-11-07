# Natural Language Date Interpreter Helm Chart

This Helm chart deploys the full stack (Spring Boot backend, React frontend, MySQL database) for the Natural Language Date Interpreter on OpenShift/CRC.

## Usage

1. **Build and push your images**
   - Build and push your backend and frontend images to a registry accessible by your OpenShift/CRC cluster.
   - Update `values.yaml` with the correct image names/tags if needed.

2. **Install the chart**
   ```sh
   helm install nl-date-interpreter ./helm
   ```
   Or to upgrade:
   ```sh
   helm upgrade nl-date-interpreter ./helm --install
   ```

3. **Access the services**
   - Use `oc get routes` or `kubectl get svc` to find the frontend and backend endpoints.

## Structure
- `templates/backend.yaml`: Backend Deployment & Service
- `templates/frontend.yaml`: Frontend Deployment & Service
- `templates/mysql.yaml`: MySQL Deployment, Service, and PVC
- `values.yaml`: Default values for images, credentials, and ports

## Notes
- MySQL data is persisted using a PersistentVolumeClaim.
- Update resource requests/limits as needed for your environment.
- For OpenShift, you may need to set image pull secrets or adjust SCCs for database and app pods.
