// src/services/paymentsService.ts

import { Payment, PaymentFromJson } from '@/models/payment';
import { getEnvVariable } from '@/utils/env'; // utilitario para acceder a .env
import axios from 'axios';

const API_BASE_URL = getEnvVariable('API_BASE_URL') || 'http://localhost:3000';

export class PaymentsService {
  static async getAllPayments(): Promise<Payment[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments`);
      return response.data.map(PaymentFromJson);
    } catch (error) {
      throw new Error('Error al cargar los pagos');
    }
  }
}
