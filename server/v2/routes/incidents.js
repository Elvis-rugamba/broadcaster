import express from 'express';
import checkAuth from '../middlewares/check-auth';
import upload from '../middlewares/upload';
import IncidentsController from '../controllers/incidents';
import IncidentValidation from '../middlewares/incidentValidation';

const router = express.Router();

router.post('/', checkAuth, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]),
  IncidentValidation.validateIncident, IncidentsController.createIncident);

export default router;