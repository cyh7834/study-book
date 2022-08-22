const data =(() => {
	const a = 1;
	const b = () => 2;
	const public = {
		c : 2,
		d : () => 3
	}
	
	return public;
})()

console.log(data);
console.log(data.a);
// {c : 2, d: [Function: d] }
// undefined
// a와 b는 private 범위를 가지고, c와 d는 public의 범위를 가진다.