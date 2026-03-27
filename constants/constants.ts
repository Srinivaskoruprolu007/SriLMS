export interface featureProps {
	title: string;
	description: string;
	icon: string;
}
export const features: featureProps[] = [
	{
		title: "Comprehensive courses",
		description:
			"Access a wide range of carefully curated courses designed by industry experts",
		icon: "📔",
	},
	{
		title: "Interactive learning",
		description:
			"Engage in interactive learning sessions, quizzes, and assignments to enhance your understanding",
		icon: "🎮",
	},
	{
		title: "Progress tracking",
		description:
			"Monitor your progress and receive real-time feedback on your learning journey",
		icon: "🎯",
	},
	{
		title: "Community interaction",
		description:
			"Connect with fellow learners, share ideas, and collaborate on projects",
		icon: "👥",
	},
];

export const navigationItems = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Courses",
		href: "/courses",
	},
	{
		label: "Dashboard",
		href: "/dashboard",
	},
];
