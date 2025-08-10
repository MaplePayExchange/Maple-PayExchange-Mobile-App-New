/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import {
	Platform,
	Keyboard,
	ScrollView,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';

/**
|--------------------------------------------------
| Inteface
|--------------------------------------------------
*/
interface FormWrapperProps {
	children: React.ReactNode;
	extraPadding?: number;
}

export function FormWrapper({ children, extraPadding = 20 }: FormWrapperProps) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
					contentContainerStyle={[styles.content, { paddingBottom: extraPadding }]}
				>
					{children}
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

/**
|--------------------------------------------------
| Styles
|--------------------------------------------------
*/
const styles = StyleSheet.create({
	/**
    |--------------------------------------------------
    | Container
    |--------------------------------------------------
    */
	container: {
		flex: 1,
	},

	/**
    |--------------------------------------------------
    | Content
    |--------------------------------------------------
    */
	content: {
		flexGrow: 1,
		padding: 20,
	},
});
