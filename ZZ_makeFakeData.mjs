import { faker } from '@faker-js/faker';
import fs from 'fs';

let posts = [];
const NUMBER_OF_POSTS = 20;

let title = ['Excel', 'Access', 'Bi', 'Web Development'];
function randomType() {
	let n = Math.floor(Math.random() * 4);
	return title[n];
}

function data() {
	return {
		id: faker.datatype.uuid(),
		title: faker.lorem.word(),
		descripton: faker.lorem.sentence(),
		main: faker.lorem.paragraph(2),
		date: faker.date.past(),
		image: faker.internet.url(),
		type: randomType(),
	};
}

for (let index = 0; index < NUMBER_OF_POSTS; index++) {
	posts.push(data());
}

fs.writeFile('./test1', JSON.stringify(posts, null, 2), (err) => {
	if (err) {
		console.log('dwerr', err);
	} else {
		console.log('All gd');
	}
});

// https://fakerjs.dev/api/

// node ZZ_makeFakeData.mjs
