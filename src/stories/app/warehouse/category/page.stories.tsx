// /stories/pages/home.stories.jsx

import { BodyContent } from "@/app/layout";
import Page from "@/app/warehouse/category/page"

export default {
	title: "Pages/Warehouse/Category",
	component: Page,
	parameters: {
		layout: 'fullscreen', // Ensures your layout isn't restricted by Storybook's container
		nextjs: {
			appDirectory: true,
			navigation: {
				pathname: '/warehouse/category',
			}
		}
	},
	decorators: [
		(Story) => (
			<BodyContent>
				{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
				<Story />
			</BodyContent>
		),
	],
};

export const Category = () => <Page />
