export default function useCustomHookAddCustomerGroupForm() {

	// ////////////////////////
	const handelDefaultValue = () => {
		return {
			code:'',
			name: '',
			description: '',
			status: 0,
			customers: [],
		};
	};

	return {

		handelDefaultValue
	}
}