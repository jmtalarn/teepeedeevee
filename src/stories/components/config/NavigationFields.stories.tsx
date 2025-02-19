import type { Meta, StoryObj } from '@storybook/react';
import Component from '@/components/config/NavigationFields';
import { useRef } from 'react';
import type { FieldLinksType } from '@/_lib/_definitions/types';


const fieldLinks: FieldLinksType[] = [
	{ id: 'id1', label: 'Div id1' },
	{ id: 'id2', label: 'Div id2' },
	{ id: 'id3', label: 'Div id3' },
	{ id: 'id4', label: 'Div id4' },
	{ id: 'id5', label: 'Div id5' },
	{ id: 'id6', label: 'Div id6' },
	{ id: 'id7', label: 'Div id7' },
	{ id: 'id8', label: 'Div id8' },
	{ id: 'id9', label: 'Div id9' },
	{ id: 'id10', label: 'Div id10' },
	{ id: 'id11', label: 'Div id11' },
	{ id: 'id12', label: 'Div id12' },
	{ id: 'id13', label: 'Div id13' },
	{ id: 'id14', label: 'Div id14' },
	{ id: 'id15', label: 'Div id15' },
	{ id: 'id16', label: 'Div id16' },
	{ id: 'id17', label: 'Div id17' },
	{ id: 'id18', label: 'Div id18' },
	{ id: 'id19', label: 'Div id19' },
	{ id: 'id20', label: 'Div id20' }
];


const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Config/NavigationFields',
	args: {
		fieldLinks,
		containerRef: undefined
	},
	render: (args) => {
		const NavigationFieldsComponent = () => {
			const divWithLinksRef = useRef<HTMLDivElement>(null);
			return (
				<div style={{ display: 'flex' }}>
					<Component containerRef={divWithLinksRef} fieldLinks={args.fieldLinks} />
					<div
						style={{ overflow: 'auto', flexGrow: '1', maxHeight: '100vh' }}
						ref={divWithLinksRef}
					>
						{fieldLinks.map(
							({ id, label }) => (
								<div
									key={id}
									id={id}
									style={
										{
											height: '300px',
											margin: '4px',
											padding: '8px',
											border: '1px dashed salmon'
										}
									}
									data-scrollspy
								>
									<h2>{label}</h2>
								</div>
							)
						)
						}
					</div>
				</div>
			);
		};
		return <NavigationFieldsComponent />;
	}


};


export default meta;
type Story = StoryObj<typeof Component>;

export const NavigationFields: Story = {
	args: {

	}
};
