import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Response } from 'express';


@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto, @Res() res: Response) {
    const newTicket = await this.ticketsService.create(createTicketDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: newTicket,
      message: "The ticket was successfully created.",
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const tickets = await this.ticketsService.findAll();
    if (!tickets || tickets.length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "No tickets found.",
      });
    }
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: tickets,
      message: "Tickets retrieved successfully.",
    });  
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const ticket = await this.ticketsService.findOne(+id);
    if (!ticket) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Ticket not found.",
      });
    }
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: ticket,
      message: "Ticket retrieved successfully.",
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
  //   return this.ticketsService.update(+id, updateTicketDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ticketsService.remove(+id);
  // }
}
