import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardSkeleton = ({ cards }) => {
	return Array(cards)
		.fill(0)
		.map((_, i) => (
			<div className='card-skeleton' key={i}>
				<div className='top'>
					<Skeleton height={'100%'} />
				</div>
				<div className='bottom'>
					<Skeleton className='skelton-text' width={'25%'} />
					<Skeleton className='skelton-text1' widthe={'100%'} />
					<Skeleton className='skelton-text1' width={'30%'} />
					<Skeleton className='skelton-text1' width={'20%'} />
				</div>
			</div>
		));
};
export default CardSkeleton;
