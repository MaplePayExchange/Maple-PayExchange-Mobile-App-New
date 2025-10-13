/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import * as ExpoGooglePlaces from 'expo-google-places';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from './MPText';

export default function AutocompleteExample({ onSelect }: { onSelect?: (value: string) => void }) {
	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const [query, setQuery] = React.useState('');
	const [predictions, setPredictions] = React.useState<ExpoGooglePlaces.AutocompletePrediction[]>([]);

	/**
	|--------------------------------------------------
	| Fetch predictions
	|--------------------------------------------------
	*/
	const fetchPredictions = async (search: string) => {
		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
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

		try {
			const results = await ExpoGooglePlaces.fetchPredictionsWithSession(search, {});
			/**
			|--------------------------------------------------
			| For each prediction, fetch place details
			|--------------------------------------------------
			*/
			const detailedSearch = await Promise.all(
				results.map(async (pred) => {
					try {
						/**
						|--------------------------------------------------
						| Fetches the details of the place
						|--------------------------------------------------
						*/
						const placeDetails = await ExpoGooglePlaces.fetchPlaceWithSession(pred.placeID, [
							'addressComponents',
						]);

						/**
						|--------------------------------------------------
						| Finds the postal information
						|--------------------------------------------------
						*/
						const postalComponent = placeDetails.addressComponents?.find((component) =>
							component.types.includes('postal_code')
						);
						/**
						|--------------------------------------------------
						| Gets the postal code
						|--------------------------------------------------
						*/
						const postalCode = postalComponent?.name;

						/**
						|--------------------------------------------------
						| Returns the postal code
						|--------------------------------------------------
						*/
						return { ...pred, postalCode };
					} catch (err) {
						console.warn('Could not fetch details for', pred.placeID, err);
						return pred;
					}
				})
			);

			setPredictions(detailedSearch);
		} catch (error) {
			console.log(`[GooglePlacesAutocomplete] Error fetching predictions`, error);
		}
	};

	/**
	|--------------------------------------------------
	| Handle selection
	|--------------------------------------------------
	*/
	const handleSelectPrediction = async (prediction: ExpoGooglePlaces.AutocompletePrediction) => {
		onSelect?.(prediction.fullText + ', ' + (prediction as any)?.postalCode);

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		setQuery(prediction.primaryText);
		setPredictions([]);
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
					placeholder="Search an address"
					onChangeText={fetchPredictions}
					className="h-11 rounded-lg bg-[#1018280D] line-clamp-1 over px-3 text-base leading-5 overflow-y-hidden text-nowrap whitespace-nowrap"
				/>

				{/**
				|--------------------------------------------------
				| Predictions
				|--------------------------------------------------
				*/}
				{predictions.length > 0 && (
					<ScrollView
						keyboardShouldPersistTaps="handled"
						className="mt-2 rounded-lg bg-white shadow-md max-h-52"
					>
						{predictions.map((prediction) => (
							<TouchableOpacity
								key={prediction.placeID}
								className="px-4 py-1 border-b border-gray-200"
								onPress={() => {
									console.log(prediction);
									handleSelectPrediction(prediction);
								}}
							>
								{/**
								|--------------------------------------------------
								| Primary text
								|--------------------------------------------------
								*/}
								<MPText weight="medium" className="text-sm text-gray-800">
									{prediction.primaryText}
								</MPText>

								{/**
								|--------------------------------------------------
								| Secondary text
								|--------------------------------------------------
								*/}
								{prediction.secondaryText ? (
									<MPText weight="medium" className="text-xs text-gray-500 mt-0.5">
										{prediction.secondaryText}
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
