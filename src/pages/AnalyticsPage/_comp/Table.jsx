// @ts-nocheck
import { forwardRef } from 'react';
const Table = forwardRef(({ data, headers }) => {
	const formattedHeaders = headers.map((header) => header.replace(/\s+/g, '_'));
	return (
		<table  className='w-full table-auto border-separate border-spacing-y-3 print-only'>
			<thead>
				<tr className='text-left bg-white'>
					{headers.map((header, index) => (
						<th
							key={header}
							className={`px-4 py-3 subtitle uppercase ${
								index === 0
									? 'rounded-tl-xl rounded-bl-xl'
									: index === headers.length - 1
									? 'rounded-tr-xl rounded-br-xl'
									: ''
							}`}
						>
							{header}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{data.map((row, index) => (
					<tr key={index} className='rounded-xl bg-white'>
						{formattedHeaders.map((header, index) => (
							<td
								key={header}
								className={`px-4 py-3  text-title ${
									index === 0
										? 'rounded-tl-xl rounded-bl-xl title'
										: index === formattedHeaders.length - 1
										? 'rounded-tr-xl rounded-br-xl paragraph'
										: ''
								}`}
							>
								{row[header]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
});
export default Table;
// {formattedHeaders.map((header, index) => (
//   <td
//     key={header}
//     className={`px-4 py-3 text-title ${
//       index === 0
//         ? 'rounded-tl-xl rounded-bl-xl title'
//         : index === formattedHeaders.length - 1
//         ? 'rounded-tr-xl rounded-br-xl paragraph'
//         : ''
//     }`}
//   >
//     {index === 0 ? (
//       <div>
//         <img src={row[header].imageUrl} alt={row[header].altText} />
//         <h2>{row[header].title}</h2>
//         <span>{row[header].subtitle}</span>
//       </div>
//     ) : (
//       row[header]
//     )}
//   </td>
// ))}