/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { Dimensions, PixelRatio, Platform } from 'react-native';

/**
|--------------------------------------------------
| Dimensions
|--------------------------------------------------
*/
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

/**
|--------------------------------------------------
| Device type
|--------------------------------------------------
*/
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isIPAD = isIOS && SCREEN_HEIGHT / SCREEN_WIDTH < 1.6;

/**
|--------------------------------------------------
| Responsive measurement
|--------------------------------------------------
*/
export const responsiveDimension = (size: number, dimension: 'width' | 'height') => {
	if ((dimension === 'height' || dimension === 'width') && !size) return 0;

	/**
    |--------------------------------------------------
    | For the height
    |--------------------------------------------------
    */
	if (dimension === 'height') {
		const _height = SCREEN_HEIGHT * (parseFloat(size.toString()) / 667);
		return PixelRatio.roundToNearestPixel(_height);
	}

	/**
    |--------------------------------------------------
    | For width
    |--------------------------------------------------
    */
	if (dimension === 'width') {
		const _width = SCREEN_WIDTH * (parseFloat(size.toString()) / 480);
		return PixelRatio.roundToNearestPixel(_width);
	}
};

/**
 * Returns a responsive font size clamped between min and max.
 * @param min - The minimum font size
 * @param max - The maximum font size
 * @param base - The base font size (used in responsiveDimension)
 */
export const clampFontSize = (base: number, min: number, max: number): number => {
	const responsive = responsiveDimension(base, 'width') as number;
	return Math.min(Math.max(responsive, min), max);
};

/**
|--------------------------------------------------
| Font sizes
|--------------------------------------------------
*/
export const fontSizes = {
	FONT6: clampFontSize(6, 6, 8),
	FONT7: clampFontSize(7, 7, 9),
	FONT8: clampFontSize(8, 8, 10),
	FONT9: clampFontSize(9, 9, 11),
	FONT10: clampFontSize(10, 10, 12),
	FONT11: clampFontSize(11, 11, 13),
	FONT12: clampFontSize(12, 12, 14),
	FONT13: clampFontSize(13, 13, 15),
	FONT14: clampFontSize(14, 14, 16),
	FONT15: clampFontSize(15, 15, 17),
	FONT16: clampFontSize(16, 16, 18),
	FONT17: clampFontSize(17, 17, 19),
	FONT18: clampFontSize(18, 18, 20),
	FONT19: clampFontSize(19, 19, 21),
	FONT20: clampFontSize(20, 20, 22),
	FONT21: clampFontSize(21, 21, 23),
	FONT22: clampFontSize(22, 22, 24),
	FONT23: clampFontSize(23, 23, 25),
	FONT24: clampFontSize(24, 24, 26),
	FONT25: clampFontSize(25, 25, 27),
	FONT26: clampFontSize(26, 26, 28),
	FONT27: clampFontSize(27, 27, 29),
	FONT28: clampFontSize(28, 28, 30),
	FONT29: clampFontSize(29, 29, 31),
	FONT30: clampFontSize(30, 30, 32),
	FONT31: clampFontSize(31, 31, 33),
	FONT32: clampFontSize(32, 32, 34),
	FONT33: clampFontSize(33, 33, 35),
	FONT34: clampFontSize(34, 34, 36),
	FONT35: clampFontSize(35, 35, 37),
	FONT36: clampFontSize(36, 36, 38),
	FONT37: clampFontSize(37, 37, 39),
	FONT38: clampFontSize(38, 38, 40),
	FONT39: clampFontSize(39, 39, 41),
	FONT40: clampFontSize(40, 40, 42),
	FONT41: clampFontSize(41, 41, 43),
	FONT42: clampFontSize(42, 41, 44),
	FONT43: clampFontSize(43, 43, 45),
	FONT44: clampFontSize(44, 44, 46),
	FONT45: clampFontSize(45, 25, 47),
	FONT46: clampFontSize(46, 26, 48),
	FONT47: clampFontSize(47, 26, 49),
	FONT48: clampFontSize(48, 47, 50),
} as const;

/**
|--------------------------------------------------
| Colors
|--------------------------------------------------
*/
export const colors = (theme?: 'dark' | 'light') => ({
	WHITE: theme === 'dark' ? '#FFFFFF' : '#000000',
	BLACK: theme === 'dark' ? '#FFFFFF' : '#000000',
});

/**
|--------------------------------------------------
| Images
|--------------------------------------------------
*/
const _IMAGE_PATH = '../assets/images';

export const LOADER = require(`${_IMAGE_PATH}/loader.png`);
export const INCOMING = require(`${_IMAGE_PATH}/incoming.png`);
export const OUTGOING = require(`${_IMAGE_PATH}/outgoing.png`);
export const ERROR_BADGE = require(`${_IMAGE_PATH}/error.png`);
export const EXCHANGE = require(`${_IMAGE_PATH}/exchange.png`);
export const WHATSAPP = require(`${_IMAGE_PATH}/whatsapp.png`);
export const MONEY_PAD = require(`${_IMAGE_PATH}/money_pad.png`);
export const CHAT_AGENT = require(`${_IMAGE_PATH}/chatAgent.png`);
export const WALLET_BG = require(`${_IMAGE_PATH}/wallet_frame.png`);
export const MAPLE_LOGO = require(`${_IMAGE_PATH}/maple_logo.png`);
export const SUCCESS_BADGE = require(`${_IMAGE_PATH}/success.png`);
export const PENDING_BADGE = require(`${_IMAGE_PATH}/pending.png`);
export const SEND_FUNDS = require(`${_IMAGE_PATH}/send_funds.png`);
export const VERSION_IMAGE = require(`${_IMAGE_PATH}/version.png`);
export const FLAG_CANADA = require(`${_IMAGE_PATH}/flag_canada.png`);
export const BENEFICIARY = require(`${_IMAGE_PATH}/beneficiary.png`);
export const FLAG_NIGERIA = require(`${_IMAGE_PATH}/flag_nigeria.png`);
export const ONBOARDING_ONE = require(`${_IMAGE_PATH}/onboarding_one.jpg`);
export const ONBOARDING_TWO = require(`${_IMAGE_PATH}/onboarding_four.png`);
export const TRANSACTION_PIN = require(`${_IMAGE_PATH}/transaction_pin.png`);
export const ONBOARDING_THREE = require(`${_IMAGE_PATH}/onboarding_three.png`);
export const KYC_VERIFICATION = require(`${_IMAGE_PATH}/kyc_verification.png`);
export const BVN_VERIFICATION = require(`${_IMAGE_PATH}/bvn_verification.png`);
export const MAPLE_LOGO_WHITE = require(`${_IMAGE_PATH}/maple_logo_white.png`);
export const SEND_FUNDS_FEEDBACK = require(`${_IMAGE_PATH}/send_money_feedback.png`);
export const BENEFICIARY_EMPTY_STATE = require(`${_IMAGE_PATH}/beneficiary-card.png`);
export const SEND_FUNDS_FEEDBACK_ERROR = require(`${_IMAGE_PATH}/send_funds_error.png`);
