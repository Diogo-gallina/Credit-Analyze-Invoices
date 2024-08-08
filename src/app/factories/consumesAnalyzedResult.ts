import { ConsumesAnalyzedResultsUseCase } from '@app/use-cases/consumesAnalyzedResults/consumesAnalyzedResults';
import { DbAddAnalizedResult } from '@data/use-cases/add-analyze-result/dbAddAnalyzeResult';
import { EmailAdapter } from '@infra/cloud/adapters/email/emailAdapter';
import { MessagingAdapter } from '@infra/cloud/adapters/messaging/messagingAdapter';
import { sqsHelper } from '@infra/cloud/lib/aws/helpers/messaging/sqsHelper';
import { nodemailerHelper } from '@infra/cloud/lib/nodemailer/helper/email/nodemailerHelper';
import { AnalyzedResultMongoRepository } from '@infra/db/mongodb/analyzed-result-repository/anlyzedResult';
import { InvoiceMongoRepository } from '@infra/db/mongodb/invoice-repository/invoice';
import { UserMongoRepository } from '@infra/db/mongodb/user-repository/user';

export const makeConsumesAnalyzedResultUseCase = (): ConsumesAnalyzedResultsUseCase => {
  const messagingAdapter = new MessagingAdapter(sqsHelper);
  const analyzedResultRepository = new AnalyzedResultMongoRepository();
  const dbAddAnalyzedResult = new DbAddAnalizedResult(analyzedResultRepository);
  const userRepository = new UserMongoRepository();
  const invoiceRepository = new InvoiceMongoRepository();
  const emailAdapter = new EmailAdapter(nodemailerHelper);
  return new ConsumesAnalyzedResultsUseCase(
    messagingAdapter,
    dbAddAnalyzedResult,
    userRepository,
    invoiceRepository,
    emailAdapter,
  );
};
