export default ({style, script, title, keyword, description, page}) => {
	return `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
		<meta keywords="${keyword.join(", ")}" />
		<meta description="${description}" />
		<meta author="杨鹏程, BrickCarvingArtist" />
		<link rel="shortcut icon" type="image/ico" href="http://static.ikindness.cn/static/image/favicon.ico" />
		${
			style.map(list => {
				return `<link rel="stylesheet" href="${list}" />`
			})
		}
		<title>${title}</title>
		<body>
			<div class="main">
				${page}
			</div>
			${
				script.map(list => {
					return `<script src="${list}""></script>`
				})
			}
		</body>
	</head>
</html>`;
};