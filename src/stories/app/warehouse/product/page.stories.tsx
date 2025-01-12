// /stories/pages/home.stories.jsx

import { BodyContent } from "@/app/layout";
import Page from "@/app/warehouse/product/page"

export default {
	title: "Pages/Warehouse/Product",
	component: Page,
	parameters: {
		layout: 'fullscreen', // Ensures your layout isn't restricted by Storybook's container
		nextjs: {
			appDirectory: true,
			navigation: {
				pathname: '/warehouse/product',
			}
		}
	},
	decorators: [
		(Story) => (
			<BodyContent>
				<Story />
			</BodyContent>
		),
	],
};

export const Product = () => <Page />
