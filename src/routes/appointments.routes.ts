import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

// SoC: Separation of concerns (Separação de preocupações)
// DTO - Data Transfer Object

// Rota: receber requisição, chamar outro arquivo e devolver reposta;

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppoitment = new CreateAppointmentService()

        const appointment = await createAppoitment.execute({ date: parsedDate, provider });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
})

export default appointmentsRouter;