/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { useForm } from 'react-hook-form';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@/src/components/MPText';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';

export default function VerifyBvnScreen() {
	/**
	|--------------------------------------------------
	| Form handler
	|--------------------------------------------------
	*/
	const {
		control,
		formState: { isValid },
	} = useForm({
		defaultValues: { bvn: '' },
	});

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			{/**
            |--------------------------------------------------
            | Header
            |--------------------------------------------------
            */}
			<HeaderWrapper title="Verify Account" />

			<MPText weight="semibold" className="text-base" style={{ fontSize: 18 }}>
				Add BVN Number
			</MPText>
			<MPText weight="medium" className="text-[#484848] text-sm leading-5 mt-2">
				We use your BVN to automatically create a NGN MaplePay account for you
			</MPText>

			{/**
            |--------------------------------------------------
            | Form
            |--------------------------------------------------
            */}
		</ScreenWrapper>
	);
}
