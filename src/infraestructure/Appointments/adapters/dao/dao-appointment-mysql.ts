import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DaoAppointment } from 'src/domain/Appointments/port/Appointments/dao/dao-appointments';
import { AppointmentEntity } from 'src/infraestructure/Appointments/Entity/appointment.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DaoAppointmentMysql implements DaoAppointment {

    constructor(@InjectRepository(AppointmentEntity) private readonly appointmentEntity: Repository<AppointmentEntity>) { }

    listAppointments = async (columns: [], parameters: {}[]): Promise<{}[]> => {
        return await this.appointmentEntity.find({
            select: columns,
            where: parameters
        });
    }

    findAppointmentByIdAndStatus = async (idAppointment: number): Promise<AppointmentEntity> => {
        return await this.appointmentEntity.findOne({
            where: {
                idAppointment,
                appointmentStatus: 0
            }
        });
    }

    findAppointmentByIds = async (idAppointment: number, idUser: number): Promise<AppointmentEntity> => {
        return await this.appointmentEntity.findOne({
            where: [
                { idAppointment, appointmentStatus: 1, idUser },
                { idAppointment, appointmentStatus: 0 }
            ]
        });
    }
    findAppointmentById = async (idAppointment: number): Promise<AppointmentEntity> => {
        return await this.appointmentEntity.findOne({ idAppointment });
    }
}