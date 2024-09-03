import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import FeeDisplay from './FeeDisplay';
import { getImageUrl } from 'src/app/utils';
import { NextIcon } from 'src/app/utils/icons';
import RenderItems from '../../_comp/RenderItems';
import CreditTransactions from './CreditTransactions';
import { Button } from 'src/app/components/optimized';
import { BankBadge, TransactionsBadge } from '../../_comp/PaymentBadge';
import { GlobalTableCell } from 'src/app/components/optimized/TableLayoutGlobal/base.table';
import { PaymentProvider } from './utils';

interface CreateTableRowsProps {
	data: PaymentProvider[];
}

export default function PaymentTableRows({ data }: CreateTableRowsProps) {
	const { t } = useTranslation();

	return data.map((e) => ({
		item: e,
		elements: [
			<GlobalTableCell>
				<div className='space-y-1'>
					<img src={getImageUrl(`paymentProviders/${e.provider.name}.svg`)} alt='' />
					<Link to={e.provider.url}>
						<Button variant='link' RightIcon={NextIcon} text={t('Setup')} />
					</Link>
				</div>
			</GlobalTableCell>,
			<GlobalTableCell>
				<FeeDisplay planOne={e.monthlyFees.planOne} planTwo={e.monthlyFees.planTwo} />
			</GlobalTableCell>,
			<GlobalTableCell>
				<FeeDisplay planOne={e.setupFees.planOne} planTwo={e.setupFees.planTwo} />
			</GlobalTableCell>,
			<GlobalTableCell>
				<CreditTransactions
					local={e.creditTransactions.local}
					global={e.creditTransactions.global}
					paymentCards={e.creditTransactions.paymentCards}
				/>
			</GlobalTableCell>,
			<GlobalTableCell>
				<RenderItems
					limit={4}
					provider={e.provider.name}
					items={e.methodsTransactions}
					RenderItem={TransactionsBadge}
					popupTitle='Methods transactions'
				/>
			</GlobalTableCell>,
			<GlobalTableCell>
				<RenderItems
					limit={6}
					items={e.banks}
					popupTitle='Banks'
					RenderItem={BankBadge}
					provider={e.provider.name}
				/>
			</GlobalTableCell>,
		],
	}));
}
