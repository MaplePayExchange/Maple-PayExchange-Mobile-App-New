/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from './MPText';

/**
|--------------------------------------------------
| Types
|--------------------------------------------------
*/
interface PlacePrediction {
	place_id: string;
	description: string;
	structured_formatting: {
		main_text: string;
		secondary_text?: string;
	};
	postalCode?: string;
}

/**
|--------------------------------------------------
| Component
|--------------------------------------------------
*/
export default function AutocompleteExample({ onSelect }: { onSelect?: (value: string) => void }) {
	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const [query, setQuery] = React.useState('');
	const [predictions, setPredictions] = React.useState<PlacePrediction[]>([]);

	/**
	|--------------------------------------------------
	| Fetch predictions using Google Places API
	|--------------------------------------------------
	*/
	const fetchPredictions = async (search: string) => {
		setQuery(search);

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		if (!search) {
			setPredictions([]);
			return;
		}

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		try {
			/**
			|--------------------------------------------------
			| Api key
			|--------------------------------------------------
			*/
			const apiKey = 'AIzaSyDnYw_KNkeLhFI6ogKtyqfCn3v3W4mQmQs';

			/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
					search
				)}&components=country:ng&key=${apiKey}`
			);

			/**
			|--------------------------------------------------
			| Data
			|--------------------------------------------------
			*/
			const data = await response.json();

			/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/
			if (data.status === 'OK') {
				const results = data.predictions || [];
				setPredictions(results);
			} else {
				console.warn('Places API error:', data.status, data.error_message);
				setPredictions([]);
			}
		} catch (error) {
			console.log(`[GooglePlacesAutocomplete] Error fetching predictions`, error);
		}
	};

	/**
	|--------------------------------------------------
	| Handle selection
	|--------------------------------------------------
	*/
	const handleSelectPrediction = async (prediction: PlacePrediction) => {
		try {
			/**
			|--------------------------------------------------
			| Api key
			|--------------------------------------------------
			*/
			const apiKey = 'AIzaSyDnYw_KNkeLhFI6ogKtyqfCn3v3W4mQmQs';

			/**
			|--------------------------------------------------
			| Response
			|--------------------------------------------------
			*/
			const detailsRes = await fetch(
				`https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=address_component,formatted_address&key=${apiKey}`
			);

			/**
			|--------------------------------------------------
			| Details
			|--------------------------------------------------
			*/
			const detailsData = await detailsRes.json();

			/**
			|--------------------------------------------------
			| Address components
			|--------------------------------------------------
			*/
			const addressComponents = detailsData.result?.address_components || [];
			const postalComponent = addressComponents.find((c: any) => c.types.includes('postal_code'));
			const postalCode = postalComponent?.long_name;

			/**
			|--------------------------------------------------
			| Actions
			|--------------------------------------------------
			*/
			onSelect?.(`${prediction.description}${postalCode ? ', ' + postalCode : ''}`);
			setQuery(prediction.structured_formatting.main_text);
			setPredictions([]);
		} catch (err) {
			console.warn('Error fetching place details:', err);
		}
	};

	/**
	|--------------------------------------------------
	| Rendered View
	|--------------------------------------------------
	*/
	return (
		<KeyboardAvoidingView
			className="flex-1 bg-white"
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
		>
			<View className="w-full">
				{/**
				|--------------------------------------------------
				| Input field
				|--------------------------------------------------
				*/}
				<TextInput
					value={query}
					numberOfLines={1}
					returnKeyType="done"
					placeholder="Search an address"
					onChangeText={fetchPredictions}
					className="h-11 rounded-lg bg-[#1018280D] px-3 text-base leading-5"
				/>

				{/**
				|--------------------------------------------------
				| Predictions
				|--------------------------------------------------
				*/}
				{predictions.length > 0 && (
					<ScrollView
						keyboardShouldPersistTaps="handled"
						className="mt-2 max-h-52 rounded-lg bg-white shadow-md"
					>
						{predictions.map((prediction) => (
							<TouchableOpacity
								key={prediction.place_id}
								className="border-b border-gray-200 px-4 py-1"
								onPress={() => handleSelectPrediction(prediction)}
							>
								{/**
								|--------------------------------------------------
								| Primary text
								|--------------------------------------------------
								*/}
								<MPText weight="medium" className="text-[15px] text-gray-800">
									{prediction.structured_formatting.main_text}
								</MPText>

								{/**
								|--------------------------------------------------
								| Secondary text
								|--------------------------------------------------
								*/}
								{prediction.structured_formatting.secondary_text ? (
									<MPText weight="medium" className="mt-0.5 text-[13px] text-gray-500">
										{prediction.structured_formatting.secondary_text}
									</MPText>
								) : null}
							</TouchableOpacity>
						))}
					</ScrollView>
				)}
			</View>
		</KeyboardAvoidingView>
	);
}
