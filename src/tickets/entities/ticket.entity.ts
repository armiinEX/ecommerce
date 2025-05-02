import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subject: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.tickets)
    user: User;

    @ManyToOne(() => Ticket, (ticket) => ticket.replies, { nullable: true })
    replyTo?: Ticket;

    @OneToMany(() => Ticket, (ticket) => ticket.replyTo, { nullable: true })
    replies: Ticket[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
