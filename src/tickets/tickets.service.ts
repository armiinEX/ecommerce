import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly userService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { userID, replyTo, ...TicketDto } = createTicketDto;
    const user: User = await this.userService.findOne(userID);

    let replyToTicket: any = null;
    if (replyTo) {
      replyToTicket = await this.ticketRepository.findOne({ where: { id: replyTo }, relations: ["replyTo"] });
      if (replyToTicket.replyTo)
        throw new BadRequestException("You cannot reply to these tickets");
    }

    const ticket: Ticket = this.ticketRepository.create({ ...TicketDto, user, replyTo: replyToTicket, });
    return this.ticketRepository.save(ticket);
  }

  async findAll() {
    const tickets = await this.ticketRepository.createQueryBuilder('tickets')
      .where("tickets.replyToId IS NULL")
      .getMany();

    return tickets;
  }

  async findOne(id: number) {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['replies', 'replyTo'],
    });
  
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
  
    return ticket;
  }
  

}
