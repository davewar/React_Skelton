import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog, searchParams }) => {
	const { id, title, date, descripton, type } = blog;

	let navigate = useNavigate();

	return (
		<div
			className='user-card'
			onClick={() =>
				navigate(`/blog/${id}`, {
					state: { search: `?${searchParams.toString()}` },
				})
			}
		>
			<img className='blog-image' src='https://picsum.photos/200' alt='blog' />
			<div className='info'>
				<h2>{title}</h2>
				<p>{descripton}</p>
				<br />

				<p className='blog-date'>{date.slice(0, 10)}</p>
				<p className='blog-type'>{type}</p>
			</div>
			{/* </Link> */}
		</div>
	);
};
export default BlogCard;
