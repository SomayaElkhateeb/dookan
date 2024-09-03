import { getImageUrl } from "src/app/utils";
import { transactionFormat } from "./utils";

interface Fee {
  flatFee: string | number;
  percentageFee: string | number;
}
interface CreditTransactionsProps {
  paymentCards: string[];
  local: Fee;
  global: Fee;
}
export default function CreditTransactions({ paymentCards, local, global }:CreditTransactionsProps)  {
  return (
    <div className='grid gap-2'>
      <div className='flex gap-1'>
        {paymentCards.map((item, index) => (
          <img key={index} src={getImageUrl(`companies/${item}.svg`)} alt='paymentCard' />
        ))}
      </div>
      <p className='paragraph text-subtitle'>
        Local:&nbsp;
        <span className='paragraph'>{transactionFormat(local)}</span>
      </p>
      <p className='paragraph text-subtitle'>
        Global:&nbsp;
        <span className='paragraph'>{transactionFormat(global)}</span>
      </p>
    </div>
  );
};

