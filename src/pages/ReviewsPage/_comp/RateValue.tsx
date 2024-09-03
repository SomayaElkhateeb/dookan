import { BackAndroidIcon } from "src/app/utils/icons";

export default function RateValue({rating}:{rating:number}) {
	return (
		<div className='flex items-end'>
			<BackAndroidIcon
				className={`fill-${rating < 3 ? 'error' : 'success'}  ${
					rating < 3 ? '-rotate-90' : 'rotate-90'
				}`}
			/>
			<p className={`text-${rating < 3 ? 'error' : 'success'}`}>{rating} %</p>
		</div>
	);
}
