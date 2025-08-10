/// <reference types="nativewind/types" />
import { LinearGradient } from 'expo-linear-gradient';

declare module 'nativewind' {
	interface NativeWindComponents {
		LinearGradient: typeof LinearGradient;
	}
}
