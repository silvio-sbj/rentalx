import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/inMemory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'Tony Townsend',
      email: 'ic@asmoh.ao',
      password: '1234',
      driver_license: '370697',
    });

    await sendForgotPasswordMailUseCase.execute('ic@asmoh.ao');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('any@do.domain.ao')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an user token', async () => {
    const tokenGen = spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      name: 'Curtis Daniel',
      email: 'iz@fabifera.hn',
      password: '1234',
      driver_license: '792184',
    });

    await sendForgotPasswordMailUseCase.execute('iz@fabifera.hn');

    expect(tokenGen).toHaveBeenCalled();
  });
});
