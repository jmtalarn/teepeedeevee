import { LoadingOverlay } from '@mantine/core';
import { useIsFetching } from '@tanstack/react-query';

function GlobalLoadingIndicator() {
	const isFetching = useIsFetching();
	return <Loader loading={isFetching > 0} />;

}

export const Loader = ({ loading }: { loading: boolean }) => {
	return (
		<LoadingOverlay
			visible={loading}
			zIndex={1000}
			overlayProps={{ radius: 'sm', blur: 2 }}
			loaderProps={
				{
					color: 'var(--mantine-primary-color-filled)',
					type: 'bars',
					size: 'lg'
				}
			}
		/>
	);

};

export default GlobalLoadingIndicator;
