import React, { ReactNode } from 'react';
import { Button } from 'src/app/components/optimized';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BeforeInstallingNote } from '../_comp/getSendgridSetup';

interface Props {
	data: {
		title: string;
		note_1: BeforeInstallingNote;
		note_2: BeforeInstallingNote;
		note_3: BeforeInstallingNote;
		note_4: BeforeInstallingNote;
		note_5: BeforeInstallingNote;
	};
}

const NoteComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className='flex items-center space-x-2 p-3'>
			<FaRegCheckCircle color='#E9E9E9' size={20} />
			<div className='w-3/4'>{children}</div>
		</div>
	);
};

const SendgridBeforeInstalling: React.FC<Props> = ({ data }) => {
	const { note_1, note_2, note_3, note_4, note_5 } = data;
	return (
		<div>
			<div>
				{/* note_1 */}
				<NoteComponent>
					<span>{note_1.text_1}</span>
					<span className='text-primary mx-1 cursor-pointer'>{note_1.linkText}</span>
					<span>{note_1.text_2}</span>
				</NoteComponent>
				{/* note_2 */}
				<NoteComponent>
					<span>{note_2.text_1}</span>
					<span className='text-primary mx-1 cursor-pointer'>{note_2.linkText}</span>
				</NoteComponent>
				{/* note_3 */}
				<NoteComponent>
					<span>{note_3.text_1}</span>
				</NoteComponent>
				{/* note_4 */}
				<NoteComponent>
					<span>{note_4.text_1}</span>
					<span className='text-primary mx-1 cursor-pointer'>{note_4.linkText}</span>
					<span>{note_4.text_2}</span>
				</NoteComponent>
				{/* note_5 */}
				<NoteComponent>
					<span>{note_5.text_1}</span>
					<span className='text-primary mx-1 cursor-pointer'>{note_5.linkText}</span>
					<span>{note_5.text_2}</span>
				</NoteComponent>
			</div>
			<div className='flex justify-end'>
				<Button>Continue</Button>
			</div>
		</div>
	);
};

export default SendgridBeforeInstalling;
