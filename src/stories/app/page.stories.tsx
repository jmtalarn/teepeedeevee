import Page from "@/app/page"
import { BodyContent } from "@/app/layout"

export default {
	title: "Pages/Index",
	component: Page,
	parameters: {
		layout: 'fullscreen', // Ensures your layout isn't restricted by Storybook's container
		nextjs: {
			appDirectory: true,
			navigation: {
				pathname: '/',
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

export const Pos = () => <Page />
