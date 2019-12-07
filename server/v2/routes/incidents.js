import express from 'express';
import checkAuth from '../middlewares/check-auth';
import upload from '../middlewares/upload';
import IncidentsController from '../controllers/incidents';
import IncidentValidation from '../middlewares/incidentValidation';

const router = express.Router();

router.post('/', checkAuth, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]),
  IncidentValidation.validateIncident, IncidentsController.createIncident);

router.get('/', checkAuth, IncidentsController.getAllIncidents);

router.get('/:redFlagId', checkAuth, IncidentValidation.incidentId, IncidentsController.getSpecificInident);

router.delete('/:redFlagId', checkAuth, IncidentValidation.incidentId, IncidentsController.deleteInident);

router.patch('/:redFlagId/location', checkAuth, IncidentValidation.incidentId,
  IncidentValidation.validateLoction, IncidentsController.updateLocation);

router.patch('/:redFlagId/comment', checkAuth, IncidentValidation.incidentId,
  IncidentValidation.validateComment, IncidentsController.updateComment);

export default router;