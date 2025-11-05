interface FAQQuestion {
	header: string | null;
	subtext: string | null;
}

interface SingleSolution {
	type: 'single';
	header: string | null;
	subtext?: string | null;
	['bullet-points']: string[] | null;
}

interface MultipleSolution {
	type: 'multiple';
	solutions: {
		header: string;
		['bullet-points']: string[];
	}[];
}

type FAQSolution = SingleSolution | MultipleSolution;

export interface FAQItem {
	tag: string;
	tip?: string;
	name: string | null;
	question: FAQQuestion;
	solution: FAQSolution;
}
