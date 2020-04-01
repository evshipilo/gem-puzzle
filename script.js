const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const rectangle = new Path2D();
rectangle.rect(200, 10, 50, 50);
ctx.stroke(rectangle);
ctx.fill(rectangle);
